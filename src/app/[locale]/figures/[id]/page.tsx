import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { ShareActions } from "@/components/ShareActions";
import { getEventContent, getEventsByFigureIdChronological, getFigure, getTopicsByFigureId } from "@/lib/content";
import { absoluteUrl, buildDynamicOgImagePath, buildPageMetadata, localeLanguageTag, normalizeMetaDescription, serializeJsonLd } from "@/lib/seo";
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
  const fallbackTitle = locale === "bn"
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
  const title = figure.seoTitle ?? fallbackTitle;
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
  const description = normalizeMetaDescription(
    figure.seoDescription ?? baseDescription,
    locale === "bn"
      ? "এই ব্যক্তিত্বের ঐতিহাসিক ভূমিকা, প্রভাব ও সংশ্লিষ্ট ঘটনাগুলো এক নজরে দেখুন।"
      : "See this figure's historical role, impact, and connected events in one place.",
  );
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
    "@id": `https://bengalunfolded.com/${locale}/figures/${id}#person`,
    name: figure.name,
    description: figure.highlight ?? figure.contribution,
    url: `https://bengalunfolded.com/${locale}/figures/${id}`,
    image: figure.image,
    knowsAbout: figure.tags,
    inLanguage: localeLanguageTag(locale as Locale),
    mainEntityOfPage: `https://bengalunfolded.com/${locale}/figures/${id}`,
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "bn" ? "হোম" : "Home",
        item: absoluteUrl(`/${locale}`),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "bn" ? "ব্যক্তিত্ব" : "Figures",
        item: absoluteUrl(`/${locale}/figures`),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: figure.name,
        item: absoluteUrl(`/${locale}/figures/${id}`),
      },
    ],
  };

  const labels = locale === "bn"
    ? {
        biography: "জীবনী",
        context: "প্রেক্ষাপট",
        contribution: "অবদান",
        impact: "প্রভাব",
        timelinePlacement: "টাইমলাইন অবস্থান",
        firstAppearance: "প্রথম উপস্থিতি",
        latestAppearance: "সর্বশেষ উপস্থিতি",
        activitySpan: "সময় বিস্তৃতি",
        linkedEventsCount: "সংযুক্ত ঘটনার সংখ্যা",
        legacySummary: "উত্তরাধিকার সারাংশ",
        references: "রেফারেন্স",
        referencesSubtitle: "এই ব্যক্তিত্বকে বোঝার জন্য গুরুত্বপূর্ণ সূত্রসমূহ",
        citedIn: "উল্লেখিত",
        appearsIn: "ঘটনাসমূহে অংশগ্রহণ",
        timelineView: "ঘটনাপঞ্জি ভিউ",
        related: "সম্পর্কিত",
        relatedFigures: "সম্পর্কিত ব্যক্তিত্ব",
        relatedEvents: "সম্পর্কিত ঘটনা",
        relatedPlaces: "সম্পর্কিত স্থান",
        relatedResources: "সম্পর্কিত রিসোর্স",
        topicHub: "টপিক হাব",
        exploreTopicHub: "সম্পর্কিত টপিক দেখুন",
        share: "শেয়ার",
        copyLink: "লিংক কপি",
        downloadCard: "কার্ড ডাউনলোড",
        copied: "কপি হয়েছে",
        copyFailed: "কপি ব্যর্থ",
      }
      : {
        biography: "Biography",
        context: "Context",
        contribution: "Contribution",
        impact: "Impact",
        timelinePlacement: "Timeline Placement",
        firstAppearance: "First Appearance",
        latestAppearance: "Latest Appearance",
        activitySpan: "Active Span",
        linkedEventsCount: "Linked Events",
        legacySummary: "Legacy Summary",
        references: "References",
        referencesSubtitle: "Key sources for understanding this figure",
        citedIn: "Cited in",
        appearsIn: "Appears In Events",
        timelineView: "Timeline View",
        related: "Related",
        relatedFigures: "Related Figures",
        relatedEvents: "Related Events",
        relatedPlaces: "Related Places",
        relatedResources: "Related Resources",
        topicHub: "Topic Hub",
        exploreTopicHub: "Explore related topics",
        share: "Share",
        copyLink: "Copy link",
        downloadCard: "Download card",
        copied: "Copied",
        copyFailed: "Copy failed",
      };

  const eventContents = await Promise.all(
    events.map((eventMeta) => getEventContent(locale, eventMeta.slug)),
  );
  const relatedFigureMap = new Map<string, { id: string; name: string; role: string; count: number }>();
  const relatedResourceMap = new Map<string, { id: string; title: string; note: string; count: number }>();
  for (const content of eventContents) {
    for (const relatedFigure of content.figures) {
      if (relatedFigure.id === id) continue;
      const current = relatedFigureMap.get(relatedFigure.id);
      if (current) {
        current.count += 1;
      } else {
        relatedFigureMap.set(relatedFigure.id, {
          id: relatedFigure.id,
          name: relatedFigure.name,
          role: relatedFigure.role,
          count: 1,
        });
      }
    }
    for (const resource of content.resources) {
      const current = relatedResourceMap.get(resource.id);
      if (current) {
        current.count += 1;
      } else {
        relatedResourceMap.set(resource.id, {
          id: resource.id,
          title: resource.title,
          note: resource.note,
          count: 1,
        });
      }
    }
  }
  const relatedFigures = Array.from(relatedFigureMap.values())
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 6);
  const relatedResources = Array.from(relatedResourceMap.values())
    .sort((a, b) => b.count - a.count || a.title.localeCompare(b.title))
    .slice(0, 6);
  const relatedPlaces = Array.from(
    new Map(
      events
        .filter((event) => event.placeId && event.placeLabel)
        .map((event) => [event.placeId as string, { id: event.placeId as string, label: event.placeLabel as string }]),
    ).values(),
  ).slice(0, 6);
  const relatedEvents = events.slice(0, 6);
  const firstEvent = events[0];
  const latestEvent = events[events.length - 1];
  const activeSpan = firstEvent && latestEvent
    ? (firstEvent.year === latestEvent.year ? firstEvent.year : `${firstEvent.year} - ${latestEvent.year}`)
    : (locale === "bn" ? "প্রযোজ্য নয়" : "Not available");
  const timelinePlacementSummary = locale === "bn"
    ? `${figure.name} এই টাইমলাইনে ${events.length}টি সংযুক্ত ঘটনার মাধ্যমে উপস্থিত, যা ${activeSpan} সময়জুড়ে বিস্তৃত।`
    : `${figure.name} appears in ${events.length} linked timeline events, spanning ${activeSpan}.`;
  const biographySummary = locale === "bn"
    ? `${figure.context} প্রেক্ষাপটে ${figure.name} ${figure.role} হিসেবে পরিচিত। ${figure.highlight ?? figure.contribution}`
    : `In the context of ${figure.context}, ${figure.name} is recognized as ${figure.role}. ${figure.highlight ?? figure.contribution}`;
  const legacySummary = locale === "bn"
    ? `${figure.impact} ${events.length > 0 ? `এই প্রভাব ${events.length}টি সংশ্লিষ্ট ঘটনার বর্ণনায় প্রতিফলিত হয়েছে।` : ""}`
    : `${figure.impact} ${events.length > 0 ? `This influence is reflected across ${events.length} connected events.` : ""}`;
  const shareImagePath = buildDynamicOgImagePath({
    locale: locale as Locale,
    type: "figure",
    title: figure.name,
    subtitle: figure.role,
  });

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
      <HeroSection
        title={figure.name}
        tagline={figure.role}
        intro={figure.highlight ?? figure.contribution}
        rightSlot={
          <ShareActions
            title={figure.name}
            path={`/${locale}/figures/${id}`}
            labels={{ share: labels.share, copyLink: labels.copyLink, downloadCard: labels.downloadCard, copied: labels.copied, copyFailed: labels.copyFailed }}
            downloadImagePath={shareImagePath}
            downloadFileName={`bengal-unfolded-figure-${id}-${locale}.png`}
          />
        }
      />

      <AnimatedContainer>
        <SectionTitle title={labels.biography} subtitle={labels.context} />
        <div className="theme-surface mt-4 rounded-xl border p-4">
          {figure.image ? (
            <div className="theme-surface mb-4 overflow-hidden rounded-xl border border-amber-500/25 p-2">
              <Image src={figure.image} alt={figure.name} width={800} height={512} className="h-auto max-h-[32rem] w-full object-contain" priority={false} quality={85} />
            </div>
          ) : null}
          <p className="theme-muted text-sm leading-relaxed">{biographySummary}</p>
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
        <SectionTitle title={labels.timelinePlacement} />
        <div className="theme-surface mt-4 rounded-xl border p-4">
          <p className="theme-muted text-sm">{timelinePlacementSummary}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-amber-500/30 p-3">
              <p className="theme-muted text-xs tracking-[0.16em] uppercase">{labels.firstAppearance}</p>
              <p className="mt-1 font-semibold">{firstEvent ? firstEvent.year : (locale === "bn" ? "প্রযোজ্য নয়" : "N/A")}</p>
            </div>
            <div className="rounded-lg border border-amber-500/30 p-3">
              <p className="theme-muted text-xs tracking-[0.16em] uppercase">{labels.latestAppearance}</p>
              <p className="mt-1 font-semibold">{latestEvent ? latestEvent.year : (locale === "bn" ? "প্রযোজ্য নয়" : "N/A")}</p>
            </div>
            <div className="rounded-lg border border-amber-500/30 p-3">
              <p className="theme-muted text-xs tracking-[0.16em] uppercase">{labels.activitySpan}</p>
              <p className="mt-1 font-semibold">{activeSpan}</p>
            </div>
            <div className="rounded-lg border border-amber-500/30 p-3">
              <p className="theme-muted text-xs tracking-[0.16em] uppercase">{labels.linkedEventsCount}</p>
              <p className="mt-1 font-semibold">{events.length}</p>
            </div>
          </div>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.055}>
        <SectionTitle title={labels.legacySummary} />
        <div className="theme-surface mt-4 rounded-xl border p-4">
          <p className="text-sm leading-relaxed">{legacySummary}</p>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.058}>
        <SectionTitle title={labels.references} subtitle={labels.referencesSubtitle} />
        <div className="theme-surface mt-4 rounded-xl border p-4">
          <div className="space-y-2">
            {relatedResources.length ? relatedResources.map((resource) => (
              <Link key={resource.id} href={`/${locale}/resources/${resource.id}`} className="block rounded-lg border border-amber-500/30 p-3 hover:bg-amber-500/10">
                <p className="font-semibold">{resource.title}</p>
                <p className="theme-muted mt-1 text-sm">{resource.note}</p>
                <p className="theme-muted mt-1 text-xs">{labels.citedIn}: {resource.count} {locale === "bn" ? "ঘটনা" : "events"}</p>
              </Link>
            )) : <p className="theme-muted text-sm">{locale === "bn" ? "এখনও কোনো রেফারেন্স পাওয়া যায়নি।" : "No references found yet."}</p>}
          </div>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.06}>
        <SectionTitle title={labels.related} />
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="theme-surface rounded-xl border p-4">
            <h3 className="text-sm tracking-[0.18em] text-accent uppercase">{labels.relatedFigures}</h3>
            <div className="mt-3 space-y-2">
              {relatedFigures.length ? relatedFigures.map((relatedFigure) => (
                <Link key={relatedFigure.id} href={`/${locale}/figures/${relatedFigure.id}`} className="block rounded-lg border border-amber-500/30 p-3 hover:bg-amber-500/10">
                  <p className="font-semibold">{relatedFigure.name}</p>
                  <p className="theme-muted mt-1 text-sm">{relatedFigure.role}</p>
                </Link>
              )) : <p className="theme-muted text-sm">{locale === "bn" ? "এখনও কোনো সম্পর্কিত ব্যক্তিত্ব পাওয়া যায়নি।" : "No related figures found yet."}</p>}
            </div>
          </div>
          <div className="theme-surface rounded-xl border p-4">
            <h3 className="text-sm tracking-[0.18em] text-accent uppercase">{labels.relatedEvents}</h3>
            <div className="mt-3 space-y-2">
              {relatedEvents.length ? relatedEvents.map((event) => (
                <Link key={event.slug} href={`/${locale}/events/${event.slug}`} className="block rounded-lg border border-amber-500/30 p-3 hover:bg-amber-500/10">
                  <p className="theme-muted text-xs tracking-[0.18em] uppercase">{event.year}</p>
                  <p className="mt-1 font-semibold">{event.title}</p>
                </Link>
              )) : <p className="theme-muted text-sm">{locale === "bn" ? "এখনও কোনো সম্পর্কিত ঘটনা পাওয়া যায়নি।" : "No related events found yet."}</p>}
            </div>
          </div>
          <div className="theme-surface rounded-xl border p-4">
            <h3 className="text-sm tracking-[0.18em] text-accent uppercase">{labels.relatedPlaces}</h3>
            <div className="mt-3 space-y-2">
              {relatedPlaces.length ? relatedPlaces.map((place) => (
                <Link key={place.id} href={`/${locale}/places/${place.id}`} className="block rounded-lg border border-amber-500/30 p-3 hover:bg-amber-500/10">
                  <p className="font-semibold">{place.label}</p>
                </Link>
              )) : <p className="theme-muted text-sm">{locale === "bn" ? "এখনও কোনো সম্পর্কিত স্থান পাওয়া যায়নি।" : "No related places found yet."}</p>}
            </div>
          </div>
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.065}>
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
