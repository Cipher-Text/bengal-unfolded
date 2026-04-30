import type { MetadataRoute } from "next";
import { SUPPORTED_BOOK_IDS, SUPPORTED_EVENT_SLUGS, SUPPORTED_HERO_IDS, SUPPORTED_LOCALES } from "@/types/content";

const BASE_URL = "https://bengalunfolded.com";

function withLocale(locale: string, path = ""): string {
  return `${BASE_URL}/${locale}${path}`;
}

function localeAlternates(path = ""): Record<string, string> {
  return {
    "en-US": withLocale("en", path),
    "bn-BD": withLocale("bn", path),
    "x-default": withLocale("en", path),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
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
        url: withLocale(locale, "/heroes"),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: localeAlternates("/heroes") },
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
          url: withLocale(locale, `/events/${slug}/heroes`),
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.75,
          alternates: { languages: localeAlternates(`/events/${slug}/heroes`) },
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

    for (const heroId of SUPPORTED_HERO_IDS) {
      entries.push({
        url: withLocale(locale, `/heroes/${heroId}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: localeAlternates(`/heroes/${heroId}`) },
      });
    }

    for (const bookId of SUPPORTED_BOOK_IDS) {
      entries.push({
        url: withLocale(locale, `/books/${bookId}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.65,
        alternates: { languages: localeAlternates(`/books/${bookId}`) },
      });
    }
  }

  return entries;
}
