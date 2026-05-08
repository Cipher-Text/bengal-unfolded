import type { Metadata } from "next";
import { buildPageMetadata, localeLanguageTag, SITE_NAME } from "@/lib/seo";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { EventNavigation } from "@/components/EventNavigation";
import { EventTimeline } from "@/components/EventTimeline";
import { FigureProfileCard } from "@/components/FigureProfileCard";
import { HeroSection } from "@/components/HeroSection";
import { QuoteBlock } from "@/components/QuoteBlock";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionTitle } from "@/components/SectionTitle";
import { getEventContent, getEventHierarchy, getEventRelationships, getPreviousAndNextEvents, getTopicsByEventSlug } from "@/lib/content";
import { renderGlossaryLinkedText } from "@/lib/glossary-linking";
import { SUPPORTED_EVENT_SLUGS, SUPPORTED_LOCALES, type EventSlug, type Locale } from "@/types/content";
import type { EventResource } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => SUPPORTED_EVENT_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_EVENT_SLUGS.includes(slug as EventSlug)) return {};
  const event = await getEventContent(locale, slug);
  return buildPageMetadata({
    locale: locale as Locale,
    title: `${event.meta.year} - ${event.meta.title} | Bengal Unfolded`,
    description: event.meta.summary,
    canonicalPath: `/${locale}/events/${slug}`,
    languagePathWithoutLocale: `/events/${slug}`,
    type: "article",
  });
}

const EVENT_LABELS = {
  en: {
    overview: "Overview",
    overviewSources: "Overview Sources",
    timeline: "Timeline",
    figures: "Key Figures",
    seeFullList: "See full list",
    resourcesTitle: "Resources by Category",
    resourcesSubtitle: "Browse resources by subcategory",
    seeAllCategories: "See all categories",
    quotes: "Quotes",
    faq: "FAQ",
    whyItMatters: "Why This Event Matters Today",
    whyItMattersSources: "Why It Matters Sources",
    evidence: "Evidence",
    high: "High",
    medium: "Medium",
    low: "Low",
    jumpTo: "Jump to",
    hierarchy: "Timeline Context",
    partOf: "Part of a broader chapter",
    cluster: "Connected chapters in this cluster",
    related: "Related chapters",
    importance: "Importance",
    movement: "Movement",
    sensitiveContent: "Sensitive content",
    sensitiveContentNote: "This chapter includes sensitive historical material. Reader discretion is advised.",
    contentWarnings: "Content warnings",
    sourcesRequired: "Strong sourcing required",
    topicHub: "Topic Hub",
    exploreTopicHub: "Explore related topics",
    whatLedToThis: "What led to this",
    whatFollowed: "What followed",
    readInParallel: "Read in parallel",
    longTermLegacy: "Long-term legacy",
    background: "Background chapters",
    contrast: "Useful contrasts",
  },
  bn: {
    overview: "ওভারভিউ",
    overviewSources: "ওভারভিউ-এর সূত্র",
    timeline: "টাইমলাইন",
    figures: "মূল ব্যক্তিত্ব",
    seeFullList: "পূর্ণ তালিকা দেখুন",
    resourcesTitle: "ক্যাটাগরি অনুযায়ী রিসোর্স",
    resourcesSubtitle: "সাব-ক্যাটাগরি অনুযায়ী রিসোর্স ব্রাউজ করুন",
    seeAllCategories: "সব ক্যাটাগরি দেখুন",
    quotes: "উদ্ধৃতি",
    faq: "প্রশ্নোত্তর",
    whyItMatters: "কেন এই ঘটনা আজও গুরুত্বপূর্ণ",
    whyItMattersSources: "গুরুত্ব ব্যাখ্যার সূত্র",
    evidence: "প্রমাণের শক্তি",
    high: "উচ্চ",
    medium: "মাঝারি",
    low: "নিম্ন",
    jumpTo: "যেতে চান",
    hierarchy: "টাইমলাইন প্রেক্ষাপট",
    partOf: "বৃহত্তর অধ্যায়ের অংশ",
    cluster: "এই ক্লাস্টারের সংযুক্ত অধ্যায়গুলো",
    related: "সম্পর্কিত অধ্যায়",
    importance: "গুরুত্ব",
    movement: "ধারা",
    sensitiveContent: "সংবেদনশীল বিষয়বস্তু",
    sensitiveContentNote: "এই অধ্যায়ে সংবেদনশীল ঐতিহাসিক বিষয় আছে। পাঠে বিচক্ষণতা প্রয়োজন।",
    contentWarnings: "সতর্কতা",
    sourcesRequired: "শক্তিশালী সূত্র আবশ্যক",
    topicHub: "টপিক হাব",
    exploreTopicHub: "সম্পর্কিত টপিক দেখুন",
    whatLedToThis: "কীভাবে এখানে পৌঁছাল",
    whatFollowed: "এর পরে কী হলো",
    readInParallel: "পাশাপাশি পড়ুন",
    longTermLegacy: "দীর্ঘমেয়াদি উত্তরাধিকার",
    background: "পটভূমির অধ্যায়",
    contrast: "তুলনামূলক অধ্যায়",
  },
} as const;

const IMPORTANCE_LABELS = {
  en: {
    landmark: "Landmark",
    major: "Major",
    high: "High",
    medium: "Medium",
    reference: "Reference",
  },
  bn: {
    landmark: "ল্যান্ডমার্ক",
    major: "প্রধান",
    high: "উচ্চ",
    medium: "মধ্যম",
    reference: "রেফারেন্স",
  },
} as const;

export default async function EventPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_EVENT_SLUGS.includes(slug as EventSlug)) notFound();

  const [event, { previous, next }, hierarchy, relationships, relatedTopics] = await Promise.all([
    getEventContent(locale, slug),
    getPreviousAndNextEvents(locale, slug),
    getEventHierarchy(locale, slug),
    getEventRelationships(locale, slug),
    getTopicsByEventSlug(locale, slug),
  ]);
  const featuredFigures = event.figures.slice(0, 5);
  const labels = EVENT_LABELS[locale as Locale];
  const resourceById = new Map(event.resources.map((resource) => [resource.id, resource] as const));
  const evidenceLabelByLevel = {
    high: labels.high,
    medium: labels.medium,
    low: labels.low,
  } as const;

  const renderInlineCitations = (sourceIds: string[] | undefined, resources: Map<string, EventResource>) => {
    if (!sourceIds?.length) return null;
    return (
      <span className="ml-1 inline-flex flex-wrap items-center gap-1 align-baseline">
        {sourceIds.map((sourceId, index) => {
          const resource = resources.get(sourceId);
          const href = resource?.href ?? `/${locale}/resources/${sourceId}`;
          const label = resource?.title ?? sourceId;
          return (
            <Link
              key={`claim-cite-${sourceId}-${index}`}
              href={href}
              {...(resource?.href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-[11px] font-medium text-accent underline-offset-2 hover:underline"
              aria-label={`${labels.overviewSources} ${index + 1}: ${label}`}
            >
              [{index + 1}]
            </Link>
          );
        })}
      </span>
    );
  };
  const renderEvidenceBadge = (evidenceLevel: "high" | "medium" | "low" | undefined) => {
    if (!evidenceLevel) return null;
    return (
      <span className="ml-2 inline-flex rounded-full border border-emerald-500/40 px-2 py-0.5 text-[11px] font-medium text-emerald-300">
        {labels.evidence}: {evidenceLabelByLevel[evidenceLevel]}
      </span>
    );
  };
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${event.meta.year} — ${event.meta.title}`,
    description: event.meta.summary,
    eventStatus: "https://schema.org/EventCompleted",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: localeLanguageTag(locale as Locale),
    url: `https://bengalunfolded.com/${locale}/events/${slug}`,
    organizer: { "@type": "Organization", name: SITE_NAME, url: "https://bengalunfolded.com" },
  };
  const relationGroups = [
    { key: "cause", title: labels.whatLedToThis, items: relationships.cause },
    { key: "effect", title: labels.whatFollowed, items: relationships.effect },
    { key: "parallel", title: labels.readInParallel, items: relationships.parallel },
    { key: "legacy", title: labels.longTermLegacy, items: relationships.legacy },
    { key: "background", title: labels.background, items: relationships.background },
    { key: "contrast", title: labels.contrast, items: relationships.contrast },
  ].filter((group) => group.items.length > 0);
  const faqEntries = event.quotes.filter((quote) => quote.source.startsWith("FAQ"));
  const quoteEntries = event.quotes.filter((quote) => !quote.source.startsWith("FAQ"));
  const faqPageJsonLd =
    faqEntries.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: localeLanguageTag(locale as Locale),
          mainEntity: faqEntries.map((entry) => {
            const match = entry.text.match(/^(.+?\?)\s*(.+)$/u);
            const question = match ? match[1] : entry.text;
            const answer = match ? match[2] : entry.text;
            return {
              "@type": "Question",
              name: question,
              acceptedAnswer: {
                "@type": "Answer",
                text: answer,
              },
            };
          }),
        }
      : null;

  return (
    <div className="space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />
      {faqPageJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }} />
      ) : null}
      <HeroSection
        title={`${event.meta.year} — ${event.meta.title}`}
        tagline={event.meta.heroTagline}
        intro={<>{renderGlossaryLinkedText(event.meta.summary, locale as Locale)}{renderInlineCitations(event.meta.summarySourceIds, resourceById)}{renderEvidenceBadge(event.meta.summaryEvidenceLevel)}</>}
      />

      <nav aria-label={labels.jumpTo} className="theme-surface-soft rounded-xl border border-amber-500/25 p-3">
        <p className="theme-muted mb-2 text-xs">{labels.jumpTo}</p>
        <div className="flex flex-wrap gap-2">
          <a href="#overview" className="inline-flex min-h-[36px] items-center rounded-full border border-amber-500/35 px-3 text-xs text-accent hover:bg-amber-500/10">{labels.overview}</a>
          <a href="#timeline" className="inline-flex min-h-[36px] items-center rounded-full border border-amber-500/35 px-3 text-xs text-accent hover:bg-amber-500/10">{labels.timeline}</a>
          <a href="#figures" className="inline-flex min-h-[36px] items-center rounded-full border border-amber-500/35 px-3 text-xs text-accent hover:bg-amber-500/10">{labels.figures}</a>
          <a href="#resources" className="inline-flex min-h-[36px] items-center rounded-full border border-amber-500/35 px-3 text-xs text-accent hover:bg-amber-500/10">{labels.resourcesTitle}</a>
          {faqEntries.length > 0 ? <a href="#faq" className="inline-flex min-h-[36px] items-center rounded-full border border-amber-500/35 px-3 text-xs text-accent hover:bg-amber-500/10">{labels.faq}</a> : null}
          {quoteEntries.length > 0 ? <a href="#quotes" className="inline-flex min-h-[36px] items-center rounded-full border border-amber-500/35 px-3 text-xs text-accent hover:bg-amber-500/10">{labels.quotes}</a> : null}
          <a href="#why-it-matters" className="inline-flex min-h-[36px] items-center rounded-full border border-amber-500/35 px-3 text-xs text-accent hover:bg-amber-500/10">{labels.whyItMatters}</a>
        </div>
      </nav>

      <AnimatedContainer>
        <section id="overview" className="scroll-mt-24">
        <SectionTitle title={labels.overview} subtitle={event.meta.subtitle} />
        <div className="theme-surface mt-4 rounded-2xl border p-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex rounded-full border border-amber-500/35 px-2.5 py-1 text-xs text-accent">
              {labels.importance}: {IMPORTANCE_LABELS[locale as Locale][event.meta.importance]}
            </span>
            {event.meta.periodLabel ? <span className="inline-flex rounded-full border border-amber-500/25 px-2.5 py-1 text-xs theme-muted">{event.meta.periodLabel}</span> : null}
            {event.meta.movementLabel ? <span className="inline-flex rounded-full border border-amber-500/25 px-2.5 py-1 text-xs theme-muted">{labels.movement}: {event.meta.movementLabel}</span> : null}
            {event.meta.sensitive ? (
              <span className="inline-flex rounded-full border border-rose-500/40 px-2.5 py-1 text-xs text-rose-300">
                {labels.sensitiveContent}
              </span>
            ) : null}
          </div>
          {event.meta.sensitive ? (
            <div className="mt-3 rounded-xl border border-rose-500/30 bg-rose-950/20 p-3 text-sm">
              <p className="font-medium text-rose-200">{labels.sensitiveContentNote}</p>
              {event.meta.contentWarnings?.length ? (
                <p className="theme-muted mt-1">
                  {labels.contentWarnings}: {event.meta.contentWarnings.join(", ")}
                </p>
              ) : null}
              {event.meta.requiresSources ? (
                <p className="mt-1 text-xs text-rose-300">{labels.sourcesRequired}</p>
              ) : null}
            </div>
          ) : null}
          {relatedTopics.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
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
        </section>
      </AnimatedContainer>

      {(hierarchy.parent || hierarchy.children.length > 0 || hierarchy.related.length > 0) ? (
        <AnimatedContainer delay={0.04}>
          <section className="scroll-mt-24">
            <SectionTitle title={labels.hierarchy} />
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <div className="theme-surface rounded-2xl border p-4">
                <h3 className="text-sm tracking-[0.18em] text-accent uppercase">{labels.partOf}</h3>
                {hierarchy.parent ? (
                  <Link href={`/${locale}/events/${hierarchy.parent.slug}`} className="mt-3 block rounded-xl border border-amber-500/30 p-3 hover:bg-amber-500/5">
                    <p className="theme-muted text-xs tracking-[0.2em] uppercase">{hierarchy.parent.year}</p>
                    <p className="mt-1 font-semibold">{hierarchy.parent.title}</p>
                    {hierarchy.parent.periodLabel ? <p className="theme-muted mt-1 text-xs">{hierarchy.parent.periodLabel}</p> : null}
                  </Link>
                ) : <p className="theme-muted mt-3 text-sm">{locale === "bn" ? "এই অধ্যায়টি নিজেই একটি মূল ক্লাস্টার অ্যাঙ্কর।" : "This chapter is itself a primary cluster anchor."}</p>}
              </div>
              <div className="theme-surface rounded-2xl border p-4">
                <h3 className="text-sm tracking-[0.18em] text-accent uppercase">{labels.cluster}</h3>
                {hierarchy.children.length ? (
                  <div className="mt-3 space-y-2">
                    {hierarchy.children.map((child) => (
                      <Link key={child.slug} href={`/${locale}/events/${child.slug}`} className="block rounded-xl border border-amber-500/30 p-3 hover:bg-amber-500/5">
                        <p className="theme-muted text-xs tracking-[0.2em] uppercase">{child.year}</p>
                        <p className="mt-1 font-semibold">{child.title}</p>
                      </Link>
                    ))}
                  </div>
                ) : <p className="theme-muted mt-3 text-sm">{locale === "bn" ? "এখনও কোনো চাইল্ড অধ্যায় যোগ করা হয়নি।" : "No child chapters have been linked yet."}</p>}
              </div>
              <div className="theme-surface rounded-2xl border p-4">
                <h3 className="text-sm tracking-[0.18em] text-accent uppercase">{labels.related}</h3>
                {hierarchy.related.length ? (
                  <div className="mt-3 space-y-2">
                    {hierarchy.related.map((relatedEvent) => (
                      <Link key={relatedEvent.slug} href={`/${locale}/events/${relatedEvent.slug}`} className="block rounded-xl border border-amber-500/30 p-3 hover:bg-amber-500/5">
                        <p className="theme-muted text-xs tracking-[0.2em] uppercase">{relatedEvent.year}</p>
                        <p className="mt-1 font-semibold">{relatedEvent.title}</p>
                      </Link>
                    ))}
                  </div>
                ) : <p className="theme-muted mt-3 text-sm">{locale === "bn" ? "এখনও কোনো সম্পর্কিত অধ্যায় যোগ করা হয়নি।" : "No related chapters have been linked yet."}</p>}
              </div>
            </div>
          </section>
        </AnimatedContainer>
      ) : null}

      {relationGroups.length ? (
        <AnimatedContainer delay={0.045}>
          <section className="scroll-mt-24">
            <SectionTitle title={locale === "bn" ? "ঐতিহাসিক সম্পর্ক" : "Historical Relationships"} />
            <div className="mt-4 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
              {relationGroups.map((group) => (
                <div key={group.key} className="theme-surface rounded-2xl border p-4">
                  <h3 className="text-sm tracking-[0.18em] text-accent uppercase">{group.title}</h3>
                  <div className="mt-3 space-y-2">
                    {group.items.map((relatedEvent) => (
                      <Link key={`${group.key}-${relatedEvent.slug}`} href={`/${locale}/events/${relatedEvent.slug}`} className="block rounded-xl border border-amber-500/30 p-3 hover:bg-amber-500/5">
                        <p className="theme-muted text-xs tracking-[0.2em] uppercase">{relatedEvent.year}</p>
                        <p className="mt-1 font-semibold">{relatedEvent.title}</p>
                        <p className="theme-muted mt-1 text-sm">{relatedEvent.summary}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </AnimatedContainer>
      ) : null}

      <AnimatedContainer delay={0.05}>
        <section id="timeline" className="scroll-mt-24">
        <SectionTitle title={labels.timeline} />
        <div className="mt-4">
          <EventTimeline items={event.timeline} locale={locale as Locale} resources={event.resources} />
        </div>
        </section>
      </AnimatedContainer>

      <AnimatedContainer delay={0.1}>
        <section id="figures" className="scroll-mt-24">
        <SectionTitle title={labels.figures} />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {featuredFigures.map((figure, index) => (
            <FigureProfileCard key={figure.id} figure={figure} locale={locale as Locale} featured={index === 0} />
          ))}
        </div>
        <div className="mt-4">
          <Link href={`/${locale}/events/${slug}/figures`} className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm font-medium text-accent hover:bg-amber-500/10">
            {labels.seeFullList}
          </Link>
        </div>
        </section>
      </AnimatedContainer>

      <AnimatedContainer delay={0.15}>
        <section id="resources" className="scroll-mt-24">
        <SectionTitle title={labels.resourcesTitle} subtitle={labels.resourcesSubtitle} />
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {event.resources.slice(0, 6).map((resource) => (
            <ResourceCard key={resource.id} resource={resource} locale={locale as Locale} />
          ))}
        </div>
        <div className="mt-4">
          <Link href={`/${locale}/events/${slug}/resources`} className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm font-medium text-accent hover:bg-amber-500/10">
            {labels.seeAllCategories}
          </Link>
        </div>
        </section>
      </AnimatedContainer>

      {faqEntries.length > 0 ? (
        <AnimatedContainer delay={0.2}>
          <section id="faq" className="scroll-mt-24">
          <SectionTitle title={labels.faq} />
          <div className="mt-4 grid gap-3">
            {faqEntries.map((quote) => (
              <QuoteBlock key={quote.text} quote={quote} />
            ))}
          </div>
          </section>
        </AnimatedContainer>
      ) : null}

      {quoteEntries.length > 0 ? (
        <AnimatedContainer delay={0.22}>
          <section id="quotes" className="scroll-mt-24">
          <SectionTitle title={labels.quotes} />
          <div className="mt-4 grid gap-3">
            {quoteEntries.map((quote) => (
              <QuoteBlock key={quote.text} quote={quote} />
            ))}
          </div>
          </section>
        </AnimatedContainer>
      ) : null}

      <AnimatedContainer delay={0.25}>
        <section id="why-it-matters" className="scroll-mt-24">
        <SectionTitle title={labels.whyItMatters} subtitle={<>{renderGlossaryLinkedText(event.meta.whyItMatters, locale as Locale)}{renderInlineCitations(event.meta.whyItMattersSourceIds, resourceById)}{renderEvidenceBadge(event.meta.whyItMattersEvidenceLevel)}</>} />
        </section>
      </AnimatedContainer>

      <AnimatedContainer delay={0.3}>
        <EventNavigation locale={locale as Locale} previous={previous} next={next} />
      </AnimatedContainer>
    </div>
  );
}
