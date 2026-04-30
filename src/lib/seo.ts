import type { Metadata } from "next";
import type { Locale } from "@/types/content";

export const SITE_NAME = "Bengal Unfolded";
export const CANONICAL_ORIGIN = "https://bengalunfolded.com";
export const DEFAULT_OG_IMAGE = `${CANONICAL_ORIGIN}/og-default.svg`;

export function localeCode(locale: Locale): "en_US" | "bn_BD" {
  return locale === "bn" ? "bn_BD" : "en_US";
}

export function localeLanguageTag(locale: Locale): "en-US" | "bn-BD" {
  return locale === "bn" ? "bn-BD" : "en-US";
}

export function localePath(locale: Locale, rest = ""): string {
  return `/${locale}${rest}`;
}

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${CANONICAL_ORIGIN}${path}`;
}

export function languageAlternates(pathWithoutLocale: string, includeXDefault = true): Record<string, string> {
  const alternates: Record<string, string> = {
    "en-US": `/en${pathWithoutLocale}`,
    "bn-BD": `/bn${pathWithoutLocale}`,
  };
  if (includeXDefault) alternates["x-default"] = `/bn${pathWithoutLocale}`;
  return alternates;
}

export function buildPageMetadata(input: {
  locale: Locale;
  title: string;
  description: string;
  canonicalPath: string;
  languagePathWithoutLocale?: string;
  type?: "website" | "article" | "profile" | "book";
  noIndex?: boolean;
}): Metadata {
  const ogType = input.type ?? "website";
  const languagePath = input.languagePathWithoutLocale;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: input.canonicalPath,
      languages: languagePath ? languageAlternates(languagePath) : undefined,
    },
    robots: input.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: ogType,
      title: input.title,
      description: input.description,
      siteName: SITE_NAME,
      url: input.canonicalPath,
      locale: localeCode(input.locale),
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} historical and cultural learning portal`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
