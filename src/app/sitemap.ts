import type { MetadataRoute } from "next";
import { SUPPORTED_BOOK_IDS, SUPPORTED_EVENT_SLUGS, SUPPORTED_HERO_IDS, SUPPORTED_LOCALES } from "@/types/content";

const BASE_URL = "https://bengalunfolded.com";

function withLocale(locale: string, path = ""): string {
  return `${BASE_URL}/${locale}${path}`;
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
      },
      {
        url: withLocale(locale, "/heroes"),
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      },
    );

    for (const slug of SUPPORTED_EVENT_SLUGS) {
      entries.push(
        {
          url: withLocale(locale, `/events/${slug}`),
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.9,
        },
        {
          url: withLocale(locale, `/events/${slug}/heroes`),
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.75,
        },
        {
          url: withLocale(locale, `/events/${slug}/resources`),
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.75,
        },
      );
    }

    for (const heroId of SUPPORTED_HERO_IDS) {
      entries.push({
        url: withLocale(locale, `/heroes/${heroId}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }

    for (const bookId of SUPPORTED_BOOK_IDS) {
      entries.push({
        url: withLocale(locale, `/books/${bookId}`),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.65,
      });
    }
  }

  return entries;
}
