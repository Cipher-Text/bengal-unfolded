import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getEventsByMovementId, getMovement } from "@/lib/content";
import { buildPageMetadata, localeLanguageTag } from "@/lib/seo";
import {
  SUPPORTED_MOVEMENT_IDS,
  SUPPORTED_LOCALES,
  type MovementId,
  type Locale,
} from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    SUPPORTED_MOVEMENT_IDS.map((id) => ({ locale, id })),
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
    !SUPPORTED_MOVEMENT_IDS.includes(id as MovementId)
  )
    return {};
  const movement = await getMovement(locale, id);
  return buildPageMetadata({
    locale: locale as Locale,
    title: `${movement.title} | Bengal Unfolded`,
    description: movement.subtitle,
    canonicalPath: `/${locale}/movements/${id}`,
    languagePathWithoutLocale: `/movements/${id}`,
    type: "article",
  });
}

const MOVEMENT_LABELS = {
  en: {
    events: "Events in This Movement",
    eventCount: (count: number) => `${count} event${count !== 1 ? "s" : ""}`,
    year: "Year",
    jumpTo: "Jump to",
  },
  bn: {
    events: "এই আন্দোলনের ঘটনা",
    eventCount: (count: number) => `${count}টি ঘটনা`,
    year: "বছর",
    jumpTo: "যেতে চান",
  },
} as const;

export default async function MovementDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (
    !SUPPORTED_LOCALES.includes(locale as Locale) ||
    !SUPPORTED_MOVEMENT_IDS.includes(id as MovementId)
  )
    notFound();

  const [movement, events] = await Promise.all([
    getMovement(locale, id),
    getEventsByMovementId(locale, id),
  ]);
  const labels = MOVEMENT_LABELS[locale as Locale];

  const movementJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: movement.title,
    description: movement.description,
    url: `https://bengalunfolded.com/${locale}/movements/${id}`,
    inLanguage: localeLanguageTag(locale as Locale),
  };

  return (
    <div className="space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(movementJsonLd) }}
      />

      <HeroSection
        title={movement.title}
        tagline={movement.subtitle}
        intro={movement.description}
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
          <section className="scroll-mt-24">
            <SectionTitle
              title={labels.events}
              subtitle={labels.eventCount(events.length)}
            />
            <div className="mt-6 space-y-4">
              {events.map((event, index) => (
                <div
                  key={event.slug}
                  id={`event-${event.slug}`}
                  className="scroll-mt-24"
                >
                  <Link
                    href={`/${locale}/events/${event.slug}`}
                    className="block rounded-2xl border border-amber-500/25 p-6 transition-colors hover:bg-amber-500/5"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="flex-1">
                        <p className="theme-muted text-xs tracking-[0.2em] uppercase">
                          {event.year}
                        </p>
                        <p className="mt-2 text-xl font-semibold">
                          {event.title}
                        </p>
                        <p className="theme-muted mt-2 text-sm">
                          {event.subtitle}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed">
                          {event.summary}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex rounded-full border border-accent/40 px-3 py-1 text-xs font-medium text-accent">
                          {event.importance}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </AnimatedContainer>
      ) : (
        <AnimatedContainer delay={0.05}>
          <section className="scroll-mt-24">
            <div className="theme-surface-soft rounded-2xl border border-amber-500/15 p-8 text-center">
              <p className="theme-muted text-sm">
                {locale === "bn"
                  ? "এই আন্দোলনের জন্য এখনও কোনো ঘটনা যোগ করা হয়নি।"
                  : "No events have been added for this movement yet."}
              </p>
            </div>
          </section>
        </AnimatedContainer>
      )}
    </div>
  );
}
