import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import {
  SUPPORTED_BOOK_IDS,
  SUPPORTED_EVENT_SLUGS,
  SUPPORTED_HERO_IDS,
  SUPPORTED_LOCALES,
  type Book,
  type BookId,
  type EventContent,
  type EventResource,
  type EventMeta,
  type EventSlug,
  type Hero,
  type HeroId,
  type HomeContent,
  type Locale,
  type Quote,
  type TimelineItem,
} from "@/types/content";

const CONTENT_DIR = path.join(process.cwd(), "content");

function isLocale(v: string): v is Locale {
  return SUPPORTED_LOCALES.includes(v as Locale);
}

function isEventSlug(v: string): v is EventSlug {
  return SUPPORTED_EVENT_SLUGS.includes(v as EventSlug);
}

function isHeroId(v: string): v is HeroId {
  return SUPPORTED_HERO_IDS.includes(v as HeroId);
}

function isBookId(v: string): v is BookId {
  return SUPPORTED_BOOK_IDS.includes(v as BookId);
}

function normalizeEventResource(resourceId: string, resource: Record<string, unknown>): EventResource {
  const title = String(resource.title ?? "");
  const author = String(resource.author ?? "");
  const note = String(resource.note ?? "");
  const href = typeof resource.href === "string" ? resource.href : undefined;
  const category = typeof resource.category === "string" ? resource.category : undefined;
  const subcategory = typeof resource.subcategory === "string" ? resource.subcategory : undefined;
  const legacyType = typeof resource.type === "string" ? resource.type : undefined;

  if (category && subcategory) {
    return {
      id: resourceId,
      title,
      author,
      note,
      href,
      category: category as EventResource["category"],
      subcategory: subcategory as EventResource["subcategory"],
    };
  }

  if (legacyType === "book") {
    return { id: resourceId, title, author, note, href, category: "read", subcategory: "historical-literature" };
  }
  if (legacyType === "article") {
    return { id: resourceId, title, author, note, href, category: "understand", subcategory: "research" };
  }
  return { id: resourceId, title, author, note, href, category: "explore", subcategory: "archive" };
}

const readJsonRawCached = cache(async (filePath: string): Promise<unknown> => {
  return JSON.parse(await fs.readFile(filePath, "utf-8"));
});

async function readJsonFile<T>(filePath: string): Promise<T> {
  return (await readJsonRawCached(filePath)) as T;
}

export function assertSupportedLocale(locale: string): asserts locale is Locale {
  if (!isLocale(locale)) throw new Error(`Unsupported locale: ${locale}`);
}

export function assertSupportedEventSlug(slug: string): asserts slug is EventSlug {
  if (!isEventSlug(slug)) throw new Error(`Unsupported event slug: ${slug}`);
}

export function assertSupportedHeroId(heroId: string): asserts heroId is HeroId {
  if (!isHeroId(heroId)) throw new Error(`Unsupported hero id: ${heroId}`);
}

export function assertSupportedBookId(bookId: string): asserts bookId is BookId {
  if (!isBookId(bookId)) throw new Error(`Unsupported book id: ${bookId}`);
}

export async function getHomeContent(locale: string): Promise<HomeContent> {
  assertSupportedLocale(locale);
  return readJsonFile(path.join(CONTENT_DIR, "site", `home.${locale}.json`));
}

export async function getEventMeta(locale: string, slug: string): Promise<EventMeta> {
  assertSupportedLocale(locale);
  assertSupportedEventSlug(slug);
  return readJsonFile(path.join(CONTENT_DIR, "events", slug, `meta.${locale}.json`));
}

export async function getHero(locale: string, heroId: string): Promise<Hero> {
  assertSupportedLocale(locale);
  assertSupportedHeroId(heroId);
  const hero = await readJsonFile<Omit<Hero, "id">>(path.join(CONTENT_DIR, "heroes", heroId, `meta.${locale}.json`));
  return { id: heroId, ...hero };
}

export async function getBook(locale: string, bookId: string): Promise<Book> {
  assertSupportedLocale(locale);
  assertSupportedBookId(bookId);
  const book = await readJsonFile<Omit<Book, "id">>(path.join(CONTENT_DIR, "books", bookId, `meta.${locale}.json`));
  return { id: bookId, ...book };
}

export async function getAllHeroes(locale: string): Promise<Hero[]> {
  assertSupportedLocale(locale);
  const indexPath = path.join(CONTENT_DIR, "heroes", `index.${locale}.json`);
  try {
    return await readJsonFile<Hero[]>(indexPath);
  } catch {
    return Promise.all(SUPPORTED_HERO_IDS.map((heroId) => getHero(locale, heroId)));
  }
}

export async function getAllBooks(locale: string): Promise<Book[]> {
  assertSupportedLocale(locale);
  return Promise.all(SUPPORTED_BOOK_IDS.map((bookId) => getBook(locale, bookId)));
}

export async function getResource(locale: string, resourceId: string): Promise<EventResource> {
  assertSupportedLocale(locale);
  const resource = await readJsonFile<Record<string, unknown>>(
    path.join(CONTENT_DIR, "resources", resourceId, `meta.${locale}.json`),
  );
  return normalizeEventResource(resourceId, resource);
}

export async function getEventContent(locale: string, slug: string): Promise<EventContent> {
  assertSupportedLocale(locale);
  assertSupportedEventSlug(slug);

  const base = path.join(CONTENT_DIR, "events", slug);
  const [meta, timeline, heroIds, quotes] = await Promise.all([
    readJsonFile<EventMeta>(path.join(base, `meta.${locale}.json`)),
    readJsonFile<TimelineItem[]>(path.join(base, `timeline.${locale}.json`)),
    readJsonFile<HeroId[]>(path.join(base, "hero-ids.json")),
    readJsonFile<Quote[]>(path.join(base, `quotes.${locale}.json`)),
  ]);

  const heroes = await Promise.all(heroIds.map((heroId) => getHero(locale, heroId)));
  const resourceIds = await readJsonFile<string[]>(path.join(base, "resource-ids.json"));
  const resources = await Promise.all(resourceIds.map((resourceId) => getResource(locale, resourceId)));

  return { meta, timeline, heroes, resources, quotes };
}

export async function getAllEvents(locale: string): Promise<EventMeta[]> {
  assertSupportedLocale(locale);
  return Promise.all(SUPPORTED_EVENT_SLUGS.map((slug) => getEventMeta(locale, slug)));
}

export async function getEventsByHeroId(locale: string, heroId: string): Promise<EventMeta[]> {
  assertSupportedLocale(locale);
  assertSupportedHeroId(heroId);

  const matches = await Promise.all(
    SUPPORTED_EVENT_SLUGS.map(async (slug) => {
      const heroIds = await readJsonFile<HeroId[]>(path.join(CONTENT_DIR, "events", slug, "hero-ids.json"));
      if (!heroIds.includes(heroId)) return null;
      return getEventMeta(locale, slug);
    }),
  );

  return matches.filter((event): event is EventMeta => event !== null);
}

export async function getEventsByBookId(locale: string, bookId: string): Promise<EventMeta[]> {
  assertSupportedLocale(locale);
  assertSupportedBookId(bookId);

  const matches = await Promise.all(
    SUPPORTED_EVENT_SLUGS.map(async (slug) => {
      const bookIds = await readJsonFile<BookId[]>(path.join(CONTENT_DIR, "events", slug, "book-ids.json"));
      if (!bookIds.includes(bookId)) return null;
      return getEventMeta(locale, slug);
    }),
  );

  return matches.filter((event): event is EventMeta => event !== null);
}

export async function getEventsByResourceId(locale: string, resourceId: string): Promise<EventMeta[]> {
  assertSupportedLocale(locale);

  const matches = await Promise.all(
    SUPPORTED_EVENT_SLUGS.map(async (slug) => {
      try {
        const resourceIds = await readJsonFile<string[]>(path.join(CONTENT_DIR, "events", slug, "resource-ids.json"));
        if (!resourceIds.includes(resourceId)) return null;
      } catch {
        return null;
      }
      return getEventMeta(locale, slug);
    }),
  );

  return matches.filter((event): event is EventMeta => event !== null);
}


export async function getHeroesByEventSlug(locale: string, slug: string): Promise<Hero[]> {
  assertSupportedLocale(locale);
  assertSupportedEventSlug(slug);

  const heroIds = await readJsonFile<HeroId[]>(path.join(CONTENT_DIR, "events", slug, "hero-ids.json"));
  return Promise.all(heroIds.map((heroId) => getHero(locale, heroId)));
}

// Future CMS migration: swap file readers with provider adapters while preserving these return types.
