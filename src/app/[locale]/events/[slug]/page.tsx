import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { EventNavigation } from "@/components/EventNavigation";
import { EventTimeline } from "@/components/EventTimeline";
import { HeroProfileCard } from "@/components/HeroProfileCard";
import { HeroSection } from "@/components/HeroSection";
import { QuoteBlock } from "@/components/QuoteBlock";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllEvents, getEventContent } from "@/lib/content";
import { SUPPORTED_EVENT_SLUGS, SUPPORTED_LOCALES, type EventSlug, type Locale } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => SUPPORTED_EVENT_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_EVENT_SLUGS.includes(slug as EventSlug)) return {};
  const event = await getEventContent(locale, slug);
  return {
    title: `${event.meta.year} - ${event.meta.title} | Bengal Unfolded`,
    description: event.meta.summary,
    alternates: {
      canonical: `/${locale}/events/${slug}`,
      languages: { en: `/en/events/${slug}`, bn: `/bn/events/${slug}` },
    },
  };
}

const EVENT_LABELS = {
  en: {
    overview: "Event Overview",
    timeline: "Interactive Timeline",
    heroes: "Heroes / Key Figures",
    seeFullList: "See full list",
    resourcesTitle: "Resources by Category",
    resourcesSubtitle: "Browse resources by subcategory",
    seeAllCategories: "See all categories",
    quotes: "Quotes",
    whyItMatters: "Why This Event Matters Today",
  },
  bn: {
    overview: "ইভেন্ট ওভারভিউ",
    timeline: "ইন্টারঅ্যাক্টিভ টাইমলাইন",
    heroes: "নায়ক ও গুরুত্বপূর্ণ ব্যক্তিত্ব",
    seeFullList: "পূর্ণ তালিকা দেখুন",
    resourcesTitle: "ক্যাটাগরি অনুযায়ী রিসোর্স",
    resourcesSubtitle: "সাব-ক্যাটাগরি অনুযায়ী রিসোর্স ব্রাউজ করুন",
    seeAllCategories: "সব ক্যাটাগরি দেখুন",
    quotes: "উদ্ধৃতি",
    whyItMatters: "কেন এই ঘটনা আজও গুরুত্বপূর্ণ",
  },
} as const;

export default async function EventPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_EVENT_SLUGS.includes(slug as EventSlug)) notFound();

  const [event, allEvents] = await Promise.all([getEventContent(locale, slug), getAllEvents(locale)]);
  const currentIndex = allEvents.findIndex((item) => item.slug === slug);
  const featuredHeroes = event.heroes.slice(0, 5);
  const labels = EVENT_LABELS[locale as Locale];

  return (
    <div className="space-y-10">
      <HeroSection title={`${event.meta.year} — ${event.meta.title}`} tagline={event.meta.heroTagline} intro={event.meta.summary} />

      <AnimatedContainer>
        <SectionTitle title={labels.overview} subtitle={event.meta.subtitle} />
      </AnimatedContainer>

      <AnimatedContainer delay={0.05}>
        <SectionTitle title={labels.timeline} />
        <div className="mt-4">
          <EventTimeline items={event.timeline} locale={locale as Locale} />
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <SectionTitle title={labels.heroes} />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {featuredHeroes.map((hero, index) => (
            <HeroProfileCard key={hero.id} hero={hero} locale={locale as Locale} featured={index === 0} />
          ))}
        </div>
        <div className="mt-4">
          <Link href={`/${locale}/events/${slug}/heroes`} className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm font-medium text-accent hover:bg-amber-500/10">
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
        <SectionTitle title={labels.whyItMatters} subtitle={event.meta.whyItMatters} />
      </AnimatedContainer>

      <AnimatedContainer delay={0.3}>
        <EventNavigation locale={locale as Locale} previous={allEvents[currentIndex - 1]} next={allEvents[currentIndex + 1]} />
      </AnimatedContainer>
    </div>
  );
}
