import { promises as fs } from "node:fs";
import path from "node:path";
import {
  SUPPORTED_BOOK_IDS,
  SUPPORTED_EVENT_SLUGS,
  SUPPORTED_HERO_IDS,
  SUPPORTED_LOCALES,
  type Book,
  type BookId,
  type EventContent,
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

async function readJsonFile<T>(filePath: string): Promise<T> {
  return JSON.parse(await fs.readFile(filePath, "utf-8")) as T;
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
  return Promise.all(SUPPORTED_HERO_IDS.map((heroId) => getHero(locale, heroId)));
}

export async function getAllBooks(locale: string): Promise<Book[]> {
  assertSupportedLocale(locale);
  return Promise.all(SUPPORTED_BOOK_IDS.map((bookId) => getBook(locale, bookId)));
}

export async function getEventContent(locale: string, slug: string): Promise<EventContent> {
  assertSupportedLocale(locale);
  assertSupportedEventSlug(slug);

  const base = path.join(CONTENT_DIR, "events", slug);
  const [meta, timeline, heroIds, bookIds, quotes] = await Promise.all([
    readJsonFile<EventMeta>(path.join(base, `meta.${locale}.json`)),
    readJsonFile<TimelineItem[]>(path.join(base, `timeline.${locale}.json`)),
    readJsonFile<HeroId[]>(path.join(base, "hero-ids.json")),
    readJsonFile<BookId[]>(path.join(base, "book-ids.json")),
    readJsonFile<Quote[]>(path.join(base, `quotes.${locale}.json`)),
  ]);

  const [heroes, books] = await Promise.all([
    Promise.all(heroIds.map((heroId) => getHero(locale, heroId))),
    Promise.all(bookIds.map((bookId) => getBook(locale, bookId))),
  ]);

  return { meta, timeline, heroes, books, quotes };
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

// Future CMS migration: swap file readers with provider adapters while preserving these return types.
