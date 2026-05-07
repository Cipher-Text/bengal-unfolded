import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getEventsByFigureId, getFigure, getTopicsByFigureId } from "@/lib/content";
import { buildPageMetadata, localeLanguageTag } from "@/lib/seo";
import { SUPPORTED_FIGURE_IDS, SUPPORTED_LOCALES, type FigureId, type Locale } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => SUPPORTED_FIGURE_IDS.map((id) => ({ locale, id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_FIGURE_IDS.includes(id as FigureId)) return {};
  const figure = await getFigure(locale, id);
  return buildPageMetadata({
    locale: locale as Locale,
    title: figure.name,
    description: figure.highlight ?? figure.contribution,
    canonicalPath: `/${locale}/figures/${id}`,
    languagePathWithoutLocale: `/figures/${id}`,
    type: "profile",
  });
}

export default async function FigureDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_FIGURE_IDS.includes(id as FigureId)) notFound();

  const [figure, events, relatedTopics] = await Promise.all([getFigure(locale, id), getEventsByFigureId(locale, id), getTopicsByFigureId(locale, id)]);
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: figure.name,
    description: figure.highlight ?? figure.contribution,
    url: `https://bengalunfolded.com/${locale}/figures/${id}`,
    image: figure.image,
    knowsAbout: figure.tags,
    inLanguage: localeLanguageTag(locale as Locale),
  };

  const labels = locale === "bn"
    ? { context: "প্রেক্ষাপট", contribution: "অবদান", impact: "প্রভাব", appearsIn: "যে ঘটনাগুলোতে অংশ নিয়েছেন", topicHub: "টপিক হাব", exploreTopicHub: "সম্পর্কিত টপিক দেখুন" }
    : { context: "Context", contribution: "Contribution", impact: "Impact", appearsIn: "Appears In Events", topicHub: "Topic Hub", exploreTopicHub: "Explore related topics" };

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <HeroSection title={figure.name} tagline={figure.role} intro={figure.highlight ?? figure.contribution} />

      <AnimatedContainer>
        <SectionTitle title={labels.context} subtitle={figure.context} />
        <div className="theme-surface mt-4 rounded-xl border p-4">
          {figure.image ? (
            <div className="theme-surface mb-4 overflow-hidden rounded-xl border border-amber-500/25 p-2">
              <img src={figure.image} alt={figure.name} loading="lazy" className="h-auto max-h-[32rem] w-full object-contain" />
            </div>
          ) : null}
          <h3 className="text-sm tracking-[0.18em] text-accent uppercase">{labels.contribution}</h3>
          <p className="mt-2 text-sm">{figure.contribution}</p>
          <h3 className="text-positive mt-4 text-sm tracking-[0.18em] uppercase">{labels.impact}</h3>
          <p className="mt-2 text-sm">{figure.impact}</p>
          {figure.tags?.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {figure.tags.map((tag) => (
                <span key={tag} className="theme-muted rounded-full border border-zinc-500/40 px-2 py-0.5 text-[11px]">{tag}</span>
              ))}
            </div>
          ) : null}
          {relatedTopics.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {relatedTopics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/${locale}/topics/${topic.slug}`}
                  className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-3 text-sm text-accent hover:bg-amber-500/10"
                >
                  {labels.topicHub}: {labels.exploreTopicHub} - {topic.title}
                </Link>
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
