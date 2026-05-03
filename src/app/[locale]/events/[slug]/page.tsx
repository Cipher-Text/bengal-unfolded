import type { Metadata } from "next";
import { buildPageMetadata, localeLanguageTag, SITE_NAME } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { EventNavigation } from "@/components/EventNavigation";
import { EventTimeline } from "@/components/EventTimeline";
import { FigureProfileCard } from "@/components/FigureProfileCard";
import { HeroSection } from "@/components/HeroSection";
import { QuoteBlock } from "@/components/QuoteBlock";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionTitle } from "@/components/SectionTitle";
import { getEventContent, getPreviousAndNextEvents } from "@/lib/content";
import { renderGlossaryLinkedText } from "@/lib/glossary-linking";
import { SUPPORTED_EVENT_SLUGS, SUPPORTED_LOCALES, type EventSlug, type Locale } from "@/types/content";
import type { EventResource } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => SUPPORTED_EVENT_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_EVENT_SLUGS.includes(slug as EventSlug)) return {};
  const event = await getEventContent(locale, slug);
  return buildPageMetadata({
    locale: locale as Locale,
    title: `${event.meta.year} - ${event.meta.title} | Bengal Unfolded`,
    description: event.meta.summary,
    canonicalPath: `/${locale}/events/${slug}`,
    languagePathWithoutLocale: `/events/${slug}`,
    type: "article",
  });
}

const EVENT_LABELS = {
  en: {
    overview: "Event Overview",
    overviewSources: "Overview Sources",
    timeline: "Interactive Timeline",
    figures: "Figures / Historical Actors",
    seeFullList: "See full list",
    resourcesTitle: "Resources by Category",
    resourcesSubtitle: "Browse resources by subcategory",
    seeAllCategories: "See all categories",
    quotes: "Quotes",
    whyItMatters: "Why This Event Matters Today",
    whyItMattersSources: "Why It Matters Sources",
    evidence: "Evidence",
    high: "High",
    medium: "Medium",
    low: "Low",
  },
  bn: {
    overview: "ইভেন্ট ওভারভিউ",
    overviewSources: "ওভারভিউ-এর সূত্র",
    timeline: "ইন্টারঅ্যাক্টিভ টাইমলাইন",
    figures: "ব্যক্তিত্ব ও ঐতিহাসিক অভিনেতা",
    seeFullList: "পূর্ণ তালিকা দেখুন",
    resourcesTitle: "ক্যাটাগরি অনুযায়ী রিসোর্স",
    resourcesSubtitle: "সাব-ক্যাটাগরি অনুযায়ী রিসোর্স ব্রাউজ করুন",
    seeAllCategories: "সব ক্যাটাগরি দেখুন",
    quotes: "উদ্ধৃতি",
    whyItMatters: "কেন এই ঘটনা আজও গুরুত্বপূর্ণ",
    whyItMattersSources: "গুরুত্ব ব্যাখ্যার সূত্র",
    evidence: "প্রমাণের শক্তি",
    high: "উচ্চ",
    medium: "মাঝারি",
    low: "নিম্ন",
  },
} as const;

export default async function EventPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_EVENT_SLUGS.includes(slug as EventSlug)) notFound();

  const [event, { previous, next }] = await Promise.all([getEventContent(locale, slug), getPreviousAndNextEvents(locale, slug)]);
  const featuredFigures = event.figures.slice(0, 5);
  const labels = EVENT_LABELS[locale as Locale];
  const resourceById = new Map(event.resources.map((resource) => [resource.id, resource] as const));
  const evidenceLabelByLevel = {
    high: labels.high,
    medium: labels.medium,
    low: labels.low,
  } as const;

  const renderInlineCitations = (sourceIds: string[] | undefined, resources: Map<string, EventResource>) => {
    if (!sourceIds?.length) return null;
    return (
      <span className="ml-1 inline-flex flex-wrap items-center gap-1 align-baseline">
        {sourceIds.map((sourceId, index) => {
          const resource = resources.get(sourceId);
          const href = resource?.href ?? `/${locale}/resources/${sourceId}`;
          const label = resource?.title ?? sourceId;
          return (
            <Link
              key={`claim-cite-${sourceId}-${index}`}
              href={href}
              {...(resource?.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[11px] font-medium text-accent underline-offset-2 hover:underline"
              aria-label={`${labels.overviewSources} ${index + 1}: ${label}`}
            >
              [{index + 1}]
            </Link>
          );
        })}
      </span>
    );
  };
  const renderEvidenceBadge = (evidenceLevel: "high" | "medium" | "low" | undefined) => {
    if (!evidenceLevel) return null;
    return (
      <span className="ml-2 inline-flex rounded-full border border-emerald-500/40 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
        {labels.evidence}: {evidenceLabelByLevel[evidenceLevel]}
      </span>
    );
  };
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${event.meta.year} — ${event.meta.title}`,
    description: event.meta.summary,
    eventStatus: "https://schema.org/EventCompleted",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: localeLanguageTag(locale as Locale),
    url: `https://bengalunfolded.com/${locale}/events/${slug}`,
    organizer: { "@type": "Organization", name: SITE_NAME, url: "https://bengalunfolded.com" },
  };

  return (
    <div className="space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
      <HeroSection
        title={`${event.meta.year} — ${event.meta.title}`}
        tagline={event.meta.heroTagline}
        intro={<>{renderGlossaryLinkedText(event.meta.summary, locale as Locale)}{renderInlineCitations(event.meta.summarySourceIds, resourceById)}{renderEvidenceBadge(event.meta.summaryEvidenceLevel)}</>}
      />

      <AnimatedContainer>
        <SectionTitle title={labels.overview} subtitle={event.meta.subtitle} />
      </AnimatedContainer>

      <AnimatedContainer delay={0.05}>
        <SectionTitle title={labels.timeline} />
        <div className="mt-4">
          <EventTimeline items={event.timeline} locale={locale as Locale} resources={event.resources} />
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <SectionTitle title={labels.figures} />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {featuredFigures.map((figure, index) => (
            <FigureProfileCard key={figure.id} figure={figure} locale={locale as Locale} featured={index === 0} />
          ))}
        </div>
        <div className="mt-4">
          <Link href={`/${locale}/events/${slug}/figures`} className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm font-medium text-accent hover:bg-amber-500/10">
            {labels.seeFullList}
          </Link>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.15}>
        <SectionTitle title={labels.resourcesTitle} subtitle={labels.resourcesSubtitle} />
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {event.resources.slice(0, 6).map((resource) => (
            <ResourceCard key={resource.id} resource={resource} locale={locale as Locale} />
          ))}
        </div>
        <div className="mt-4">
          <Link href={`/${locale}/events/${slug}/resources`} className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm font-medium text-accent hover:bg-amber-500/10">
            {labels.seeAllCategories}
          </Link>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.2}>
        <SectionTitle title={labels.quotes} />
        <div className="mt-4 grid gap-3">
          {event.quotes.map((quote) => (
            <QuoteBlock key={quote.text} quote={quote} />
          ))}
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.25}>
        <SectionTitle title={labels.whyItMatters} subtitle={<>{renderGlossaryLinkedText(event.meta.whyItMatters, locale as Locale)}{renderInlineCitations(event.meta.whyItMattersSourceIds, resourceById)}{renderEvidenceBadge(event.meta.whyItMattersEvidenceLevel)}</>} />
      </AnimatedContainer>

      <AnimatedContainer delay={0.3}>
        <EventNavigation locale={locale as Locale} previous={previous} next={next} />
      </AnimatedContainer>
    </div>
  );
}
