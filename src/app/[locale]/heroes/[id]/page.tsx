import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getEventsByHeroId, getHero } from "@/lib/content";
import { buildPageMetadata, localeLanguageTag } from "@/lib/seo";
import { SUPPORTED_HERO_IDS, SUPPORTED_LOCALES, type HeroId, type Locale } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => SUPPORTED_HERO_IDS.map((id) => ({ locale, id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_HERO_IDS.includes(id as HeroId)) return {};
  const hero = await getHero(locale, id);
  return buildPageMetadata({
    locale: locale as Locale,
    title: `${hero.name} | Bengal Unfolded`,
    description: hero.highlight ?? hero.contribution,
    canonicalPath: `/${locale}/heroes/${id}`,
    languagePathWithoutLocale: `/heroes/${id}`,
    type: "profile",
  });
}

export default async function HeroDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_HERO_IDS.includes(id as HeroId)) notFound();

  const [hero, events] = await Promise.all([getHero(locale, id), getEventsByHeroId(locale, id)]);
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: hero.name,
    description: hero.highlight ?? hero.contribution,
    url: `https://bengalunfolded.com/${locale}/heroes/${id}`,
    knowsAbout: hero.tags,
    inLanguage: localeLanguageTag(locale as Locale),
  };

  const labels = locale === "bn"
    ? { context: "প্রেক্ষাপট", contribution: "অবদান", impact: "প্রভাব", appearsIn: "যে ঘটনাগুলোতে অংশ নিয়েছেন" }
    : { context: "Context", contribution: "Contribution", impact: "Impact", appearsIn: "Appears In Events" };

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <HeroSection title={hero.name} tagline={hero.role} intro={hero.highlight ?? hero.contribution} />

      <AnimatedContainer>
        <SectionTitle title={labels.context} subtitle={hero.context} />
        <div className="theme-surface mt-4 rounded-xl border p-4">
          <h3 className="text-sm tracking-[0.18em] text-accent uppercase">{labels.contribution}</h3>
          <p className="mt-2 text-sm">{hero.contribution}</p>
          <h3 className="text-positive mt-4 text-sm tracking-[0.18em] uppercase">{labels.impact}</h3>
          <p className="mt-2 text-sm">{hero.impact}</p>
          {hero.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {hero.tags.map((tag) => (
                <span key={tag} className="theme-muted rounded-full border border-zinc-500/40 px-2 py-0.5 text-[11px]">{tag}</span>
              ))}
            </div>
          ) : null}
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.05}>
        <SectionTitle title={labels.appearsIn} />
        <div className="mt-4 grid gap-3">
          {events.map((event) => (
            <Link key={event.slug} href={`/${locale}/events/${event.slug}`} className="theme-surface rounded-xl border p-4 hover:border-amber-400/40">
              <p className="theme-muted text-xs tracking-[0.2em] uppercase">{event.year}</p>
              <h3 className="mt-1 text-lg font-semibold">{event.title}</h3>
              <p className="theme-muted mt-1 text-sm">{event.summary}</p>
            </Link>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
}
