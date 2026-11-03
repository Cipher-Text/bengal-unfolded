import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import Link from "next/link";
import { Contribute, EditorialMethod, EraStrip, ExplorePaths, PeopleAndPlaces, TimelinePreview, homeCopy } from "@/components/home/HomeDiscovery";
import { getAllEvents, getAllFiguresChronological, getAllPeriods, getAllPlaces, getAllResources, getAllTopics, getHomeContent } from "@/lib/content";
import { hasRealPortrait } from "@/lib/portraits";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

// One chapter per broad stretch of the chronology, so the sample is not weighted toward the last 75 years.
const MILESTONE_SLUGS = ["0750-1170-pala-dynasty-foundation", "1757-battle-of-plassey", "1947-partition-and-eastern-bengal", "1952-language-movement", "1971-liberation-war", "2024-anti-discrimination-movement"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  const isBn = locale === "bn";
  return buildPageMetadata({
    locale: locale as Locale,
    title: isBn
      ? "বাংলার ইতিহাস: টাইমলাইন, ব্যক্তিত্ব ও ঘটনা"
      : "Bengal History Timeline, People & Events",
    description: isBn
      ? "বাংলা ও বাংলাদেশের ইতিহাসের টাইমলাইন, ব্যক্তিত্ব, ঘটনা, স্থান ও সূত্রভিত্তিক গবেষণা দেখুন।"
      : "Explore the history of Bengal and Bangladesh through connected timelines, historical figures, events, places, and source-backed research.",
    canonicalPath: `/${locale}`,
    languagePathWithoutLocale: "",
    type: "website",
  });
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const [home, events, figures, periods, places, resources, topics] = await Promise.all([getHomeContent(locale), getAllEvents(locale), getAllFiguresChronological(locale), getAllPeriods(locale), getAllPlaces(locale), getAllResources(locale), getAllTopics(locale)]);
  const featured = events.find((event) => event.slug === "1971-liberation-war") ?? events[0];
  const milestones = MILESTONE_SLUGS.map((slug) => events.find((event) => event.slug === slug)).filter((event): event is (typeof events)[number] => Boolean(event));
  const people = figures.filter((figure) => hasRealPortrait(figure.image) && !["organization", "collective"].includes(figure.group));
  const isBn = locale === "bn";

  const copy = homeCopy[isBn ? "bn" : "en"];
  const hero = (
    <>
      <p>{featured.summary}</p>
      <Link href={`/${locale}/events/${featured.slug}`} className="link-underline mt-3 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent">
        {copy.read} <span className="arrow ml-2">→</span>
      </Link>
    </>
  );

  return <div className="space-y-16 md:space-y-24">
    <HeroSection showCollage={false} title={home.title} tagline={home.tagline} intro={home.intro} eyebrow={isBn ? "বাংলার সংযুক্ত ইতিহাস" : "Bengal’s connected history"} primaryAction={{ href: `/${locale}/timeline`, label: isBn ? "ইতিহাসের টাইমলাইন দেখুন" : "Explore the Timeline" }} secondaryAction={{ href: `/${locale}/paths`, label: isBn ? "নির্দেশিত পথে শুরু করুন" : "Start a guided path" }} rightTitle={featured.title} rightLabel={`${isBn ? "নির্বাচিত অধ্যায়" : "Featured chapter"} · ${featured.year}`} rightSlot={hero} />
    <EraStrip locale={locale as Locale} periods={periods} events={events} stats={[events.length, figures.length, periods.length, resources.length]} />
    <ExplorePaths locale={locale as Locale} topics={topics} />
    <TimelinePreview locale={locale as Locale} events={milestones} />
    {people.length || places.length ? <PeopleAndPlaces locale={locale as Locale} figures={people} places={places} /> : null}
    <EditorialMethod locale={locale as Locale} />
    <Contribute locale={locale as Locale} heading={home.whyJourneyMattersHeading} body={home.whyJourneyMattersBody} />
  </div>;
}
