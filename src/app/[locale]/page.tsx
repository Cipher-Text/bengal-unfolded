import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { EventTimeline } from "@/components/EventTimeline";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllEvents, getHomeContent } from "@/lib/content";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  const home = await getHomeContent(locale);
  return { title: `${home.title} | ${locale.toUpperCase()}`, description: home.intro };
}
export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const [home, events] = await Promise.all([getHomeContent(locale), getAllEvents(locale)]);
  const phaseBySlug: Record<string, string> = locale === "bn"
    ? { "1947": "বিভাজন", "1952": "ভাষা", "1971": "স্বাধীনতা", "1990": "গণতন্ত্র", "2024": "ন্যায্যতা" }
    : { "1947": "Partition", "1952": "Language", "1971": "Liberation", "1990": "Democracy", "2024": "Justice" };
  const timelineItems = events.map((event) => ({
    year: event.year,
    title: event.title,
    detail: event.summary,
    href: `/${locale}/events/${event.slug}`,
    ctaLabel: event.ctaLabel || "Details",
    phaseLabel: phaseBySlug[event.slug],
    themeColor: event.themeColor,
    emphasis: event.slug === "1971" ? "peak" as const : "normal" as const,
  }));
  return <div className="space-y-10"><HeroSection title={home.title} tagline={home.tagline} intro={home.intro} /><AnimatedContainer><SectionTitle title={home.timelineHeading} subtitle={home.timelineSubheading} /></AnimatedContainer><AnimatedContainer delay={0.05}><EventTimeline items={timelineItems} locale={locale as Locale} /></AnimatedContainer><AnimatedContainer delay={0.1}><section className="theme-surface-soft rounded-2xl border border-amber-400/20 p-6 md:p-8"><h2 className="text-2xl font-semibold md:text-3xl">{home.whyJourneyMattersHeading}</h2><p className="theme-muted mt-3 text-base leading-relaxed md:text-lg">{home.whyJourneyMattersBody}</p></section></AnimatedContainer></div>;
}
