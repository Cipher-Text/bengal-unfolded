import { promises as fs } from "node:fs";
import path from "node:path";
import { cache } from "react";
import {
  SUPPORTED_BOOK_IDS,
  SUPPORTED_EVENT_SLUGS,
  SUPPORTED_FIGURE_IDS,
  SUPPORTED_PERIOD_IDS,
  SUPPORTED_MOVEMENT_IDS,
  SUPPORTED_PLACE_IDS,
  SUPPORTED_LOCALES,
  type Book,
  type BookId,
  type Creator,
  type EventContent,
  type EventRelationType,
  type EventSlug,
  type EventResource,
  type EventMeta,
  type Figure,
  type FigureId,
  type HomeContent,
  type GlossaryTerm,
  type Locale,
  type Movement,
  type MovementId,
  type MovementMeta,
  type Place,
  type PlaceId,
  type PlaceMeta,
  type Period,
  type PeriodId,
  type PeriodMeta,
  type Quote,
  type TimelineItem,
  type Topic,
  type TopicMeta,
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

function isPeriodId(v: string): v is PeriodId {
  return SUPPORTED_PERIOD_IDS.includes(v as PeriodId);
}

function isMovementId(v: string): v is MovementId {
  return SUPPORTED_MOVEMENT_IDS.includes(v as MovementId);
}

function isPlaceId(v: string): v is PlaceId {
  return SUPPORTED_PLACE_IDS.includes(v as PlaceId);
}

function parseEventYearToSortValue(yearLabel: string, slug: EventSlug): number {
  const normalized = yearLabel.toLowerCase();
  const isBce = normalized.includes("bce") || slug.toLowerCase().includes("bce");

  const centuryMatch = normalized.match(/(\d{1,2})(?:st|nd|rd|th)\s+century/);
  if (centuryMatch) {
    const century = Number.parseInt(centuryMatch[1], 10);
    if (Number.isFinite(century)) {
      const midpointYear = (century - 1) * 100 + 50;
      return isBce ? -midpointYear : midpointYear;
    }
  }

  const yearMatch = normalized.match(/\d{3,4}/);
  if (yearMatch) {
    const parsedYear = Number.parseInt(yearMatch[0], 10);
    if (Number.isFinite(parsedYear)) return isBce ? -parsedYear : parsedYear;
  }

  const slugYearMatch = slug.match(/\d{3,4}/);
  if (slugYearMatch) {
    const parsedSlugYear = Number.parseInt(slugYearMatch[0], 10);
    if (Number.isFinite(parsedSlugYear))
      return slug.toLowerCase().includes("bce") ? -parsedSlugYear : parsedSlugYear;
  }

  return Number.POSITIVE_INFINITY;
}

const getChronologicalEventSlugs = cache(async (locale: Locale): Promise<EventSlug[]> => {
  const events = await Promise.all(
    SUPPORTED_EVENT_SLUGS.map(async (slug, index) => {
      const meta = await getEventMeta(locale, slug);
      return {
        slug,
        index,
        sortValue: parseEventYearToSortValue(meta.year, slug),
      };
    }),
  );

  events.sort((a, b) => {
    if (a.sortValue !== b.sortValue) return a.sortValue - b.sortValue;
    return a.index - b.index;
  });

  return events.map((event) => event.slug);
});

export function getCreatorIdFromAttribution(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "unknown"
  );
}

function normalizeEventResource(
  resourceId: string,
  resource: Record<string, unknown>,
): EventResource {
  const title = String(resource.title ?? "");
  const seoTitle =
    typeof resource.seoTitle === "string" ? resource.seoTitle : undefined;
  const seoDescription =
    typeof resource.seoDescription === "string"
      ? resource.seoDescription
      : undefined;
  const attribution = String(
    resource.attribution ?? resource.creator ?? resource.author ?? "",
  );
  const explicitCreatorId =
    typeof resource.creatorId === "string"
      ? getCreatorIdFromAttribution(resource.creatorId)
      : "";
  const creatorId = explicitCreatorId || getCreatorIdFromAttribution(attribution);
  const creatorTypeRaw =
    typeof resource.creatorType === "string"
      ? resource.creatorType.toLowerCase()
      : "";
  const creatorType =
    creatorTypeRaw === "organization" || creatorTypeRaw === "person"
      ? (creatorTypeRaw as EventResource["creatorType"])
      : undefined;
  const note = String(resource.note ?? "");
  const href = typeof resource.href === "string" ? resource.href : undefined;
  const qualityRaw =
    typeof resource.quality === "string" ? resource.quality.toLowerCase() : "";
  const quality =
    qualityRaw === "primary" ||
    qualityRaw === "secondary" ||
    qualityRaw === "archive" ||
    qualityRaw === "editorial"
      ? (qualityRaw as EventResource["quality"])
      : "secondary";
  const category =
    typeof resource.category === "string" ? resource.category : undefined;
  const subcategory =
    typeof resource.subcategory === "string" ? resource.subcategory : undefined;
  const legacyType =
    typeof resource.type === "string" ? resource.type : undefined;
  const sourceQualityRaw =
    typeof resource.sourceQuality === "string"
      ? resource.sourceQuality.toLowerCase()
      : undefined;
  const sourceQuality =
    sourceQualityRaw === "primary" ||
    sourceQualityRaw === "secondary" ||
    sourceQualityRaw === "archive" ||
    sourceQualityRaw === "academic" ||
    sourceQualityRaw === "editorial" ||
    sourceQualityRaw === "reference" ||
    sourceQualityRaw === "unknown"
      ? sourceQualityRaw
      : undefined;
  const evidenceLevelRaw =
    typeof resource.evidenceLevel === "string"
      ? resource.evidenceLevel.toLowerCase()
      : undefined;
  const evidenceLevel =
    evidenceLevelRaw === "high" ||
    evidenceLevelRaw === "medium" ||
    evidenceLevelRaw === "low"
      ? evidenceLevelRaw
      : undefined;
  const relatedEventIds = Array.isArray(resource.relatedEventIds)
    ? resource.relatedEventIds
        .filter((value): value is string => typeof value === "string")
        .filter((value): value is EventSlug => isEventSlug(value))
    : undefined;
  const relatedFigureIds = Array.isArray(resource.relatedFigureIds)
    ? resource.relatedFigureIds
        .filter((value): value is string => typeof value === "string")
        .filter((value): value is FigureId => isFigureId(value))
    : undefined;
  const relatedTopicIds = Array.isArray(resource.relatedTopicIds)
    ? resource.relatedTopicIds.filter(
        (value): value is string => typeof value === "string" && value.trim().length > 0,
      )
    : undefined;
  const whyItMatters =
    typeof resource.whyItMatters === "string" ? resource.whyItMatters : undefined;

  if (category && subcategory) {
    const normalizedCategory =
      category === "read"
        ? "academic-books"
        : category === "watch"
          ? "documentary-and-video"
          : category === "explore"
            ? "maps-and-visual-sources"
            : category === "understand"
              ? "reference-sources"
              : category;
    return {
      id: resourceId,
      title,
      seoTitle,
      seoDescription,
      attribution,
      creatorId,
      creatorType,
      note,
      quality,
      sourceQuality,
      evidenceLevel,
      href,
      category: normalizedCategory as EventResource["category"],
      subcategory: subcategory as EventResource["subcategory"],
      relatedEventIds,
      relatedFigureIds,
      relatedTopicIds,
      whyItMatters,
    };
  }

  if (legacyType === "book") {
    return {
      id: resourceId,
      title,
      seoTitle,
      seoDescription,
      attribution,
      creatorId,
      creatorType,
      note,
      quality,
      sourceQuality,
      evidenceLevel,
      href,
      category: "academic-books",
      subcategory: "Book",
      relatedEventIds,
      relatedFigureIds,
      relatedTopicIds,
      whyItMatters,
    };
  }
  if (legacyType === "article") {
    return {
      id: resourceId,
      title,
      seoTitle,
      seoDescription,
      attribution,
      creatorId,
      creatorType,
      note,
      quality,
      sourceQuality,
      evidenceLevel,
      href,
      category: "research-articles-and-papers",
      subcategory: "Research Article",
      relatedEventIds,
      relatedFigureIds,
      relatedTopicIds,
      whyItMatters,
    };
  }
  return {
    id: resourceId,
    title,
    seoTitle,
    seoDescription,
    attribution,
    creatorId,
    creatorType,
    note,
    quality,
    sourceQuality,
    evidenceLevel,
    href,
    category: "further-reading",
    subcategory: "General",
    relatedEventIds,
    relatedFigureIds,
    relatedTopicIds,
    whyItMatters,
  };
}

function normalizeBook(bookId: BookId, rawBook: Record<string, unknown>): Book {
  const title = String(rawBook.title ?? "");
  const note = String(rawBook.note ?? "");
  const type =
    rawBook.type === "article" || rawBook.type === "archive"
      ? rawBook.type
      : "book";

  const authors = Array.isArray(rawBook.authors)
    ? rawBook.authors.filter(
        (author): author is string =>
          typeof author === "string" && author.trim().length > 0,
      )
    : [];
  const legacyAuthor =
    typeof rawBook.author === "string" ? rawBook.author.trim() : "";
  const fallbackAttribution =
    typeof rawBook.attribution === "string" ? rawBook.attribution.trim() : "";
  const fallbackCreator =
    typeof rawBook.creator === "string" ? rawBook.creator.trim() : "";
  const normalizedAuthors =
    authors.length > 0
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
  if (r.includes("শিল্পী") || r.includes("artists") || r.includes("collective"))
    return "collective";
  if (r.includes("সংগঠন") || r.includes("organization")) return "organization";
  if (r.includes("সমন্ব") || r.includes("coordinator")) return "coordinator";
  return "leader";
}

function normalizeFigure(
  id: FigureId,
  locale: Locale,
  figure: Record<string, unknown>,
): Figure {
  const name = String(figure.name ?? "");
  const role = String(figure.role ?? "");
  const legacyBio = String(figure.bio ?? "");
  const legacyImpact = String(figure.impact ?? "");

  const group =
    typeof figure.group === "string"
      ? (figure.group as Figure["group"])
      : inferFigureGroup(role);
  const contribution = String(
    figure.contribution ??
      (legacyBio ||
        (locale === "bn"
          ? "ঐতিহাসিক ধারাবাহিকতায় গুরুত্বপূর্ণ ভূমিকা রেখেছেন।"
          : "Played a notable role in this historical timeline.")),
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
      (legacyImpact ||
        (locale === "bn"
          ? "তার ভূমিকা জনস্মৃতি ও নাগরিক চেতনায় প্রভাব ফেলেছে।"
          : "Their role shaped public memory and civic consciousness.")),
  );
  const tags = Array.isArray(figure.tags)
    ? figure.tags.map(String).filter(Boolean)
    : undefined;

  return {
    id,
    name,
    name_en: typeof figure.name_en === "string" ? figure.name_en : undefined,
    seoTitle: typeof figure.seoTitle === "string" ? figure.seoTitle : undefined,
    seoDescription:
      typeof figure.seoDescription === "string" ? figure.seoDescription : undefined,
    shortAnswer:
      typeof figure.shortAnswer === "string" ? figure.shortAnswer : undefined,
    birthYear: typeof figure.birthYear === "string" ? figure.birthYear : undefined,
    deathYear: typeof figure.deathYear === "string" ? figure.deathYear : undefined,
    activePeriod:
      typeof figure.activePeriod === "string" ? figure.activePeriod : undefined,
    role,
    group,
    contribution,
    context,
    impact,
    highlight:
      typeof figure.highlight === "string" ? figure.highlight : undefined,
    tags,
    primaryEventIds: Array.isArray(figure.primaryEventIds)
      ? figure.primaryEventIds
          .filter((value): value is string => typeof value === "string")
          .filter((value): value is EventSlug => isEventSlug(value))
      : undefined,
    relatedPlaceIds: Array.isArray(figure.relatedPlaceIds)
      ? figure.relatedPlaceIds
          .filter((value): value is string => typeof value === "string")
          .filter((value): value is PlaceId => isPlaceId(value))
      : undefined,
    alternateNames: Array.isArray(figure.alternateNames)
      ? figure.alternateNames.filter(
          (value): value is string => typeof value === "string" && value.trim().length > 0,
        )
      : undefined,
    searchAliases: Array.isArray(figure.searchAliases)
      ? figure.searchAliases.filter(
          (value): value is string => typeof value === "string" && value.trim().length > 0,
        )
      : undefined,
    faq: Array.isArray(figure.faq)
      ? figure.faq
          .filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === "object")
          .map((item) => ({
            question: typeof item.question === "string" ? item.question : "",
            answer: typeof item.answer === "string" ? item.answer : "",
            sourceIds: Array.isArray(item.sourceIds)
              ? item.sourceIds.filter((value): value is string => typeof value === "string")
              : undefined,
          }))
      : undefined,
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

const readGlossaryIdsCached = cache(async (): Promise<string[]> => {
  const glossaryDir = path.join(CONTENT_DIR, "glossary");
  const entries = await fs.readdir(glossaryDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
});

const readTopicSlugsCached = cache(async (): Promise<string[]> => {
  const topicsDir = path.join(CONTENT_DIR, "topics");
  const entries = await fs.readdir(topicsDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
});

export function assertSupportedLocale(
  locale: string,
): asserts locale is Locale {
  if (!isLocale(locale)) throw new Error(`Unsupported locale: ${locale}`);
}

export function assertSupportedEventSlug(
  slug: string,
): asserts slug is EventSlug {
  if (!isEventSlug(slug)) throw new Error(`Unsupported event slug: ${slug}`);
}

export function assertSupportedFigureId(
  figureId: string,
): asserts figureId is FigureId {
  if (!isFigureId(figureId))
    throw new Error(`Unsupported figure id: ${figureId}`);
}

export function assertSupportedBookId(
  bookId: string,
): asserts bookId is BookId {
  if (!isBookId(bookId)) throw new Error(`Unsupported book id: ${bookId}`);
}

export function assertSupportedPeriodId(
  periodId: string,
): asserts periodId is PeriodId {
  if (!isPeriodId(periodId))
    throw new Error(`Unsupported period id: ${periodId}`);
}

export function assertSupportedMovementId(
  movementId: string,
): asserts movementId is MovementId {
  if (!isMovementId(movementId))
    throw new Error(`Unsupported movement id: ${movementId}`);
}

export function assertSupportedPlaceId(
  placeId: string,
): asserts placeId is PlaceId {
  if (!isPlaceId(placeId))
    throw new Error(`Unsupported place id: ${placeId}`);
}

export async function getHomeContent(locale: string): Promise<HomeContent> {
  assertSupportedLocale(locale);
  return readJsonFile(path.join(CONTENT_DIR, "site", `home.${locale}.json`));
}

export async function getEventMeta(
  locale: string,
  slug: string,
): Promise<EventMeta> {
  assertSupportedLocale(locale);
  assertSupportedEventSlug(slug);
  return readJsonFile(
    path.join(CONTENT_DIR, "events", slug, `meta.${locale}.json`),
  );
}

export async function getFigure(
  locale: string,
  figureId: string,
): Promise<Figure> {
  assertSupportedLocale(locale);
  assertSupportedFigureId(figureId);
  const figure = await readJsonFile<Record<string, unknown>>(
    path.join(CONTENT_DIR, "figures", figureId, `meta.${locale}.json`),
  );
  return normalizeFigure(figureId, locale, figure);
}

export async function getBook(locale: string, bookId: string): Promise<Book> {
  assertSupportedLocale(locale);
  assertSupportedBookId(bookId);
  const rawBook = await readJsonFile<Record<string, unknown>>(
    path.join(CONTENT_DIR, "resources", bookId, `meta.${locale}.json`),
  );
  return normalizeBook(bookId, rawBook);
}

export async function getAllFigures(locale: string): Promise<Figure[]> {
  assertSupportedLocale(locale);
  return Promise.all(
    SUPPORTED_FIGURE_IDS.map((figureId) => getFigure(locale, figureId)),
  );
}

const figureFirstEventRankCached = cache(
  async (locale: Locale): Promise<Map<FigureId, number>> => {
    const chronologicalSlugs = await getChronologicalEventSlugs(locale);
    const rank = new Map<FigureId, number>();

    await Promise.all(
      chronologicalSlugs.map(async (slug, index) => {
        const figureIds = await readJsonFile<FigureId[]>(
          path.join(CONTENT_DIR, "events", slug, "figure-ids.json"),
        );

        for (const figureId of figureIds) {
          if (!rank.has(figureId)) rank.set(figureId, index);
        }
      }),
    );

    return rank;
  },
);

export async function getAllFiguresChronological(locale: string): Promise<Figure[]> {
  assertSupportedLocale(locale);

  const [figures, firstEventRank] = await Promise.all([
    getAllFigures(locale),
    figureFirstEventRankCached(locale as Locale),
  ]);

  return [...figures].sort((a, b) => {
    const aRank = firstEventRank.get(a.id as FigureId) ?? Number.MAX_SAFE_INTEGER;
    const bRank = firstEventRank.get(b.id as FigureId) ?? Number.MAX_SAFE_INTEGER;
    if (aRank !== bRank) return aRank - bRank;
    return a.name.localeCompare(b.name);
  });
}

export async function getAllBooks(locale: string): Promise<Book[]> {
  assertSupportedLocale(locale);
  return Promise.all(
    SUPPORTED_BOOK_IDS.map((bookId) => getBook(locale, bookId)),
  );
}

export async function getAllResourceIds(): Promise<string[]> {
  return readResourceIdsCached();
}

export async function getResource(
  locale: string,
  resourceId: string,
): Promise<EventResource> {
  assertSupportedLocale(locale);
  const resource = await readJsonFile<Record<string, unknown>>(
    path.join(CONTENT_DIR, "resources", resourceId, `meta.${locale}.json`),
  );
  return normalizeEventResource(resourceId, resource);
}

export async function getAllResources(
  locale: string,
): Promise<EventResource[]> {
  assertSupportedLocale(locale);
  const resourceIds = await getAllResourceIds();
  return Promise.all(
    resourceIds.map((resourceId) => getResource(locale, resourceId)),
  );
}

export async function getAllGlossaryTermIds(): Promise<string[]> {
  return readGlossaryIdsCached();
}

export async function getGlossaryTerm(
  locale: string,
  termId: string,
): Promise<GlossaryTerm> {
  assertSupportedLocale(locale);
  return readJsonFile(
    path.join(CONTENT_DIR, "glossary", termId, `meta.${locale}.json`),
  );
}

export async function getAllGlossaryTerms(
  locale: string,
): Promise<GlossaryTerm[]> {
  assertSupportedLocale(locale);
  const ids = await getAllGlossaryTermIds();
  return Promise.all(ids.map((id) => getGlossaryTerm(locale, id)));
}

export async function getAllTopicSlugs(): Promise<string[]> {
  return readTopicSlugsCached();
}

export async function getTopic(locale: string, slug: string): Promise<Topic> {
  assertSupportedLocale(locale);
  const rawTopic = await readJsonFile<TopicMeta>(
    path.join(CONTENT_DIR, "topics", slug, `meta.${locale}.json`),
  );
  return rawTopic;
}

export async function getAllTopics(locale: string): Promise<Topic[]> {
  assertSupportedLocale(locale);
  const slugs = await getAllTopicSlugs();
  return Promise.all(slugs.map((slug) => getTopic(locale, slug)));
}

export async function getTopicsByEventSlug(
  locale: string,
  eventSlug: string,
): Promise<Topic[]> {
  assertSupportedLocale(locale);
  assertSupportedEventSlug(eventSlug);
  const topics = await getAllTopics(locale);
  return topics.filter((topic) => topic.eventSlugs.includes(eventSlug as EventSlug));
}

export async function getTopicsByFigureId(
  locale: string,
  figureId: string,
): Promise<Topic[]> {
  assertSupportedLocale(locale);
  assertSupportedFigureId(figureId);
  const topics = await getAllTopics(locale);
  return topics.filter((topic) => topic.figureIds?.includes(figureId as FigureId));
}

export async function getTopicsByResourceId(
  locale: string,
  resourceId: string,
): Promise<Topic[]> {
  assertSupportedLocale(locale);
  const topics = await getAllTopics(locale);
  return topics.filter((topic) => topic.resourceIds?.includes(resourceId));
}

const creatorsCached = cache(
  async (locale: string): Promise<Map<string, Creator>> => {
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
      if (
        current.type === "person" &&
        resource.creatorType === "organization"
      ) {
        byId.set(id, { ...current, type: "organization" });
      }
    }

    return byId;
  },
);

export async function getAllCreators(locale: string): Promise<Creator[]> {
  assertSupportedLocale(locale);
  const creatorsMap = await creatorsCached(locale);
  return Array.from(creatorsMap.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export async function getCreatorById(
  locale: string,
  creatorId: string,
): Promise<Creator | null> {
  assertSupportedLocale(locale);
  const creators = await creatorsCached(locale);
  return creators.get(creatorId) ?? null;
}

export async function getResourcesByCreatorId(
  locale: string,
  creatorId: string,
): Promise<EventResource[]> {
  assertSupportedLocale(locale);
  const creator = await getCreatorById(locale, creatorId);
  if (!creator) return [];
  const resources = await getAllResources(locale);
  return resources.filter(
    (resource) => resource.attribution.trim() === creator.name,
  );
}

export async function getEventContent(
  locale: string,
  slug: string,
): Promise<EventContent> {
  assertSupportedLocale(locale);
  assertSupportedEventSlug(slug);

  const base = path.join(CONTENT_DIR, "events", slug);
  const [meta, timeline, figureIds, quotes] = await Promise.all([
    readJsonFile<EventMeta>(path.join(base, `meta.${locale}.json`)),
    readJsonFile<TimelineItem[]>(path.join(base, `timeline.${locale}.json`)),
    readJsonFile<FigureId[]>(path.join(base, "figure-ids.json")),
    readJsonFile<Quote[]>(path.join(base, `quotes.${locale}.json`)),
  ]);

  const figures = await Promise.all(
    figureIds.map((figureId) => getFigure(locale, figureId)),
  );
  const resourceIds = await readJsonFile<string[]>(
    path.join(base, "resource-ids.json"),
  );
  const resources = await Promise.all(
    resourceIds.map((resourceId) => getResource(locale, resourceId)),
  );

  return { meta, timeline, figures, resources, quotes };
}

export async function getAllEvents(locale: string): Promise<EventMeta[]> {
  assertSupportedLocale(locale);
  const chronologicalSlugs = await getChronologicalEventSlugs(locale as Locale);
  return Promise.all(chronologicalSlugs.map((slug) => getEventMeta(locale, slug)));
}

export async function getEventHierarchy(
  locale: string,
  currentSlug: string,
): Promise<{
  parent?: EventMeta;
  children: EventMeta[];
  related: EventMeta[];
}> {
  assertSupportedLocale(locale);
  assertSupportedEventSlug(currentSlug);

  const current = await getEventMeta(locale, currentSlug);
  const uniqueSlugs = (
    slugs: (EventSlug | undefined)[] | undefined,
  ): EventSlug[] => {
    if (!slugs?.length) return [];
    return Array.from(
      new Set(
        slugs.filter(
          (slug): slug is EventSlug => Boolean(slug) && slug !== currentSlug,
        ),
      ),
    );
  };

  const childSlugs = uniqueSlugs(current.childEventIds);
  const relatedSlugs = uniqueSlugs(current.relatedEventIds);

  const [parent, children, related] = await Promise.all([
    current.parentEvent
      ? getEventMeta(locale, current.parentEvent)
      : Promise.resolve(undefined),
    Promise.all(childSlugs.map((slug) => getEventMeta(locale, slug))),
    Promise.all(relatedSlugs.map((slug) => getEventMeta(locale, slug))),
  ]);

  return { parent, children, related };
}

export async function getEventRelationships(
  locale: string,
  currentSlug: string,
): Promise<Record<EventRelationType, EventMeta[]>> {
  assertSupportedLocale(locale);
  assertSupportedEventSlug(currentSlug);

  const current = await getEventMeta(locale, currentSlug);
  const grouped = {
    cause: [] as EventSlug[],
    effect: [] as EventSlug[],
    background: [] as EventSlug[],
    parallel: [] as EventSlug[],
    legacy: [] as EventSlug[],
    contrast: [] as EventSlug[],
  };

  if (Array.isArray(current.relatedEvents)) {
    for (const relation of current.relatedEvents) {
      if (relation.eventId === currentSlug) continue;
      grouped[relation.relationType].push(relation.eventId);
    }
  } else if (Array.isArray(current.relatedEventIds)) {
    grouped.parallel.push(
      ...current.relatedEventIds.filter(
        (slug): slug is EventSlug => slug !== currentSlug,
      ),
    );
  }

  const resolve = async (slugs: EventSlug[]) =>
    Promise.all(
      Array.from(new Set(slugs)).map((slug) => getEventMeta(locale, slug)),
    );

  const [cause, effect, background, parallel, legacy, contrast] =
    await Promise.all([
      resolve(grouped.cause),
      resolve(grouped.effect),
      resolve(grouped.background),
      resolve(grouped.parallel),
      resolve(grouped.legacy),
      resolve(grouped.contrast),
    ]);

  return { cause, effect, background, parallel, legacy, contrast };
}

export async function getPreviousAndNextEvents(
  locale: string,
  currentSlug: string,
): Promise<{ previous?: EventMeta; next?: EventMeta }> {
  assertSupportedLocale(locale);
  assertSupportedEventSlug(currentSlug);

  const orderedSlugs = await getChronologicalEventSlugs(locale as Locale);
  const currentIndex = orderedSlugs.indexOf(currentSlug as EventSlug);

  const [previous, next] = await Promise.all([
    currentIndex > 0
      ? getEventMeta(locale, orderedSlugs[currentIndex - 1])
      : Promise.resolve(undefined),
    currentIndex < orderedSlugs.length - 1
      ? getEventMeta(locale, orderedSlugs[currentIndex + 1])
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

export async function getEventsByFigureId(
  locale: string,
  figureId: string,
): Promise<EventMeta[]> {
  assertSupportedLocale(locale);
  assertSupportedFigureId(figureId);

  const matches = await Promise.all(
    SUPPORTED_EVENT_SLUGS.map(async (slug) => {
      const figureIds = await readJsonFile<FigureId[]>(
        path.join(CONTENT_DIR, "events", slug, "figure-ids.json"),
      );
      if (!figureIds.includes(figureId)) return null;
      return getEventMeta(locale, slug);
    }),
  );

  return matches.filter((event): event is EventMeta => event !== null);
}

export async function getEventsByFigureIdChronological(
  locale: string,
  figureId: string,
): Promise<EventMeta[]> {
  assertSupportedLocale(locale);
  assertSupportedFigureId(figureId);

  const [events, chronologicalSlugs] = await Promise.all([
    getEventsByFigureId(locale, figureId),
    getChronologicalEventSlugs(locale),
  ]);

  const rank = new Map(chronologicalSlugs.map((slug, index) => [slug, index]));
  return [...events].sort(
    (a, b) =>
      (rank.get(a.slug as EventSlug) ?? Number.MAX_SAFE_INTEGER) -
      (rank.get(b.slug as EventSlug) ?? Number.MAX_SAFE_INTEGER),
  );
}

export async function getEventsByBookId(
  locale: string,
  bookId: string,
): Promise<EventMeta[]> {
  assertSupportedLocale(locale);
  assertSupportedBookId(bookId);

  const matches = await Promise.all(
    SUPPORTED_EVENT_SLUGS.map(async (slug) => {
      const resourceIds = await readJsonFile<string[]>(
        path.join(CONTENT_DIR, "events", slug, "resource-ids.json"),
      );
      if (!resourceIds.includes(bookId)) return null;
      return getEventMeta(locale, slug);
    }),
  );

  return matches.filter((event): event is EventMeta => event !== null);
}

export async function getEventsByBookIdChronological(
  locale: string,
  bookId: string,
): Promise<EventMeta[]> {
  assertSupportedLocale(locale);
  assertSupportedBookId(bookId);

  const [events, chronologicalSlugs] = await Promise.all([
    getEventsByBookId(locale, bookId),
    getChronologicalEventSlugs(locale as Locale),
  ]);

  const rank = new Map(chronologicalSlugs.map((slug, index) => [slug, index]));
  return [...events].sort(
    (a, b) =>
      (rank.get(a.slug as EventSlug) ?? Number.MAX_SAFE_INTEGER) -
      (rank.get(b.slug as EventSlug) ?? Number.MAX_SAFE_INTEGER),
  );
}

export async function getEventsByResourceId(
  locale: string,
  resourceId: string,
): Promise<EventMeta[]> {
  assertSupportedLocale(locale);

  const matches = await Promise.all(
    SUPPORTED_EVENT_SLUGS.map(async (slug) => {
      try {
        const resourceIds = await readJsonFile<string[]>(
          path.join(CONTENT_DIR, "events", slug, "resource-ids.json"),
        );
        if (!resourceIds.includes(resourceId)) return null;
      } catch {
        return null;
      }
      return getEventMeta(locale, slug);
    }),
  );

  return matches.filter((event): event is EventMeta => event !== null);
}

export async function getEventsByResourceIdChronological(
  locale: string,
  resourceId: string,
): Promise<EventMeta[]> {
  assertSupportedLocale(locale);

  const [events, chronologicalSlugs] = await Promise.all([
    getEventsByResourceId(locale, resourceId),
    getChronologicalEventSlugs(locale as Locale),
  ]);

  const rank = new Map(chronologicalSlugs.map((slug, index) => [slug, index]));
  return [...events].sort(
    (a, b) =>
      (rank.get(a.slug as EventSlug) ?? Number.MAX_SAFE_INTEGER) -
      (rank.get(b.slug as EventSlug) ?? Number.MAX_SAFE_INTEGER),
  );
}

export async function getFiguresByEventSlug(
  locale: string,
  slug: string,
): Promise<Figure[]> {
  assertSupportedLocale(locale);
  assertSupportedEventSlug(slug);

  const figureIds = await readJsonFile<FigureId[]>(
    path.join(CONTENT_DIR, "events", slug, "figure-ids.json"),
  );
  return Promise.all(figureIds.map((figureId) => getFigure(locale, figureId)));
}

export const getPeriod = cache(
  async (locale: string, periodId: string): Promise<Period> => {
    assertSupportedLocale(locale);
    assertSupportedPeriodId(periodId);

    const metaPath = path.join(
      CONTENT_DIR,
      "periods",
      periodId,
      `meta.${locale}.json`,
    );
    return readJsonFile<PeriodMeta>(metaPath);
  },
);

export async function getAllPeriods(locale: string): Promise<Period[]> {
  assertSupportedLocale(locale);
  return Promise.all(SUPPORTED_PERIOD_IDS.map((id) => getPeriod(locale, id)));
}

export const getEventsByPeriodId = cache(
  async (locale: string, periodId: string): Promise<EventMeta[]> => {
    assertSupportedLocale(locale);
    assertSupportedPeriodId(periodId);

    const allEvents = await Promise.all(
      SUPPORTED_EVENT_SLUGS.map(async (slug) => {
        const meta = await getEventMeta(locale, slug);
        return meta.periodId === periodId ? meta : null;
      }),
    );

    return allEvents.filter((event): event is EventMeta => event !== null);
  },
);

export const getMovement = cache(
  async (locale: string, movementId: string): Promise<Movement> => {
    assertSupportedLocale(locale);
    assertSupportedMovementId(movementId);

    const metaPath = path.join(
      CONTENT_DIR,
      "movements",
      movementId,
      `meta.${locale}.json`,
    );
    return readJsonFile<MovementMeta>(metaPath);
  },
);

export async function getAllMovements(locale: string): Promise<Movement[]> {
  assertSupportedLocale(locale);
  return Promise.all(
    SUPPORTED_MOVEMENT_IDS.map((id) => getMovement(locale, id)),
  );
}

export const getEventsByMovementId = cache(
  async (locale: string, movementId: string): Promise<EventMeta[]> => {
    assertSupportedLocale(locale);
    assertSupportedMovementId(movementId);

    const allEvents = await Promise.all(
      SUPPORTED_EVENT_SLUGS.map(async (slug) => {
        const meta = await getEventMeta(locale, slug);
        return meta.movementId === movementId ? meta : null;
      }),
    );

    return allEvents.filter((event): event is EventMeta => event !== null);
  },
);

export const getPlace = cache(
  async (locale: string, placeId: string): Promise<Place> => {
    assertSupportedLocale(locale);
    assertSupportedPlaceId(placeId);

    const metaPath = path.join(
      CONTENT_DIR,
      "places",
      placeId,
      `meta.${locale}.json`,
    );
    return readJsonFile<PlaceMeta>(metaPath);
  },
);

export async function getAllPlaces(locale: string): Promise<Place[]> {
  assertSupportedLocale(locale);
  return Promise.all(SUPPORTED_PLACE_IDS.map((id) => getPlace(locale, id)));
}

export const getEventsByPlaceId = cache(
  async (locale: string, placeId: string): Promise<EventMeta[]> => {
    assertSupportedLocale(locale);
    assertSupportedPlaceId(placeId);

    const place = await getPlace(locale, placeId);
    const relatedEventIds = new Set(place.relatedEventIds ?? []);

    const allEvents = await Promise.all(
      SUPPORTED_EVENT_SLUGS.map(async (slug) => {
        const meta = await getEventMeta(locale, slug);
        return meta.placeId === placeId || relatedEventIds.has(meta.slug) ? meta : null;
      }),
    );

    return allEvents.filter((event): event is EventMeta => event !== null);
  },
);

export const getEventsByPlaceIdChronological = cache(
  async (locale: string, placeId: string): Promise<EventMeta[]> => {
    assertSupportedLocale(locale);
    assertSupportedPlaceId(placeId);

    const [events, chronologicalSlugs] = await Promise.all([
      getEventsByPlaceId(locale, placeId),
      getChronologicalEventSlugs(locale as Locale),
    ]);
    const rank = new Map(chronologicalSlugs.map((slug, index) => [slug, index]));

    return [...events].sort(
      (a, b) =>
        (rank.get(a.slug as EventSlug) ?? Number.MAX_SAFE_INTEGER) -
        (rank.get(b.slug as EventSlug) ?? Number.MAX_SAFE_INTEGER),
    );
  },
);

// Future CMS migration: swap file readers with provider adapters while preserving these return types.
