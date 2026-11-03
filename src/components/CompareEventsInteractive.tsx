"use client";

import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { eventStartYear } from "@/lib/eras";
import { pushSearchParams, useUrlSearchParams } from "@/lib/use-url-search-params";
import type { EventContent, EventImportance, EventMeta, Locale } from "@/types/content";

type EventOption = Pick<EventMeta, "slug" | "year" | "title">;

const DEFAULTS = ["1947-partition-and-eastern-bengal", "1952-language-movement"] as const;
// Pairs that make a useful first comparison: same theme at different times, or neighbouring turning points.
const SUGGESTED: Array<readonly [string, string]> = [
  ["1905-partition-of-bengal", "1947-partition-and-eastern-bengal"],
  ["1952-language-movement", "1971-liberation-war"],
  ["1757-battle-of-plassey", "1764-battle-of-buxar"],
  ["1770-great-bengal-famine", "1943-bengal-famine"],
  ["1969-mass-uprising", "1990-mass-uprising"],
  ["1990-mass-uprising", "2024-anti-discrimination-movement"],
];
const IMPORTANCE = {
  en: { landmark: "Landmark", major: "Major", high: "High", medium: "Medium", reference: "Reference" },
  bn: { landmark: "ল্যান্ডমার্ক", major: "প্রধান", high: "উচ্চ", medium: "মধ্যম", reference: "রেফারেন্স" },
} as const;

const L = {
  en: {
    choose: "Choose two chapters",
    first: "First chapter",
    second: "Second chapter",
    swap: "Swap",
    reset: "Reset",
    suggested: "Or try a pairing",
    apart: (n: number) => (n === 0 ? "Same year" : `${n} ${n === 1 ? "year" : "years"} apart`),
    shared: "What they share",
    people: "People",
    sources: "Sources",
    linked: "Linked chapters",
    nothing: "No people, sources or linked chapters in common in the current data.",
    period: "Era",
    movement: "Movement",
    place: "Place",
    importance: "Importance",
    evidence: "Evidence",
    evidenceValue: (s: number, c: number) => `${s} source${s === 1 ? "" : "s"}, ${c} claim citation${c === 1 ? "" : "s"}`,
    overview: "What happened",
    why: "Why it matters",
    causes: "Causes",
    consequences: "Consequences",
    notSpecified: "Not specified",
    inProgress: "Chapter in progress. The summary is a placeholder.",
    contested: "Contested interpretation",
    sensitive: "Sensitive material",
    read: "Read chapter",
    comparison: "Comparison",
  },
  bn: {
    choose: "দুটি অধ্যায় বাছাই করুন",
    first: "প্রথম অধ্যায়",
    second: "দ্বিতীয় অধ্যায়",
    swap: "অদলবদল",
    reset: "রিসেট",
    suggested: "অথবা একটি জোড়া দেখুন",
    apart: (n: number) => (n === 0 ? "একই বছর" : `${n.toLocaleString("bn-BD")} বছরের ব্যবধান`),
    shared: "যা মিলে যায়",
    people: "ব্যক্তি",
    sources: "সূত্র",
    linked: "সংযুক্ত অধ্যায়",
    nothing: "বর্তমান তথ্যে কোনো ব্যক্তি, সূত্র বা সংযুক্ত অধ্যায় মেলেনি।",
    period: "যুগ",
    movement: "ধারা",
    place: "স্থান",
    importance: "গুরুত্ব",
    evidence: "প্রমাণ",
    evidenceValue: (s: number, c: number) => `${s.toLocaleString("bn-BD")}টি সূত্র, ${c.toLocaleString("bn-BD")}টি দাবি-সূত্র`,
    overview: "কী ঘটেছিল",
    why: "কেন গুরুত্বপূর্ণ",
    causes: "কারণ",
    consequences: "পরিণতি",
    notSpecified: "উল্লেখ নেই",
    inProgress: "অধ্যায়টি প্রস্তুতাধীন। সারসংক্ষেপটি খসড়া মাত্র।",
    contested: "বিতর্কিত ব্যাখ্যা",
    sensitive: "সংবেদনশীল বিষয়বস্তু",
    read: "অধ্যায় পড়ুন",
    comparison: "তুলনা",
  },
} as const;

const SIDE = [
  { key: "a", color: "var(--rust)" },
  { key: "b", color: "var(--forest)" },
] as const;

function sourceCounts(event: EventContent) {
  const ids = new Set<string>();
  const lists = [event.meta.summarySourceIds, event.meta.whyItMattersSourceIds, event.meta.longTermLegacySourceIds, event.meta.culturalImpactSourceIds, event.meta.identityMemorySourceIds, event.meta.historicalDebateSourceIds];
  for (const list of lists) for (const id of list ?? []) ids.add(id);
  for (const claim of event.meta.claimCitations ?? []) for (const id of claim.sourceIds) ids.add(id);
  return { sources: ids.size, claims: event.meta.claimCitations?.length ?? 0 };
}

function Row({ label, events, locale, render }: { label: string; events: [EventContent, EventContent]; locale: Locale; render: (event: EventContent) => ReactNode }) {
  const cells = events.map(render);
  const empty = (cell: ReactNode) => cell === null || cell === undefined || cell === false || cell === "";
  if (empty(cells[0]) && empty(cells[1])) return null;
  return (
    <div className="border-t py-5" style={{ borderColor: "var(--hairline)" }}>
      <h3 className="text-eyebrow mb-3">{label}</h3>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8">
        {events.map((event, index) => (
          <div key={event.meta.slug} className="min-w-0">
            <p className="mb-1 flex items-center gap-2 text-xs md:hidden" style={{ color: SIDE[index].color }}>
              <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: SIDE[index].color }} />
              <span className="font-semibold">{event.meta.year}</span>
            </p>
            <div className="text-sm leading-relaxed">{empty(cells[index]) ? <span className="theme-muted">{L[locale].notSpecified}</span> : cells[index]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={`${i}-${item}`} className="theme-muted flex gap-2">
          <span aria-hidden="true" className="text-accent">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function CompareEventsInteractive({ locale, options, initial }: { locale: Locale; options: EventOption[]; initial: [EventContent, EventContent] }) {
  const params = useUrlSearchParams();
  const t = L[locale];
  const valid = (value: string | null) => (value && options.some((event) => event.slug === value) ? value : "");
  const a = valid(params.get("a")) || DEFAULTS[0];
  const bCandidate = valid(params.get("b")) || DEFAULTS[1];
  const b = bCandidate === a ? (options.find((event) => event.slug !== a)?.slug ?? DEFAULTS[1]) : bCandidate;
  const [first, setFirst] = useState(initial[0]);
  const [second, setSecond] = useState(initial[1]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const load = (slug: string, fallback: EventContent) =>
      slug === fallback.meta.slug
        ? Promise.resolve(fallback)
        : fetch(`/${locale}/compare-data/${slug}`).then((response) => {
            if (!response.ok) throw new Error("Comparison data unavailable");
            return response.json() as Promise<EventContent>;
          });
    async function run() {
      setLoading(true);
      try {
        const [x, y] = await Promise.all([load(a, initial[0]), load(b, initial[1])]);
        if (active) {
          setFirst(x);
          setSecond(y);
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    void run();
    return () => {
      active = false;
    };
  }, [a, b, locale, initial]);

  const events: [EventContent, EventContent] = [first, second];
  const sharedFigures = useMemo(() => {
    const ids = new Set(second.figures.map((x) => x.id));
    return first.figures.filter((x) => ids.has(x.id)).slice(0, 8);
  }, [first, second]);
  const sharedResources = useMemo(() => {
    const ids = new Set(second.resources.map((x) => x.id));
    return first.resources.filter((x) => ids.has(x.id)).slice(0, 8);
  }, [first, second]);
  const linked = useMemo(() => {
    const ids = (event: EventContent) => new Set([...(event.meta.relatedEvents?.map((x) => x.eventId) ?? []), ...(event.meta.relatedEventIds ?? [])]);
    const other = ids(first);
    return [...ids(second)].filter((slug) => other.has(slug)).slice(0, 8);
  }, [first, second]);

  const yearA = eventStartYear(first.meta.slug);
  const yearB = eventStartYear(second.meta.slug);
  const apart = yearA !== null && yearB !== null ? Math.abs(yearA - yearB) : null;
  const hasShared = sharedFigures.length > 0 || sharedResources.length > 0 || linked.length > 0;

  const go = (nextA: string, nextB: string) => {
    const next = new URLSearchParams();
    if (nextA !== DEFAULTS[0]) next.set("a", nextA);
    if (nextB !== DEFAULTS[1]) next.set("b", nextB);
    if (nextA === DEFAULTS[0] && nextB !== DEFAULTS[1]) next.set("a", nextA);
    pushSearchParams(window.location.pathname, next);
  };
  const title = (slug: string) => options.find((event) => event.slug === slug)?.title ?? slug;
  // Titles alone are ambiguous (two "Mass Uprising" chapters), so pair chips carry the year.
  const withYear = (slug: string) => {
    const event = options.find((item) => item.slug === slug);
    return event ? `${event.year.match(/\d{3,4}/)?.[0] ?? event.year} ${event.title}` : slug;
  };
  const selectClass = "theme-surface min-h-[44px] w-full rounded-lg border px-3 text-sm";

  return (
    <div>
      <section aria-label={t.choose} className="space-y-4">
        <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-end">
          {[
            { key: "a", label: t.first, value: a, color: SIDE[0].color, onChange: (slug: string) => go(slug, b) },
            { key: "b", label: t.second, value: b, color: SIDE[1].color, onChange: (slug: string) => go(a, slug) },
          ].map((field, index) => (
            <label key={field.key} className={`grid gap-1.5 ${index === 1 ? "md:col-start-3 md:row-start-1" : ""}`}>
              <span className="text-eyebrow flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: field.color }} />
                {field.label}
              </span>
              <select value={field.value} onChange={(event) => field.onChange(event.target.value)} className={selectClass} style={{ borderColor: field.color }}>
                {options.map((event) => (
                  <option key={event.slug} value={event.slug}>
                    {event.year} — {event.title}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <div className="flex gap-2 md:col-start-2 md:row-start-1">
            <button type="button" onClick={() => go(b, a)} className="btn-vintage min-h-[44px] flex-1 justify-center md:flex-none" aria-label={t.swap}>
              <span aria-hidden="true">⇄</span> {t.swap}
            </button>
            <button type="button" onClick={() => pushSearchParams(window.location.pathname, new URLSearchParams())} className="min-h-[44px] flex-1 rounded-lg border px-4 text-sm font-medium theme-muted hover:border-[color:var(--gold)] md:flex-none" style={{ borderColor: "var(--border)" }}>
              {t.reset}
            </button>
          </div>
        </div>
        <div>
          <p className="text-eyebrow">{t.suggested}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {SUGGESTED.filter(([x, y]) => options.some((event) => event.slug === x) && options.some((event) => event.slug === y)).map(([x, y]) => (
              <li key={`${x}-${y}`}>
                <button type="button" onClick={() => go(x, y)} aria-pressed={a === x && b === y} className="section-tab min-h-[44px] !text-[13px] !tracking-[0.02em] !normal-case">
                  {withYear(x)} <span aria-hidden="true" className="opacity-60">↔</span> {withYear(y)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label={t.comparison} aria-busy={loading} className={`mt-8 transition-opacity duration-200 ${loading ? "opacity-60" : ""}`}>
        <div className="sticky top-[4.4rem] z-20 -mx-3 border-b px-3 py-3 backdrop-blur-md sm:-mx-4 sm:px-4 md:-mx-8 md:px-8" style={{ background: "var(--header)", borderColor: "var(--border)" }}>
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            {events.map((event, index) => (
              <div key={event.meta.slug} className="min-w-0 border-t-4 pt-2" style={{ borderTopColor: SIDE[index].color }}>
                <p className="text-eyebrow">{event.meta.year}</p>
                <h2 className="text-display text-base font-semibold leading-snug sm:text-xl md:text-2xl">{event.meta.title}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 md:gap-8">
          {events.map((event) => (
            <div key={event.meta.slug}>
              {event.meta.subtitle ? <p className="theme-muted text-sm leading-relaxed">{event.meta.subtitle}</p> : null}
              <p className="text-eyebrow mt-2 flex flex-wrap gap-x-4">
                {event.meta.contested ? <span>{t.contested}</span> : null}
                {event.meta.sensitive ? <span>{t.sensitive}</span> : null}
              </p>
              <Link prefetch={false} href={`/${locale}/events/${event.meta.slug}`} className="link-underline mt-2 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent">
                {t.read} <span className="arrow ml-2">→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="theme-surface mt-6 rounded-xl border p-5">
          <p className="text-eyebrow flex flex-wrap gap-x-4">
            <span>{t.shared}</span>
            {apart !== null ? <span className="text-accent">{t.apart(apart)}</span> : null}
          </p>
          {hasShared ? (
            <div className="mt-4 grid gap-5 md:grid-cols-3">
              {[
                { label: t.people, items: sharedFigures.map((x) => ({ href: `/${locale}/figures/${x.id}`, text: x.name })) },
                { label: t.sources, items: sharedResources.map((x) => ({ href: `/${locale}/resources/${x.id}`, text: x.title })) },
                { label: t.linked, items: linked.map((slug) => ({ href: `/${locale}/events/${slug}`, text: title(slug) })) },
              ]
                .filter((group) => group.items.length > 0)
                .map((group) => (
                  <div key={group.label}>
                    <h3 className="text-eyebrow mb-2">{group.label}</h3>
                    <ul className="space-y-1.5">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href} className="text-sm font-medium text-accent underline-offset-2 hover:underline">
                            {item.text}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          ) : (
            <p className="theme-muted mt-2 text-sm">{t.nothing}</p>
          )}
        </div>

        <div className="mt-6">
          <Row label={t.overview} events={events} locale={locale} render={(e) => (e.meta.stub ? <span className="theme-muted italic">{t.inProgress}</span> : e.meta.summary)} />
          <Row label={t.why} events={events} locale={locale} render={(e) => (e.meta.stub ? null : e.meta.whyItMatters)} />
          <Row label={t.causes} events={events} locale={locale} render={(e) => (e.meta.causes?.length ? <BulletList items={e.meta.causes} /> : null)} />
          <Row label={t.consequences} events={events} locale={locale} render={(e) => (e.meta.consequences?.length ? <BulletList items={e.meta.consequences} /> : null)} />
          <Row label={t.period} events={events} locale={locale} render={(e) => e.meta.periodLabel} />
          <Row label={t.movement} events={events} locale={locale} render={(e) => e.meta.movementLabel} />
          <Row label={t.place} events={events} locale={locale} render={(e) => e.meta.placeLabel} />
          <Row label={t.importance} events={events} locale={locale} render={(e) => IMPORTANCE[locale][e.meta.importance as EventImportance]} />
          <Row
            label={t.evidence}
            events={events}
            locale={locale}
            render={(e) => {
              if (e.meta.stub) return null;
              const counts = sourceCounts(e);
              return t.evidenceValue(counts.sources, counts.claims);
            }}
          />
        </div>
      </section>
    </div>
  );
}
