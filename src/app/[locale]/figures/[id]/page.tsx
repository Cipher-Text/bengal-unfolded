import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { ShareActions } from "@/components/ShareActions";
import { getEventsByFigureIdChronological, getFigure, getTopicsByFigureId } from "@/lib/content";
import { buildDynamicOgImagePath, buildPageMetadata, localeLanguageTag } from "@/lib/seo";
import { SUPPORTED_FIGURE_IDS, SUPPORTED_LOCALES, type FigureId, type Locale } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => SUPPORTED_FIGURE_IDS.map((id) => ({ locale, id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_FIGURE_IDS.includes(id as FigureId)) return {};
  const [figure, events] = await Promise.all([
    getFigure(locale, id),
    getEventsByFigureIdChronological(locale, id),
  ]);
  const role = figure.role?.trim();
  const context = figure.context?.trim();
  const title = locale === "bn"
    ? (role && context
        ? `${figure.name} — ${context} এ ${role} | Bengal Unfolded`
        : role
          ? `${figure.name} — ${role} | Bengal Unfolded`
          : `${figure.name} | Bengal Unfolded`)
    : (role && context
        ? `${figure.name} — ${role} in ${context} | Bengal Unfolded`
        : role
          ? `${figure.name} — ${role} | Bengal Unfolded`
          : `${figure.name} | Bengal Unfolded`);
  const period = events.length > 0
    ? (events[0].year === events[events.length - 1].year
        ? events[0].year
        : `${events[0].year}–${events[events.length - 1].year}`)
    : null;
  const why = (figure.highlight ?? figure.contribution).trim();
  const baseDescription = locale === "bn"
    ? [
        role ? `${figure.name} কে জানুন, যিনি ${role}` : `${figure.name} কে জানুন`,
        context ? `${context} প্রেক্ষাপটে` : null,
        period ? `সময়কাল: ${period}` : null,
        why,
        "এই ব্যক্তিত্বের ঐতিহাসিক ভূমিকা, প্রভাব ও সংশ্লিষ্ট ঘটনাগুলো এক নজরে দেখুন।",
      ].filter(Boolean).join(" ")
    : [
        role ? `Learn about ${figure.name}, a ${role}.` : `Learn about ${figure.name}.`,
        context ? `Historical context: ${context}.` : null,
        period ? `Period: ${period}.` : null,
        why,
        "See their historical role, impact, and connected events in one place.",
      ].filter(Boolean).join(" ");
  const description = baseDescription.length > 320
    ? `${baseDescription.slice(0, 317).trimEnd()}...`
    : baseDescription;
  return buildPageMetadata({
    locale: locale as Locale,
    title,
    description,
    canonicalPath: `/${locale}/figures/${id}`,
    languagePathWithoutLocale: `/figures/${id}`,
    type: "profile",
    ogImagePath: buildDynamicOgImagePath({
      locale: locale as Locale,
      type: "figure",
      title: figure.name,
      subtitle: figure.role,
    }),
  });
}

export default async function FigureDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_FIGURE_IDS.includes(id as FigureId)) notFound();

  const [figure, events, relatedTopics] = await Promise.all([getFigure(locale, id), getEventsByFigureIdChronological(locale, id), getTopicsByFigureId(locale, id)]);
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
    ? {
        context: "প্রেক্ষাপট",
        contribution: "অবদান",
        impact: "প্রভাব",
        appearsIn: "ঘটনাসমূহে অংশগ্রহণ",
        timelineView: "ঘটনাপঞ্জি ভিউ",
        topicHub: "টপিক হাব",
        exploreTopicHub: "সম্পর্কিত টপিক দেখুন",
        share: "শেয়ার",
        copyLink: "লিংক কপি",
        copied: "কপি হয়েছে",
        copyFailed: "কপি ব্যর্থ",
      }
    : {
        context: "Context",
        contribution: "Contribution",
        impact: "Impact",
        appearsIn: "Appears In Events",
        timelineView: "Timeline View",
        topicHub: "Topic Hub",
        exploreTopicHub: "Explore related topics",
        share: "Share",
        copyLink: "Copy link",
        copied: "Copied",
        copyFailed: "Copy failed",
      };

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <HeroSection
        title={figure.name}
        tagline={figure.role}
        intro={figure.highlight ?? figure.contribution}
        rightSlot={
          <ShareActions
            title={figure.name}
            path={`/${locale}/figures/${id}`}
            labels={{ share: labels.share, copyLink: labels.copyLink, copied: labels.copied, copyFailed: labels.copyFailed }}
          />
        }
      />

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
        <SectionTitle title={labels.appearsIn} subtitle={labels.timelineView} />
        <div className="mt-4 space-y-3">
          {events.map((event, index) => (
            <div key={event.slug} className="relative pl-8">
              <span className="absolute top-5 left-2 h-2.5 w-2.5 rounded-full bg-amber-400" />
              {index < events.length - 1 ? <span className="absolute top-8 left-[0.84rem] h-[calc(100%+0.6rem)] w-px bg-amber-500/35" /> : null}
              <Link href={`/${locale}/events/${event.slug}`} className="theme-surface block rounded-xl border p-4 hover:border-amber-400/40">
                <p className="theme-muted text-xs tracking-[0.2em] uppercase">{event.year}</p>
                <h3 className="mt-1 text-lg font-semibold">{event.title}</h3>
                <p className="theme-muted mt-1 text-sm">{event.summary}</p>
              </Link>
            </div>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
}
