import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getEventsByPlaceIdChronological, getPlace } from "@/lib/content";
import { buildPageMetadata, localeLanguageTag } from "@/lib/seo";
import {
  SUPPORTED_LOCALES,
  SUPPORTED_PLACE_IDS,
  type Locale,
  type PlaceId,
} from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    SUPPORTED_PLACE_IDS.map((id) => ({ locale, id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  if (
    !SUPPORTED_LOCALES.includes(locale as Locale) ||
    !SUPPORTED_PLACE_IDS.includes(id as PlaceId)
  )
    return {};
  const place = await getPlace(locale, id);
  return buildPageMetadata({
    locale: locale as Locale,
    title: `${place.title} | Bengal Unfolded`,
    description: place.subtitle,
    canonicalPath: `/${locale}/places/${id}`,
    languagePathWithoutLocale: `/places/${id}`,
    type: "article",
  });
}

const PLACE_LABELS = {
  en: {
    events: "Events in This Place",
    eventCount: (count: number) => `${count} event${count !== 1 ? "s" : ""}`,
    jumpTo: "Jump to",
  },
  bn: {
    events: "এই স্থানের ঘটনা",
    eventCount: (count: number) => `${count}টি ঘটনা`,
    jumpTo: "যেতে চান",
  },
} as const;

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (
    !SUPPORTED_LOCALES.includes(locale as Locale) ||
    !SUPPORTED_PLACE_IDS.includes(id as PlaceId)
  )
    notFound();

  const [place, events] = await Promise.all([
    getPlace(locale, id),
    getEventsByPlaceIdChronological(locale, id),
  ]);
  const labels = PLACE_LABELS[locale as Locale];

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: place.title,
    description: place.description,
    url: `https://bengalunfolded.com/${locale}/places/${id}`,
    inLanguage: localeLanguageTag(locale as Locale),
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }}
      />
      <HeroSection
        title={place.title}
        tagline={place.subtitle}
        intro={place.description}
      />

      {events.length > 0 && (
        <AnimatedContainer>
          <nav
            aria-label={labels.jumpTo}
            className="theme-surface-soft rounded-xl border border-amber-500/25 p-3"
          >
            <p className="theme-muted mb-2 text-xs">{labels.jumpTo}</p>
            <div className="flex flex-wrap gap-2">
              {events.map((event) => (
                <a
                  key={event.slug}
                  href={`#event-${event.slug}`}
                  className="inline-flex min-h-[36px] items-center rounded-full border border-amber-500/35 px-3 text-xs text-accent hover:bg-amber-500/10"
                >
                  {event.year}
                </a>
              ))}
            </div>
          </nav>
        </AnimatedContainer>
      )}

      {events.length > 0 ? (
        <AnimatedContainer delay={0.05}>
          <SectionTitle
            title={labels.events}
            subtitle={labels.eventCount(events.length)}
          />
          <div className="mt-6 space-y-4">
            {events.map((event) => (
              <div
                key={event.slug}
                id={`event-${event.slug}`}
                className="scroll-mt-24"
              >
                <Link
                  href={`/${locale}/events/${event.slug}`}
                  className="block rounded-2xl border border-amber-500/25 p-6 transition-colors hover:bg-amber-500/5"
                >
                  <p className="theme-muted text-xs tracking-[0.2em] uppercase">
                    {event.year}
                  </p>
                  <p className="mt-2 text-xl font-semibold">{event.title}</p>
                  <p className="theme-muted mt-2 text-sm">{event.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed">{event.summary}</p>
                </Link>
              </div>
            ))}
          </div>
        </AnimatedContainer>
      ) : (
        <AnimatedContainer delay={0.05}>
          <div className="theme-surface-soft rounded-2xl border border-amber-500/15 p-8 text-center">
            <p className="theme-muted text-sm">
              {locale === "bn"
                ? "এই স্থানের জন্য এখনও কোনো ঘটনা যোগ করা হয়নি।"
                : "No events have been added for this place yet."}
            </p>
          </div>
        </AnimatedContainer>
      )}
    </div>
  );
}
