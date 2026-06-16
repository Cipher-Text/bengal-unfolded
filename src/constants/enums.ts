/**
 * Shared enum value arrays — single source of truth for TypeScript types.
 * Types in src/types/content.ts are derived from these via (typeof X)[number].
 * The plain-JS mirror in scripts/content-enums.mjs must be kept in sync
 * whenever values are added or removed here.
 */

export const FIGURE_GROUPS = [
  "leader",
  "coordinator",
  "martyr",
  "organization",
  "collective",
  "intellectual",
  "revolutionary",
] as const;

export const SOURCE_QUALITIES = [
  "primary",
  "secondary",
  "archive",
  "editorial",
] as const;

export const RESOURCE_SOURCE_QUALITIES = [
  "primary",
  "secondary",
  "archive",
  "academic",
  "editorial",
  "reference",
  "unknown",
] as const;

export const EVIDENCE_LEVELS = ["high", "medium", "low"] as const;

export const TIMELINE_THEMES = [
  "language",
  "democracy",
  "war",
  "culture",
  "economy",
] as const;

export const EVENT_IMPORTANCE_VALUES = [
  "landmark",
  "major",
  "high",
  "medium",
  "reference",
] as const;

export const EVENT_RELATION_TYPES = [
  "cause",
  "effect",
  "background",
  "parallel",
  "legacy",
  "contrast",
] as const;

export const EVENT_CLAIM_SECTIONS = [
  "summary",
  "whyItMatters",
  "longTermLegacy",
  "culturalImpact",
  "identityMemoryNotes",
] as const;

export const EVENT_MAP_POINT_ROLES = [
  "battlefield",
  "capital",
  "route",
  "birthplace",
  "deathplace",
  "treaty-place",
  "movement-center",
  "administrative-center",
  "other",
] as const;

export const RESOURCE_CATEGORIES = [
  "primary-sources",
  "academic-books",
  "reference-sources",
  "research-articles-and-papers",
  "memoirs-and-eyewitness-accounts",
  "maps-and-visual-sources",
  "documentary-and-video",
  "cultural-and-literary-resources",
  "news-and-contemporary-reports",
  "further-reading",
] as const;

export const PLACE_TYPES = [
  "region",
  "city",
  "capital",
  "district",
  "division",
  "river",
  "port",
  "battlefield",
  "religious-site",
  "educational-site",
  "archaeological-site",
  "frontier",
  "route",
  "other",
] as const;

export const COORDINATE_CONFIDENCES = [
  "exact",
  "approximate",
  "representative",
  "unknown",
] as const;

export const LEARNING_PATH_ITEM_TYPES = [
  "event",
  "figure",
  "resource",
  "place",
  "period",
  "topic",
] as const;

export const NAME_HISTORY_LANGUAGES = [
  "bn",
  "en",
  "fa",
  "ar",
  "sa",
  "pt",
  "other",
] as const;
