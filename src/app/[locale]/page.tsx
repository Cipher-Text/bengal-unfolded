import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { ArchiveStats, ConnectedHistory, EditorialMethod, ExplorePaths, FeaturedStory, PeoplePreview, PlacesPreview, TimelinePreview, TopicExplorer, WhyAndContribute } from "@/components/home/HomeDiscovery";
import { getAllEvents, getAllFiguresChronological, getAllPeriods, getAllPlaces, getAllResources, getAllTopics, getHomeContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

const MILESTONE_SLUGS = ["1757-battle-of-plassey", "1905-partition-of-bengal", "1952-language-movement", "1969-mass-uprising", "1971-liberation-war", "1990-mass-uprising"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  const isBn = locale === "bn";
  return buildPageMetadata({ locale: locale as Locale, title: isBn ? "বেঙ্গল আনফোল্ডেড" : "Bengal Unfolded", description: isBn ? "বাংলা ও বাংলাদেশের ইতিহাসের দ্বিভাষিক, সংযুক্ত ডিজিটাল আর্কাইভ।" : "A bilingual digital archive of connected histories across Bengal and Bangladesh.", canonicalPath: `/${locale}`, languagePathWithoutLocale: "", type: "website" });
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const [home, events, figures, periods, places, resources, topics] = await Promise.all([getHomeContent(locale), getAllEvents(locale), getAllFiguresChronological(locale), getAllPeriods(locale), getAllPlaces(locale), getAllResources(locale), getAllTopics(locale)]);
  const featured = events.find((event) => event.slug === "1971-liberation-war") ?? events[0];
  const milestones = MILESTONE_SLUGS.map((slug) => events.find((event) => event.slug === slug)).filter((event): event is (typeof events)[number] => Boolean(event));
  const people = figures.filter((figure) => figure.image && !["organization", "collective"].includes(figure.group));
  const isBn = locale === "bn";

  return <div className="space-y-16 md:space-y-24">
    <HeroSection title={home.title} tagline={home.tagline} intro={home.intro} eyebrow={isBn ? "বাংলার সংযুক্ত ইতিহাস" : "Bengal’s connected history"} primaryAction={{ href: `/${locale}/timeline`, label: isBn ? "ইতিহাসের টাইমলাইন দেখুন" : "Explore the Timeline" }} secondaryAction={{ href: `/${locale}/events/${featured.slug}`, label: isBn ? "একটি গল্প থেকে শুরু করুন" : "Start with a Story" }} rightTitle={featured.title} rightLabel={`${isBn ? "নির্বাচিত অধ্যায়" : "Selected chapter"} · ${featured.year}`} rightSlot={featured.summary} />
    <ArchiveStats locale={locale as Locale} stats={[events.length, figures.length, periods.length, resources.length]} />
    <ExplorePaths locale={locale as Locale} />
    <FeaturedStory locale={locale as Locale} event={featured} />
    <TimelinePreview locale={locale as Locale} events={milestones} />
    {people.length ? <PeoplePreview locale={locale as Locale} figures={people} /> : null}
    {places.length ? <PlacesPreview locale={locale as Locale} places={places} /> : null}
    <ConnectedHistory locale={locale as Locale} events={events} />
    {topics.length ? <TopicExplorer locale={locale as Locale} topics={topics} /> : null}
    <EditorialMethod locale={locale as Locale} />
    <WhyAndContribute locale={locale as Locale} heading={home.whyJourneyMattersHeading} body={home.whyJourneyMattersBody} />
  </div>;
}
