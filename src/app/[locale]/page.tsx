import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";
import { getAllEvents, getHomeContent } from "@/lib/content";
import { buildPageMetadata, localeLanguageTag, SITE_NAME } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";
import type { TimelineTheme } from "@/types/content";

const EventTimeline = dynamic(
  () => import("@/components/EventTimeline").then((mod) => mod.EventTimeline),
  {
    loading: () => (
      <div className="relative pl-6">
        <div className="theme-border absolute top-0 left-2.5 h-full w-px border-l" />
        <div className="space-y-6">
          <div className="theme-surface h-36 animate-pulse rounded-xl border p-4" />
          <div className="theme-surface h-36 animate-pulse rounded-xl border p-4" />
        </div>
      </div>
    ),
  },
);
const HOMEPAGE_LANDMARK_LIMIT = 15;
const EVENT_THEME_BY_SLUG: Record<string, TimelineTheme[]> = {
  "1757": ["war", "economy"],
  "1857": ["war", "democracy"],
  "1906": ["democracy", "culture"],
  "1911": ["democracy", "culture"],
  "1943": ["economy", "war"],
  "1947": ["war", "democracy"],
  "1952": ["language", "culture", "democracy"],
  "1954": ["democracy"],
  "1958": ["democracy"],
  "1966": ["democracy", "economy"],
  "1969": ["democracy"],
  "1971": ["war", "democracy"],
  "1975": ["democracy"],
  "1990": ["democracy"],
  "2006": ["democracy"],
  "2013": ["democracy"],
  "2024": ["democracy", "economy"],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  const isBn = locale === "bn";
  const title = isBn ? "বেঙ্গল আনফোল্ডেড (Bengal Unfolded)" : "Bengal Unfolded";
  const description = isBn
    ? "বেঙ্গল আনফোল্ডেড একটি দ্বিভাষিক (বাংলা-ইংরেজি) বাংলাদেশ ও বঙ্গের ইতিহাস-সংস্কৃতি শেখার প্ল্যাটফর্ম, সংবাদ পোর্টাল নয়।"
    : "Bengal Unfolded is a bilingual (Bangla-English) Bangladesh and Bengal history and cultural learning platform, not a news portal.";

  return buildPageMetadata({
    locale: locale as Locale,
    title,
    description,
    canonicalPath: `/${locale}`,
    languagePathWithoutLocale: "",
    type: "website",
  });
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const [home, events] = await Promise.all([getHomeContent(locale), getAllEvents(locale)]);
  const isBn = locale === "bn";
  const metadataTitle = isBn ? "বেঙ্গল আনফোল্ডেড (Bengal Unfolded)" : "Bengal Unfolded";
  const metadataDescription = isBn
    ? "বেঙ্গল আনফোল্ডেড একটি দ্বিভাষিক (বাংলা-ইংরেজি) বাংলাদেশ ও বঙ্গের ইতিহাস-সংস্কৃতি শেখার প্ল্যাটফর্ম, সংবাদ পোর্টাল নয়।"
    : "Bengal Unfolded is a bilingual (Bangla-English) Bangladesh and Bengal history and cultural learning platform, not a news portal.";
  const landingEvents = events
    .filter((event) => event.showOnLanding !== false)
    .slice(0, HOMEPAGE_LANDMARK_LIMIT);

  const phaseBySlug: Record<string, string> = locale === "bn"
    ? { "1757": "পলাশী", "1857": "বিদ্রোহ", "1947": "বিভাজন", "1952": "ভাষা", "1969": "অভ্যুত্থান", "1971": "স্বাধীনতা", "1975": "বাকশাল", "1990": "গণতন্ত্র", "2006": "তত্ত্বাবধায়ক সংকট", "2024": "ন্যায্যতা" }
    : { "1757": "Plassey", "1857": "Revolt", "1947": "Partition", "1952": "Language", "1969": "Uprising", "1971": "Liberation", "1975": "BAKSAL", "1990": "Democracy", "2006": "Caretaker Crisis", "2024": "Justice" };

  const timelineItems = landingEvents.map((event) => ({
    year: event.year,
    title: event.title,
    detail: event.summary,
    href: `/${locale}/events/${event.slug}`,
    ctaLabel: event.ctaLabel || "Details",
    phaseLabel: phaseBySlug[event.slug],
    themeColor: event.themeColor,
    themes: EVENT_THEME_BY_SLUG[event.slug] ?? ["culture"],
    emphasis: event.slug === "1971" ? "peak" as const : "normal" as const,
  }));

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: metadataTitle,
    description: metadataDescription,
    url: `https://bengalunfolded.com/${locale}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: "https://bengalunfolded.com" },
    inLanguage: localeLanguageTag(locale as Locale),
  };

  return <div className="space-y-10">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
    <HeroSection title={home.title} tagline={home.tagline} intro={home.intro} />
    <AnimatedContainer><SectionTitle title={home.timelineHeading} subtitle={home.timelineSubheading} /></AnimatedContainer>
    <AnimatedContainer delay={0.05}><EventTimeline items={timelineItems} locale={locale as Locale} /></AnimatedContainer>
    <AnimatedContainer delay={0.08}>
      <div>
        <Link href={`/${locale}/timeline`} className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm font-medium text-accent hover:bg-amber-500/10">
          {locale === "bn" ? "পূর্ণ টাইমলাইন দেখুন" : "Explore Full Timeline"}
        </Link>
      </div>
    </AnimatedContainer>
    <AnimatedContainer delay={0.1}><section className="theme-surface-soft rounded-2xl border border-amber-400/20 p-6 md:p-8"><h2 className="text-2xl font-semibold md:text-3xl">{home.whyJourneyMattersHeading}</h2><p className="theme-muted mt-3 text-base leading-relaxed md:text-lg">{home.whyJourneyMattersBody}</p></section></AnimatedContainer>
  </div>;
}
