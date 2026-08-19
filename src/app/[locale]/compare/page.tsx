import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { buildPageMetadata } from "@/lib/seo";
import { getAllEvents, getEventContent } from "@/lib/content";
import {
  SUPPORTED_EVENT_SLUGS,
  SUPPORTED_LOCALES,
  type EventContent,
  type EventImportance,
  type EventSlug,
  type Locale,
} from "@/types/content";

const DEFAULT_PAIR: Record<Locale, [EventSlug, EventSlug]> = {
  en: ["1947-partition-and-eastern-bengal", "1952-language-movement"],
  bn: ["1947-partition-and-eastern-bengal", "1952-language-movement"],
};

const IMPORTANCE_LABELS: Record<Locale, Record<EventImportance, string>> = {
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
};

const LABELS = {
  en: {
    title: "Compare Events",
    tagline: "Read two chapters side by side",
    intro:
      "Compare chronology, context, causes, consequences, people, places, and source posture without leaving the static archive.",
    chooserTitle: "Choose Two Events",
    chooserSubtitle: "Select two historical chapters and apply the comparison.",
    firstEvent: "First event",
    secondEvent: "Second event",
    apply: "Compare",
    reset: "Reset",
    snapshot: "Event Snapshot",
    year: "Year",
    period: "Period",
    movement: "Movement",
    place: "Place",
    importance: "Importance",
    evidence: "Evidence",
    overview: "Overview",
    whyItMatters: "Why It Matters",
    causes: "Causes",
    consequences: "Consequences",
    keyFigures: "Key Figures",
    resources: "Sources and Resources",
    related: "Related Chapters",
    commonGround: "Shared Context",
    commonFigures: "Shared figures",
    commonResources: "Shared resources",
    noOverlap: "No direct overlap in the current metadata.",
    readChapter: "Read chapter",
    none: "Not specified",
    sourceCount: "source(s)",
    claims: "claim citation(s)",
    contested: "Contested interpretation",
    sensitive: "Sensitive material",
  },
  bn: {
    title: "ঘটনা তুলনা",
    tagline: "দুটি অধ্যায় পাশাপাশি পড়ুন",
    intro:
      "স্ট্যাটিক আর্কাইভের ভেতরেই সময়, প্রেক্ষাপট, কারণ, পরিণতি, ব্যক্তি, স্থান ও সূত্রের অবস্থা তুলনা করুন।",
    chooserTitle: "দুটি ঘটনা বাছাই করুন",
    chooserSubtitle: "দুটি ঐতিহাসিক অধ্যায় নির্বাচন করে তুলনা প্রয়োগ করুন।",
    firstEvent: "প্রথম ঘটনা",
    secondEvent: "দ্বিতীয় ঘটনা",
    apply: "তুলনা করুন",
    reset: "রিসেট",
    snapshot: "ঘটনার সংক্ষিপ্ত চিত্র",
    year: "বছর",
    period: "পর্ব",
    movement: "ধারা",
    place: "স্থান",
    importance: "গুরুত্ব",
    evidence: "প্রমাণ",
    overview: "ওভারভিউ",
    whyItMatters: "কেন গুরুত্বপূর্ণ",
    causes: "কারণ",
    consequences: "পরিণতি",
    keyFigures: "মূল ব্যক্তিত্ব",
    resources: "সূত্র ও রিসোর্স",
    related: "সম্পর্কিত অধ্যায়",
    commonGround: "মিলিত প্রেক্ষাপট",
    commonFigures: "মিল থাকা ব্যক্তিত্ব",
    commonResources: "মিল থাকা সূত্র",
    noOverlap: "বর্তমান মেটাডাটায় সরাসরি মিল নেই।",
    readChapter: "অধ্যায় পড়ুন",
    none: "উল্লেখ নেই",
    sourceCount: "টি সূত্র",
    claims: "টি দাবি-সূত্র",
    contested: "বিতর্কিত ব্যাখ্যা",
    sensitive: "সংবেদনশীল বিষয়বস্তু",
  },
} as const;

type CompareSearchParams = {
  a?: string | string[];
  b?: string | string[];
};

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function toEventSlug(value: string | undefined): EventSlug | undefined {
  return SUPPORTED_EVENT_SLUGS.includes(value as EventSlug)
    ? (value as EventSlug)
    : undefined;
}

function sourcePosture(event: EventContent) {
  const directSourceIds = new Set<string>();
  for (const sourceId of event.meta.summarySourceIds ?? []) directSourceIds.add(sourceId);
  for (const sourceId of event.meta.whyItMattersSourceIds ?? []) directSourceIds.add(sourceId);
  for (const sourceId of event.meta.longTermLegacySourceIds ?? []) directSourceIds.add(sourceId);
  for (const sourceId of event.meta.culturalImpactSourceIds ?? []) directSourceIds.add(sourceId);
  for (const sourceId of event.meta.identityMemorySourceIds ?? []) directSourceIds.add(sourceId);
  for (const sourceId of event.meta.historicalDebateSourceIds ?? []) directSourceIds.add(sourceId);
  for (const claim of event.meta.claimCitations ?? []) {
    for (const sourceId of claim.sourceIds) directSourceIds.add(sourceId);
  }

  return {
    sourceCount: directSourceIds.size,
    claimCount: event.meta.claimCitations?.length ?? 0,
  };
}

function intersectionById<T extends { id: string }>(left: T[], right: T[]): T[] {
  const rightIds = new Set(right.map((item) => item.id));
  return left.filter((item) => rightIds.has(item.id));
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  return (
    <div className="border-t border-amber-500/20 py-3 first:border-t-0">
      <dt className="text-eyebrow opacity-80">{label}</dt>
      <dd className="mt-1 text-sm leading-relaxed">{value || "—"}</dd>
    </div>
  );
}

function TextList({
  items,
  emptyLabel,
}: {
  items: string[] | undefined;
  emptyLabel: string;
}) {
  if (!items?.length) return <p className="theme-muted text-sm">{emptyLabel}</p>;

  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={`${item}-${index}`} className="theme-muted text-sm leading-relaxed">
          <span className="mr-2 text-accent">•</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function EventComparePanel({
  event,
  locale,
}: {
  event: EventContent;
  locale: Locale;
}) {
  const labels = LABELS[locale];
  const posture = sourcePosture(event);
  const badges: string[] = [];
  if (event.meta.contested) badges.push(labels.contested);
  if (event.meta.sensitive) badges.push(labels.sensitive);

  return (
    <article className="theme-surface rounded-2xl border p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-eyebrow">{event.meta.year}</p>
          <h2 className="text-display mt-2 text-3xl font-semibold leading-tight">
            {event.meta.title}
          </h2>
          {event.meta.subtitle ? (
            <p className="theme-muted mt-2 text-sm leading-relaxed">{event.meta.subtitle}</p>
          ) : null}
        </div>
        <span
          aria-hidden="true"
          className="mt-1 inline-flex h-4 w-4 shrink-0 rounded-full"
          style={{
            backgroundColor: event.meta.themeColor,
            boxShadow:
              "inset 0 1px 1px rgba(255,255,255,0.4), 0 0 0 5px rgba(107,74,31,0.12)",
          }}
        />
      </div>

      {badges.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-amber-500/35 px-2.5 py-1 text-[11px] font-medium text-accent"
            >
              {badge}
            </span>
          ))}
        </div>
      ) : null}

      <dl className="mt-5">
        <DetailRow label={labels.period} value={event.meta.periodLabel} />
        <DetailRow label={labels.movement} value={event.meta.movementLabel} />
        <DetailRow label={labels.place} value={event.meta.placeLabel} />
        <DetailRow
          label={labels.importance}
          value={IMPORTANCE_LABELS[locale][event.meta.importance]}
        />
        <DetailRow
          label={labels.evidence}
          value={`${posture.sourceCount} ${labels.sourceCount}, ${posture.claimCount} ${labels.claims}`}
        />
      </dl>

      <div className="mt-6 space-y-5">
        <section>
          <h3 className="text-eyebrow mb-2">{labels.overview}</h3>
          <p className="theme-muted text-sm leading-relaxed">{event.meta.summary}</p>
        </section>
        <section>
          <h3 className="text-eyebrow mb-2">{labels.whyItMatters}</h3>
          <p className="theme-muted text-sm leading-relaxed">{event.meta.whyItMatters}</p>
        </section>
        <section>
          <h3 className="text-eyebrow mb-2">{labels.causes}</h3>
          <TextList items={event.meta.causes} emptyLabel={labels.none} />
        </section>
        <section>
          <h3 className="text-eyebrow mb-2">{labels.consequences}</h3>
          <TextList items={event.meta.consequences} emptyLabel={labels.none} />
        </section>
      </div>

      <div className="mt-6">
        <Link href={`/${locale}/events/${event.meta.slug}`} className="btn-ink">
          {labels.readChapter}
          <span className="arrow">→</span>
        </Link>
      </div>
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};

  const isBn = locale === "bn";
  return buildPageMetadata({
    locale: locale as Locale,
    title: isBn ? "ঘটনা তুলনা" : "Compare Events",
    description: isBn
      ? "বেঙ্গল আনফোল্ডেড-এ দুটি ঐতিহাসিক অধ্যায় পাশাপাশি তুলনা করুন।"
      : "Compare two Bengal Unfolded historical chapters side by side.",
    canonicalPath: `/${locale}/compare`,
    languagePathWithoutLocale: "/compare",
    type: "website",
  });
}

export default async function ComparePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<CompareSearchParams>;
}) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  const labels = LABELS[locale as Locale];
  const allEvents = await getAllEvents(locale);
  const query = await searchParams;
  const defaults = DEFAULT_PAIR[locale as Locale];
  const firstSlug = toEventSlug(firstValue(query.a)) ?? defaults[0];
  const secondSlugCandidate = toEventSlug(firstValue(query.b)) ?? defaults[1];
  const secondSlug =
    secondSlugCandidate === firstSlug
      ? allEvents.find((event) => event.slug !== firstSlug)?.slug ?? defaults[1]
      : secondSlugCandidate;

  const [firstEvent, secondEvent] = await Promise.all([
    getEventContent(locale, firstSlug),
    getEventContent(locale, secondSlug),
  ]);
  const sharedFigures = intersectionById(firstEvent.figures, secondEvent.figures).slice(0, 8);
  const sharedResources = intersectionById(firstEvent.resources, secondEvent.resources).slice(0, 8);
  const relatedSlugs = new Set([
    ...(firstEvent.meta.relatedEvents?.map((relation) => relation.eventId) ?? []),
    ...(firstEvent.meta.relatedEventIds ?? []),
  ]);
  const sharedRelated = [
    ...(secondEvent.meta.relatedEvents?.map((relation) => relation.eventId) ?? []),
    ...(secondEvent.meta.relatedEventIds ?? []),
  ].filter((slug) => relatedSlugs.has(slug));
  const uniqueSharedRelated = Array.from(new Set(sharedRelated));

  return (
    <div className="space-y-8">
      <HeroSection title={labels.title} tagline={labels.tagline} intro={labels.intro} />

      <section className="theme-surface rounded-2xl border p-5 md:p-6">
        <SectionTitle title={labels.chooserTitle} subtitle={labels.chooserSubtitle} />
        <form
          className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]"
          method="get"
          action={`/${locale}/compare`}
        >
          <label className="grid gap-2 text-sm">
            <span className="text-eyebrow">{labels.firstEvent}</span>
            <select
              name="a"
              defaultValue={firstSlug}
              className="theme-surface min-h-[44px] w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm"
            >
              {allEvents.map((event) => (
                <option key={`a-${event.slug}`} value={event.slug}>
                  {event.year} — {event.title}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm">
            <span className="text-eyebrow">{labels.secondEvent}</span>
            <select
              name="b"
              defaultValue={secondSlug}
              className="theme-surface min-h-[44px] w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm"
            >
              {allEvents.map((event) => (
                <option key={`b-${event.slug}`} value={event.slug}>
                  {event.year} — {event.title}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg border border-amber-500/40 px-4 text-sm font-medium text-accent hover:bg-amber-500/10 md:flex-none"
            >
              {labels.apply}
            </button>
            <Link
              href={`/${locale}/compare`}
              className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg border border-amber-500/25 px-4 text-sm font-medium theme-muted hover:bg-amber-500/10 md:flex-none"
            >
              {labels.reset}
            </Link>
          </div>
        </form>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <EventComparePanel event={firstEvent} locale={locale as Locale} />
        <EventComparePanel event={secondEvent} locale={locale as Locale} />
      </section>

      <section className="theme-surface rounded-2xl border p-5 md:p-6">
        <SectionTitle title={labels.commonGround} subtitle={labels.snapshot} />
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <div>
            <h3 className="text-eyebrow mb-3">{labels.commonFigures}</h3>
            {sharedFigures.length > 0 ? (
              <ul className="space-y-2">
                {sharedFigures.map((figure) => (
                  <li key={figure.id}>
                    <Link
                      href={`/${locale}/figures/${figure.id}`}
                      className="text-sm font-medium text-accent underline-offset-2 hover:underline"
                    >
                      {figure.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="theme-muted text-sm">{labels.noOverlap}</p>
            )}
          </div>
          <div>
            <h3 className="text-eyebrow mb-3">{labels.commonResources}</h3>
            {sharedResources.length > 0 ? (
              <ul className="space-y-2">
                {sharedResources.map((resource) => (
                  <li key={resource.id}>
                    <Link
                      href={`/${locale}/resources/${resource.id}`}
                      className="text-sm font-medium text-accent underline-offset-2 hover:underline"
                    >
                      {resource.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="theme-muted text-sm">{labels.noOverlap}</p>
            )}
          </div>
          <div>
            <h3 className="text-eyebrow mb-3">{labels.related}</h3>
            {uniqueSharedRelated.length > 0 ? (
              <ul className="space-y-2">
                {uniqueSharedRelated.slice(0, 8).map((slug) => {
                  const event = allEvents.find((item) => item.slug === slug);
                  return (
                    <li key={slug}>
                      <Link
                        href={`/${locale}/events/${slug}`}
                        className="text-sm font-medium text-accent underline-offset-2 hover:underline"
                      >
                        {event ? `${event.year} — ${event.title}` : slug}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="theme-muted text-sm">{labels.noOverlap}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
