import { promises as fs } from "node:fs";
import path from "node:path";
import { SUPPORTED_EVENT_SLUGS, SUPPORTED_LOCALES, type EventContent, type EventMeta, type EventSlug, type Hero, type HomeContent, type Locale, type Quote, type Resource, type TimelineItem } from "@/types/content";
const CONTENT_DIR = path.join(process.cwd(), "content");
function isLocale(v: string): v is Locale { return SUPPORTED_LOCALES.includes(v as Locale); }
function isEventSlug(v: string): v is EventSlug { return SUPPORTED_EVENT_SLUGS.includes(v as EventSlug); }
async function readJsonFile<T>(filePath: string): Promise<T> { return JSON.parse(await fs.readFile(filePath, "utf-8")) as T; }
export function assertSupportedLocale(locale: string): asserts locale is Locale { if (!isLocale(locale)) throw new Error(`Unsupported locale: ${locale}`); }
export function assertSupportedEventSlug(slug: string): asserts slug is EventSlug { if (!isEventSlug(slug)) throw new Error(`Unsupported event slug: ${slug}`); }
export async function getHomeContent(locale: string): Promise<HomeContent> { assertSupportedLocale(locale); return readJsonFile(path.join(CONTENT_DIR, "site", `home.${locale}.json`)); }
export async function getEventMeta(locale: string, slug: string): Promise<EventMeta> { assertSupportedLocale(locale); assertSupportedEventSlug(slug); return readJsonFile(path.join(CONTENT_DIR, "events", slug, `meta.${locale}.json`)); }
export async function getEventContent(locale: string, slug: string): Promise<EventContent> { assertSupportedLocale(locale); assertSupportedEventSlug(slug); const base = path.join(CONTENT_DIR, "events", slug); const [meta, timeline, heroes, resources, quotes] = await Promise.all([readJsonFile<EventMeta>(path.join(base, `meta.${locale}.json`)), readJsonFile<TimelineItem[]>(path.join(base, `timeline.${locale}.json`)), readJsonFile<Hero[]>(path.join(base, `heroes.${locale}.json`)), readJsonFile<Resource[]>(path.join(base, `resources.${locale}.json`)), readJsonFile<Quote[]>(path.join(base, `quotes.${locale}.json`))]); return { meta, timeline, heroes, resources, quotes }; }
export async function getAllEvents(locale: string): Promise<EventMeta[]> { assertSupportedLocale(locale); return Promise.all(SUPPORTED_EVENT_SLUGS.map((slug) => getEventMeta(locale, slug))); }
// Future CMS migration: swap file readers with provider adapters while preserving these return types.
