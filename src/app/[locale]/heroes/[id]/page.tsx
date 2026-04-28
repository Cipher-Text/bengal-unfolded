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
  return { title: `${hero.name} | Bengal Unfolded`, description: hero.bio };
}

export default async function HeroDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_HERO_IDS.includes(id as HeroId)) notFound();

  const [hero, events] = await Promise.all([getHero(locale, id), getEventsByHeroId(locale, id)]);

  return (
    <div className="space-y-8">
      <HeroSection title={hero.name} tagline={hero.role} intro={hero.bio} />

      <AnimatedContainer>
        <SectionTitle title="Impact" subtitle={hero.impact} />
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
