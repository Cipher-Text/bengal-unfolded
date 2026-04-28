import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { EventGrid } from "@/components/EventGrid";
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
  const timelineItems = events.map((event) => ({ year: event.year, title: event.title, detail: event.summary }));
  return <div className="space-y-10"><HeroSection title={home.title} tagline={home.tagline} intro={home.intro} /><AnimatedContainer><SectionTitle title={home.timelineHeading} subtitle={home.timelineSubheading} /></AnimatedContainer><AnimatedContainer delay={0.05}><EventTimeline items={timelineItems} /></AnimatedContainer><AnimatedContainer delay={0.1}><EventGrid events={events} locale={locale as Locale} /></AnimatedContainer></div>;
}
