import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getEventsByHeroId, getHero } from "@/lib/content";
import { SUPPORTED_HERO_IDS, SUPPORTED_LOCALES, type HeroId, type Locale } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => SUPPORTED_HERO_IDS.map((id) => ({ locale, id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_HERO_IDS.includes(id as HeroId)) return {};
  const hero = await getHero(locale, id);
  return { title: `${hero.name} | Bengal Unfolded`, description: hero.highlight ?? hero.contribution };
}

export default async function HeroDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_HERO_IDS.includes(id as HeroId)) notFound();

  const [hero, events] = await Promise.all([getHero(locale, id), getEventsByHeroId(locale, id)]);

  return (
    <div className="space-y-8">
      <HeroSection title={hero.name} tagline={hero.role} intro={hero.highlight ?? hero.contribution} />

      <AnimatedContainer>
        <SectionTitle title={locale === "bn" ? "প্রেক্ষাপট" : "Context"} subtitle={hero.context} />
        <div className="theme-surface mt-4 rounded-xl border p-4">
          <h3 className="text-sm tracking-[0.18em] text-amber-400 uppercase">{locale === "bn" ? "অবদান" : "Contribution"}</h3>
          <p className="mt-2 text-sm">{hero.contribution}</p>
          <h3 className="mt-4 text-sm tracking-[0.18em] text-emerald-400 uppercase">{locale === "bn" ? "প্রভাব" : "Impact"}</h3>
          <p className="mt-2 text-sm">{hero.impact}</p>
          {hero.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {hero.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-zinc-500/40 px-2 py-0.5 text-[11px] text-zinc-300">{tag}</span>
              ))}
            </div>
          ) : null}
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.05}>
        <SectionTitle title="Appears In Events" />
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
