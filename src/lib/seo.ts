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

export function buildDynamicOgImagePath(input: {
  locale: Locale;
  type: "event" | "figure" | "book";
  title: string;
  subtitle?: string;
}): string {
  const params = new URLSearchParams({
    locale: input.locale,
    type: input.type,
    title: input.title,
  });
  if (input.subtitle) params.set("subtitle", input.subtitle);
  return `/api/og?${params.toString()}`;
}

export function buildPageMetadata(input: {
  locale: Locale;
  title: string;
  description: string;
  canonicalPath: string;
  languagePathWithoutLocale?: string;
  type?: "website" | "article" | "profile" | "book";
  noIndex?: boolean;
  ogImagePath?: string;
}): Metadata {
  const ogType = input.type ?? "website";
  const languagePath = input.languagePathWithoutLocale;
  const locale = input.locale;
  const localePrefix = `/${locale}`;
  const expectedCanonical = `${localePrefix}${languagePath ?? ""}`;

  if (!input.canonicalPath.startsWith(localePrefix)) {
    throw new Error(`canonicalPath must start with locale prefix "${localePrefix}", got "${input.canonicalPath}"`);
  }
  if (languagePath && (languagePath.startsWith("/en") || languagePath.startsWith("/bn"))) {
    throw new Error(`languagePathWithoutLocale must not include locale prefix, got "${languagePath}"`);
  }
  if (languagePath !== undefined && input.canonicalPath !== expectedCanonical) {
    throw new Error(
      `canonicalPath "${input.canonicalPath}" must match locale + languagePathWithoutLocale "${expectedCanonical}"`,
    );
  }

  const localeAlternates = languagePath ? languageAlternates(languagePath, true) : undefined;
  const ogLocaleAlternates = locale === "bn" ? ["en_US"] : ["bn_BD"];

  const canonicalUrl = absoluteUrl(input.canonicalPath);
  const ogImage = input.ogImagePath ? absoluteUrl(input.ogImagePath) : DEFAULT_OG_IMAGE;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: canonicalUrl,
      languages: localeAlternates,
    },
    robots: input.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: ogType,
      title: input.title,
      description: input.description,
      siteName: SITE_NAME,
      url: canonicalUrl,
      locale: localeCode(input.locale),
      alternateLocale: ogLocaleAlternates,
      images: [
        {
          url: ogImage,
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
      images: [ogImage],
    },
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
