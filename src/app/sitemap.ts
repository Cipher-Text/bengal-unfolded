import type { MetadataRoute } from "next";
import { getAllCreators, getAllGlossaryTermIds, getAllResourceIds, getAllTopicSlugs } from "@/lib/content";
import {
  SUPPORTED_EVENT_SLUGS,
  SUPPORTED_FIGURE_IDS,
  SUPPORTED_LOCALES,
  SUPPORTED_MOVEMENT_IDS,
  SUPPORTED_PERIOD_IDS,
  SUPPORTED_PLACE_IDS,
} from "@/types/content";

const BASE_URL = "https://bengalunfolded.com";

function withLocale(locale: string, path = ""): string {
  return `${BASE_URL}/${locale}${path}`;
}

function localeAlternates(path = ""): Record<string, string> {
  return {
    "en-US": withLocale("en", path),
    "bn-BD": withLocale("bn", path),
    "x-default": withLocale("bn", path),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [resourceIds, glossaryTermIds, topicSlugs, enCreators, bnCreators] = await Promise.all([
    getAllResourceIds(),
    getAllGlossaryTermIds(),
    getAllTopicSlugs(),
    getAllCreators("en"),
    getAllCreators("bn"),
  ]);
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: localeAlternates("") },
    },
  ];

  for (const locale of SUPPORTED_LOCALES) {
    entries.push(
      {
        url: withLocale(locale),
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.95,
        alternates: { languages: localeAlternates("") },
      },
      {
        url: withLocale(locale, "/figures"),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: localeAlternates("/figures") },
      },
      {
        url: withLocale(locale, "/creators"),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.72,
        alternates: { languages: localeAlternates("/creators") },
      },
      {
        url: withLocale(locale, "/timeline"),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.85,
        alternates: { languages: localeAlternates("/timeline") },
      },
      {
        url: withLocale(locale, "/compare"),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.75,
        alternates: { languages: localeAlternates("/compare") },
      },
      {
        url: withLocale(locale, "/topics"),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: localeAlternates("/topics") },
      },
      {
        url: withLocale(locale, "/paths"),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: localeAlternates("/paths") },
      },
      {
        url: withLocale(locale, "/glossary"),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.75,
        alternates: { languages: localeAlternates("/glossary") },
      },
      {
        url: withLocale(locale, "/methodology"),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.65,
        alternates: { languages: localeAlternates("/methodology") },
      },
      {
        url: withLocale(locale, "/join"),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: localeAlternates("/join") },
      },
    );

    for (const slug of SUPPORTED_EVENT_SLUGS) {
      entries.push(
        {
          url: withLocale(locale, `/events/${slug}`),
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.9,
          alternates: { languages: localeAlternates(`/events/${slug}`) },
        },
        {
          url: withLocale(locale, `/events/${slug}/figures`),
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.75,
          alternates: { languages: localeAlternates(`/events/${slug}/figures`) },
        },
        {
          url: withLocale(locale, `/events/${slug}/resources`),
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.75,
          alternates: { languages: localeAlternates(`/events/${slug}/resources`) },
        },
      );
    }

    for (const figureId of SUPPORTED_FIGURE_IDS) {
      entries.push({
        url: withLocale(locale, `/figures/${figureId}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: localeAlternates(`/figures/${figureId}`) },
      });
    }

    for (const resourceId of resourceIds) {
      entries.push({
        url: withLocale(locale, `/resources/${resourceId}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: localeAlternates(`/resources/${resourceId}`) },
      });
    }

    for (const termId of glossaryTermIds) {
      entries.push({
        url: withLocale(locale, `/glossary/${termId}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.55,
        alternates: { languages: localeAlternates(`/glossary/${termId}`) },
      });
    }

    for (const topicSlug of topicSlugs) {
      entries.push({
        url: withLocale(locale, `/topics/${topicSlug}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: localeAlternates(`/topics/${topicSlug}`) },
      });
      entries.push({
        url: withLocale(locale, `/paths/${topicSlug}`),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.75,
        alternates: { languages: localeAlternates(`/paths/${topicSlug}`) },
      });
    }

    for (const placeId of SUPPORTED_PLACE_IDS) {
      entries.push({
        url: withLocale(locale, `/places/${placeId}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: localeAlternates(`/places/${placeId}`) },
      });
    }

    for (const periodId of SUPPORTED_PERIOD_IDS) {
      entries.push({
        url: withLocale(locale, `/periods/${periodId}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.65,
        alternates: { languages: localeAlternates(`/periods/${periodId}`) },
      });
    }

    for (const movementId of SUPPORTED_MOVEMENT_IDS) {
      entries.push({
        url: withLocale(locale, `/movements/${movementId}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.65,
        alternates: { languages: localeAlternates(`/movements/${movementId}`) },
      });
    }

    const creators = locale === "bn" ? bnCreators : enCreators;
    for (const creator of creators) {
      entries.push({
        url: withLocale(locale, `/creators/${creator.id}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.55,
      });
    }
  }

  return entries;
}
