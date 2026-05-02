import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { EventTimeline } from "@/components/EventTimeline";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";
import { getAllEvents, getHomeContent } from "@/lib/content";
import { buildPageMetadata, localeLanguageTag, SITE_NAME } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  const home = await getHomeContent(locale);

  return buildPageMetadata({
    locale: locale as Locale,
    title: home.title,
    description: home.intro,
    canonicalPath: `/${locale}`,
    languagePathWithoutLocale: "",
    type: "website",
  });
}

export default async function LocaleHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const [home, events] = await Promise.all([getHomeContent(locale), getAllEvents(locale)]);
  const landingEvents = events.filter((event) => event.showOnLanding !== false);

  const phaseBySlug: Record<string, string> = locale === "bn"
    ? { "1757": "পলাশী", "1857": "বিদ্রোহ", "1947": "বিভাজন", "1952": "ভাষা", "1969": "অভ্যুত্থান", "1971": "স্বাধীনতা", "1990": "গণতন্ত্র", "2024": "ন্যায্যতা" }
    : { "1757": "Plassey", "1857": "Revolt", "1947": "Partition", "1952": "Language", "1969": "Uprising", "1971": "Liberation", "1990": "Democracy", "2024": "Justice" };

  const timelineItems = landingEvents.map((event) => ({
    year: event.year,
    title: event.title,
    detail: event.summary,
    href: `/${locale}/events/${event.slug}`,
    ctaLabel: event.ctaLabel || "Details",
    phaseLabel: phaseBySlug[event.slug],
    themeColor: event.themeColor,
    emphasis: event.slug === "1971" ? "peak" as const : "normal" as const,
  }));

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: home.title,
    description: home.intro,
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
