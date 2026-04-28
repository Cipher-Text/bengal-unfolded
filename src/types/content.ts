export const SUPPORTED_LOCALES = ["en", "bn"] as const;
export const SUPPORTED_EVENT_SLUGS = ["1947", "1952", "1971", "1990", "2024"] as const;
export const SUPPORTED_HERO_IDS = ["key-figure-1", "key-figure-2"] as const;
export const SUPPORTED_BOOK_IDS = ["research-volume", "archive-collection"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type EventSlug = (typeof SUPPORTED_EVENT_SLUGS)[number];
export type HeroId = (typeof SUPPORTED_HERO_IDS)[number];
export type BookId = (typeof SUPPORTED_BOOK_IDS)[number];

export type EventMeta = {
  slug: EventSlug;
  year: string;
  title: string;
  subtitle: string;
  summary: string;
  themeColor: string;
  ctaLabel: string;
  heroTagline: string;
  whyItMatters: string;
};

export type TimelineItem = {
  year: string;
  title: string;
  detail: string;
  href?: string;
  ctaLabel?: string;
};

export type Hero = {
  id: HeroId;
  name: string;
  role: string;
  bio: string;
  impact: string;
};

export type Book = {
  id: BookId;
  title: string;
  author: string;
  type: "book" | "article" | "archive";
  note: string;
};

export type Quote = {
  text: string;
  source: string;
};

export type EventContent = {
  meta: EventMeta;
  timeline: TimelineItem[];
  heroes: Hero[];
  books: Book[];
  quotes: Quote[];
};

export type HomeContent = {
  title: string;
  tagline: string;
  intro: string;
  timelineHeading: string;
  timelineSubheading: string;
};
