import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import {
  SUPPORTED_BOOK_IDS,
  SUPPORTED_EVENT_SLUGS,
  SUPPORTED_FIGURE_IDS,
  SUPPORTED_LOCALES,
  type Book,
  type BookId,
  type Creator,
  type EventContent,
  type EventResource,
  type EventMeta,
  type EventSlug,
  type Figure,
  type FigureId,
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

function isFigureId(v: string): v is FigureId {
  return SUPPORTED_FIGURE_IDS.includes(v as FigureId);
}

function isBookId(v: string): v is BookId {
  return SUPPORTED_BOOK_IDS.includes(v as BookId);
}

export function getCreatorIdFromAttribution(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "unknown";
}

function normalizeEventResource(resourceId: string, resource: Record<string, unknown>): EventResource {
  const title = String(resource.title ?? "");
  const attribution = String(resource.attribution ?? resource.creator ?? resource.author ?? "");
  const creatorId = getCreatorIdFromAttribution(attribution);
  const creatorTypeRaw = typeof resource.creatorType === "string" ? resource.creatorType.toLowerCase() : "";
  const creatorType = creatorTypeRaw === "organization" || creatorTypeRaw === "person"
    ? (creatorTypeRaw as EventResource["creatorType"])
    : undefined;
  const note = String(resource.note ?? "");
  const href = typeof resource.href === "string" ? resource.href : undefined;
  const qualityRaw = typeof resource.quality === "string" ? resource.quality.toLowerCase() : "";
  const quality = qualityRaw === "primary" || qualityRaw === "secondary" || qualityRaw === "archive" || qualityRaw === "editorial"
    ? (qualityRaw as EventResource["quality"])
    : undefined;
  const category = typeof resource.category === "string" ? resource.category : undefined;
  const subcategory = typeof resource.subcategory === "string" ? resource.subcategory : undefined;
  const legacyType = typeof resource.type === "string" ? resource.type : undefined;

  if (category && subcategory) {
    return {
      id: resourceId,
      title,
      attribution,
      creatorId,
      creatorType,
      note,
      quality,
      href,
      category: category as EventResource["category"],
      subcategory: subcategory as EventResource["subcategory"],
    };
  }

  if (legacyType === "book") {
    return { id: resourceId, title, attribution, creatorId, creatorType, note, quality, href, category: "read", subcategory: "historical-literature" };
  }
  if (legacyType === "article") {
    return { id: resourceId, title, attribution, creatorId, creatorType, note, quality, href, category: "understand", subcategory: "research" };
  }
  return { id: resourceId, title, attribution, creatorId, creatorType, note, quality, href, category: "explore", subcategory: "archive" };
}

function normalizeBook(bookId: BookId, rawBook: Record<string, unknown>): Book {
  const title = String(rawBook.title ?? "");
  const note = String(rawBook.note ?? "");
  const type = rawBook.type === "article" || rawBook.type === "archive" ? rawBook.type : "book";

  const authors = Array.isArray(rawBook.authors)
    ? rawBook.authors.filter((author): author is string => typeof author === "string" && author.trim().length > 0)
    : [];
  const legacyAuthor = typeof rawBook.author === "string" ? rawBook.author.trim() : "";
  const fallbackAttribution = typeof rawBook.attribution === "string" ? rawBook.attribution.trim() : "";
  const fallbackCreator = typeof rawBook.creator === "string" ? rawBook.creator.trim() : "";
  const normalizedAuthors = authors.length > 0
    ? authors
    : legacyAuthor
      ? [legacyAuthor]
      : fallbackAttribution
        ? [fallbackAttribution]
        : fallbackCreator
          ? [fallbackCreator]
          : [];

  return {
    id: bookId,
    title,
    author: normalizedAuthors[0] ?? "",
    authors: normalizedAuthors,
    type,
    note,
  };
}

function inferFigureGroup(role: string): Figure["group"] {
  const r = role.toLowerCase();
  if (r.includes("শহীদ") || r.includes("martyr")) return "martyr";
  if (r.includes("শিল্পী") || r.includes("artists") || r.includes("collective")) return "collective";
  if (r.includes("সংগঠন") || r.includes("organization")) return "organization";
  if (r.includes("সমন্ব") || r.includes("coordinator")) return "coordinator";
  return "leader";
}

function normalizeFigure(id: FigureId, locale: Locale, figure: Record<string, unknown>): Figure {
  const name = String(figure.name ?? "");
  const role = String(figure.role ?? "");
  const legacyBio = String(figure.bio ?? "");
  const legacyImpact = String(figure.impact ?? "");

  const group = typeof figure.group === "string" ? (figure.group as Figure["group"]) : inferFigureGroup(role);
  const contribution = String(
    figure.contribution ??
      (legacyBio || (locale === "bn" ? "ঐতিহাসিক ধারাবাহিকতায় গুরুত্বপূর্ণ ভূমিকা রেখেছেন।" : "Played a notable role in this historical timeline.")),
  );
  const context = String(
    figure.context ??
      (locale === "bn"
        ? "প্রাসঙ্গিক অধ্যায়, আন্দোলন এবং রাজনৈতিক মুহূর্তের সাথে যুক্ত।"
        : "Connected to key chapters, movements, and political turning points."),
  );
  const impact = String(
    figure.impact ??
      figure.legacyImpact ??
      (legacyImpact || (locale === "bn" ? "তার ভূমিকা জনস্মৃতি ও নাগরিক চেতনায় প্রভাব ফেলেছে।" : "Their role shaped public memory and civic consciousness.")),
  );
  const tags = Array.isArray(figure.tags) ? figure.tags.map(String).filter(Boolean) : undefined;

  return {
    id,
    name,
    name_en: typeof figure.name_en === "string" ? figure.name_en : undefined,
    role,
    group,
    contribution,
    context,
    impact,
    highlight: typeof figure.highlight === "string" ? figure.highlight : undefined,
    tags,
    image: typeof figure.image === "string" ? figure.image : undefined,
  };
}

const readJsonRawCached = cache(async (filePath: string): Promise<unknown> => {
  return JSON.parse(await fs.readFile(filePath, "utf-8"));
});

async function readJsonFile<T>(filePath: string): Promise<T> {
  return (await readJsonRawCached(filePath)) as T;
}

const readResourceIdsCached = cache(async (): Promise<string[]> => {
  const resourceDir = path.join(CONTENT_DIR, "resources");
  const entries = await fs.readdir(resourceDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
});

export function assertSupportedLocale(locale: string): asserts locale is Locale {
  if (!isLocale(locale)) throw new Error(`Unsupported locale: ${locale}`);
}

export function assertSupportedEventSlug(slug: string): asserts slug is EventSlug {
  if (!isEventSlug(slug)) throw new Error(`Unsupported event slug: ${slug}`);
}

export function assertSupportedFigureId(figureId: string): asserts figureId is FigureId {
  if (!isFigureId(figureId)) throw new Error(`Unsupported figure id: ${figureId}`);
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

export async function getFigure(locale: string, figureId: string): Promise<Figure> {
  assertSupportedLocale(locale);
  assertSupportedFigureId(figureId);
  const figure = await readJsonFile<Record<string, unknown>>(path.join(CONTENT_DIR, "figures", figureId, `meta.${locale}.json`));
  return normalizeFigure(figureId, locale, figure);
}

export async function getBook(locale: string, bookId: string): Promise<Book> {
  assertSupportedLocale(locale);
  assertSupportedBookId(bookId);
  const rawBook = await readJsonFile<Record<string, unknown>>(path.join(CONTENT_DIR, "resources", bookId, `meta.${locale}.json`));
  return normalizeBook(bookId, rawBook);
}

export async function getAllFigures(locale: string): Promise<Figure[]> {
  assertSupportedLocale(locale);
  return Promise.all(SUPPORTED_FIGURE_IDS.map((figureId) => getFigure(locale, figureId)));
}

export async function getAllBooks(locale: string): Promise<Book[]> {
  assertSupportedLocale(locale);
  return Promise.all(SUPPORTED_BOOK_IDS.map((bookId) => getBook(locale, bookId)));
}

export async function getAllResourceIds(): Promise<string[]> {
  return readResourceIdsCached();
}

export async function getResource(locale: string, resourceId: string): Promise<EventResource> {
  assertSupportedLocale(locale);
  const resource = await readJsonFile<Record<string, unknown>>(
    path.join(CONTENT_DIR, "resources", resourceId, `meta.${locale}.json`),
  );
  return normalizeEventResource(resourceId, resource);
}

export async function getAllResources(locale: string): Promise<EventResource[]> {
  assertSupportedLocale(locale);
  const resourceIds = await getAllResourceIds();
  return Promise.all(resourceIds.map((resourceId) => getResource(locale, resourceId)));
}

const creatorsCached = cache(async (locale: string): Promise<Map<string, Creator>> => {
  const resources = await getAllResources(locale);
  const byId = new Map<string, Creator>();

  for (const resource of resources) {
    const name = resource.attribution.trim();
    if (!name) continue;
    const id = resource.creatorId;
    const current = byId.get(id);
    if (!current) {
      byId.set(id, {
        id,
        name,
        type: resource.creatorType ?? "person",
      });
      continue;
    }
    if (current.type === "person" && resource.creatorType === "organization") {
      byId.set(id, { ...current, type: "organization" });
    }
  }

  return byId;
});

export async function getAllCreators(locale: string): Promise<Creator[]> {
  assertSupportedLocale(locale);
  const creatorsMap = await creatorsCached(locale);
  return Array.from(creatorsMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getCreatorById(locale: string, creatorId: string): Promise<Creator | null> {
  assertSupportedLocale(locale);
  const creators = await creatorsCached(locale);
  return creators.get(creatorId) ?? null;
}

export async function getResourcesByCreatorId(locale: string, creatorId: string): Promise<EventResource[]> {
  assertSupportedLocale(locale);
  const creator = await getCreatorById(locale, creatorId);
  if (!creator) return [];
  const resources = await getAllResources(locale);
  return resources.filter((resource) => resource.attribution.trim() === creator.name);
}

export async function getEventContent(locale: string, slug: string): Promise<EventContent> {
  assertSupportedLocale(locale);
  assertSupportedEventSlug(slug);

  const base = path.join(CONTENT_DIR, "events", slug);
  const [meta, timeline, figureIds, quotes] = await Promise.all([
    readJsonFile<EventMeta>(path.join(base, `meta.${locale}.json`)),
    readJsonFile<TimelineItem[]>(path.join(base, `timeline.${locale}.json`)),
    readJsonFile<FigureId[]>(path.join(base, "figure-ids.json")),
    readJsonFile<Quote[]>(path.join(base, `quotes.${locale}.json`)),
  ]);

  const figures = await Promise.all(figureIds.map((figureId) => getFigure(locale, figureId)));
  const resourceIds = await readJsonFile<string[]>(path.join(base, "resource-ids.json"));
  const resources = await Promise.all(resourceIds.map((resourceId) => getResource(locale, resourceId)));

  return { meta, timeline, figures, resources, quotes };
}

export async function getAllEvents(locale: string): Promise<EventMeta[]> {
  assertSupportedLocale(locale);
  return Promise.all(SUPPORTED_EVENT_SLUGS.map((slug) => getEventMeta(locale, slug)));
}

export async function getPreviousAndNextEvents(
  locale: string,
  currentSlug: string,
): Promise<{ previous?: EventMeta; next?: EventMeta }> {
  assertSupportedLocale(locale);
  assertSupportedEventSlug(currentSlug);

  const currentIndex = SUPPORTED_EVENT_SLUGS.indexOf(currentSlug as EventSlug);

  const [previous, next] = await Promise.all([
    currentIndex > 0 ? getEventMeta(locale, SUPPORTED_EVENT_SLUGS[currentIndex - 1]) : Promise.resolve(undefined),
    currentIndex < SUPPORTED_EVENT_SLUGS.length - 1
      ? getEventMeta(locale, SUPPORTED_EVENT_SLUGS[currentIndex + 1])
      : Promise.resolve(undefined),
  ]);

  return { previous, next };
}

export async function getEventMetaForDisplay(
  locale: string,
  slug: string,
): Promise<{ title: string; year: string; slug: EventSlug }> {
  assertSupportedLocale(locale);
  assertSupportedEventSlug(slug);

  const meta = await getEventMeta(locale, slug);
  return { title: meta.title, year: meta.year, slug: meta.slug };
}

export async function getEventsByFigureId(locale: string, figureId: string): Promise<EventMeta[]> {
  assertSupportedLocale(locale);
  assertSupportedFigureId(figureId);

  const matches = await Promise.all(
    SUPPORTED_EVENT_SLUGS.map(async (slug) => {
      const figureIds = await readJsonFile<FigureId[]>(path.join(CONTENT_DIR, "events", slug, "figure-ids.json"));
      if (!figureIds.includes(figureId)) return null;
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
      const resourceIds = await readJsonFile<string[]>(path.join(CONTENT_DIR, "events", slug, "resource-ids.json"));
      if (!resourceIds.includes(bookId)) return null;
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


export async function getFiguresByEventSlug(locale: string, slug: string): Promise<Figure[]> {
  assertSupportedLocale(locale);
  assertSupportedEventSlug(slug);

  const figureIds = await readJsonFile<FigureId[]>(path.join(CONTENT_DIR, "events", slug, "figure-ids.json"));
  return Promise.all(figureIds.map((figureId) => getFigure(locale, figureId)));
}

// Future CMS migration: swap file readers with provider adapters while preserving these return types.
