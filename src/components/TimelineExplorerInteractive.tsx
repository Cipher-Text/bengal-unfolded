"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { replaceSearchParams, useUrlSearchParams } from "@/lib/use-url-search-params";
import type { EventImportance, Locale } from "@/types/content";

export type TimelineEntry = {
  slug: string;
  year: string;
  title: string;
  excerpt: string;
  periodId?: string;
  importance: EventImportance;
  stub?: boolean;
  sensitive?: boolean;
};

export type TimelineEra = {
  id: string;
  title: string;
  startYear: string;
  endYear: string;
  themeColor: string;
  description: string;
};

type Level = "all" | "key" | "landmark";

const copy = {
  en: {
    search: "Search the timeline",
    placeholder: "Search by year, title or keyword",
    levels: { all: "All chapters", key: "Key turning points", landmark: "Landmarks" },
    levelHelp: "Show",
    eras: "Jump to an era",
    results: (n: number, total: number) => (n === total ? `${n} chapters` : `${n} of ${total} chapters`),
    chapters: (n: number) => `${n} ${n === 1 ? "chapter" : "chapters"}`,
    none: "No chapters match. Try a different word or show all chapters.",
    reset: "Clear search and filters",
    read: "Read chapter",
    inProgress: "In progress",
    sensitive: "Sensitive",
    landmark: "Landmark",
  },
  bn: {
    search: "টাইমলাইনে খুঁজুন",
    placeholder: "বছর, শিরোনাম বা শব্দ লিখুন",
    levels: { all: "সব অধ্যায়", key: "গুরুত্বপূর্ণ মোড়", landmark: "ল্যান্ডমার্ক" },
    levelHelp: "দেখান",
    eras: "যুগে যান",
    results: (n: number, total: number) => (n === total ? `${n.toLocaleString("bn-BD")}টি অধ্যায়` : `${total.toLocaleString("bn-BD")}টির মধ্যে ${n.toLocaleString("bn-BD")}টি`),
    chapters: (n: number) => `${n.toLocaleString("bn-BD")}টি অধ্যায়`,
    none: "কোনো অধ্যায় মেলেনি। অন্য শব্দ চেষ্টা করুন বা সব অধ্যায় দেখুন।",
    reset: "খোঁজ ও ফিল্টার মুছুন",
    read: "অধ্যায়টি পড়ুন",
    inProgress: "প্রস্তুতাধীন",
    sensitive: "সংবেদনশীল",
    landmark: "ল্যান্ডমার্ক",
  },
} as const;

const norm = (value: string) => value.trim().toLocaleLowerCase();

function Entry({ entry, locale, color }: { entry: TimelineEntry; locale: Locale; color: string }) {
  const t = copy[locale];
  const isLandmark = entry.importance === "landmark";
  const isMajor = entry.importance === "major";
  return (
    <li className="timeline-entry relative">
      <span
        aria-hidden="true"
        className={`absolute left-[calc(-1.5rem-1px)] z-10 -translate-x-1/2 rounded-full border-2 md:left-[calc(-2rem-1px)] ${isLandmark ? "top-6 h-5 w-5" : isMajor ? "top-5 h-3.5 w-3.5" : "top-[1.15rem] h-2.5 w-2.5"}`}
        style={{ backgroundColor: isLandmark ? color : "var(--bg)", borderColor: color, boxShadow: isLandmark ? `0 0 0 4px var(--bg), 0 0 0 5px ${color}` : undefined }}
      />
      <p
        className={`text-eyebrow md:absolute md:left-[calc(-2rem-9rem)] md:w-32 md:text-right ${isLandmark ? "md:top-6" : isMajor ? "md:top-5" : "md:top-4"}`}
      >
        {entry.year}
      </p>
      <Link
        href={`/${locale}/events/${entry.slug}`}
        className={`group mt-1 block rounded-xl border transition-[border-color,background-color,box-shadow] duration-200 hover:border-[color:var(--gold)] md:mt-0 ${
          isLandmark
            ? "paper paper-stained p-5 md:p-7"
            : isMajor
              ? "theme-surface p-4 md:p-5"
              : "border-transparent p-3 hover:bg-[color:var(--surface)] md:p-4"
        }`}
        style={isLandmark ? { borderLeft: `4px solid ${color}` } : undefined}
      >
        {isLandmark ? <p className="text-eyebrow-script !text-base">{t.landmark}</p> : null}
        <h3 className={`text-display font-semibold leading-snug group-hover:text-accent ${isLandmark ? "text-2xl md:text-3xl" : isMajor ? "text-xl" : "text-lg"}`}>
          {entry.title}
        </h3>
        {entry.excerpt ? <p className={`theme-muted mt-1.5 text-sm leading-relaxed ${isLandmark ? "md:text-base" : "line-clamp-2"}`}>{entry.excerpt}</p> : null}
        {entry.stub || entry.sensitive || isLandmark ? (
          <p className="text-eyebrow mt-2 flex flex-wrap gap-x-4">
            {entry.sensitive ? <span>{t.sensitive}</span> : null}
            {entry.stub ? <span>{t.inProgress}</span> : null}
            {isLandmark ? (
              <span className="text-accent">
                {t.read} <span aria-hidden="true">→</span>
              </span>
            ) : null}
          </p>
        ) : null}
      </Link>
    </li>
  );
}

export function TimelineExplorerInteractive({ events, eras, locale }: { events: TimelineEntry[]; eras: TimelineEra[]; locale: Locale }) {
  const t = copy[locale];
  // Read ?q= after mount so the static HTML always contains the whole timeline.
  const query = useUrlSearchParams().get("q") ?? "";
  const setQuery = (value: string) => replaceSearchParams(window.location.pathname, value ? new URLSearchParams({ q: value }) : new URLSearchParams());
  const [level, setLevel] = useState<Level>("all");
  const [active, setActive] = useState<string | null>(eras[0]?.id ?? null);
  const navRef = useRef<HTMLOListElement>(null);

  const filtered = useMemo(() => {
    const needle = norm(query);
    return events.filter((event) => {
      if (level === "landmark" && event.importance !== "landmark") return false;
      if (level === "key" && event.importance !== "landmark" && event.importance !== "major") return false;
      return !needle || norm(`${event.year} ${event.title} ${event.excerpt}`).includes(needle);
    });
  }, [events, query, level]);

  const groups = useMemo(() => {
    const known = new Set(eras.map((era) => era.id));
    return eras
      .map((era) => ({ era, items: filtered.filter((event) => event.periodId === era.id) }))
      .concat(
        filtered.some((event) => !event.periodId || !known.has(event.periodId))
          ? [{ era: { id: "other", title: locale === "bn" ? "অন্যান্য" : "Other", startYear: "", endYear: "", themeColor: "var(--sepia)", description: "" }, items: filtered.filter((event) => !event.periodId || !known.has(event.periodId)) }]
          : [],
      )
      .filter((group) => group.items.length > 0);
  }, [eras, filtered, locale]);

  const levelCounts = useMemo(
    () => ({
      all: events.length,
      key: events.filter((event) => event.importance === "landmark" || event.importance === "major").length,
      landmark: events.filter((event) => event.importance === "landmark").length,
    }),
    [events],
  );

  // Scroll-spy: highlight the era currently under the sticky bar.
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-era-section]"));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive((visible[0].target as HTMLElement).dataset.eraSection ?? null);
      },
      { rootMargin: "-140px 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [groups]);

  // Keep the active chip visible in the horizontally scrolling era bar.
  useEffect(() => {
    const chip = navRef.current?.querySelector<HTMLElement>(`[data-chip="${active}"]`);
    const bar = navRef.current;
    if (!chip || !bar) return;
    const target = chip.offsetLeft - bar.clientWidth / 2 + chip.clientWidth / 2;
    bar.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);

  const hasFilters = query !== "" || level !== "all";
  const reset = () => {
    setQuery("");
    setLevel("all");
  };

  return (
    <div>
      <div className="timeline-controls">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative block flex-1">
              <span className="sr-only">{t.search}</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.placeholder}
                className="theme-surface min-h-[44px] w-full rounded-lg border px-3 text-sm"
                style={{ borderColor: "var(--border-strong)" }}
              />
            </label>
            <div role="group" aria-label={t.levelHelp} className="flex flex-wrap gap-2">
              {(Object.keys(t.levels) as Level[]).map((key) => (
                <button key={key} type="button" aria-pressed={level === key} onClick={() => setLevel(key)} className="section-tab min-h-[44px] !text-[13px] !tracking-[0.02em] !normal-case">
                  {t.levels[key]} <span className="opacity-70">({levelCounts[key].toLocaleString(locale === "bn" ? "bn-BD" : "en-US")})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
        <div className="sticky top-[4.4rem] z-30 -mx-3 mt-4 border-b px-3 py-2 backdrop-blur-md sm:-mx-4 sm:px-4 md:-mx-8 md:px-8" style={{ background: "var(--header)", borderColor: "var(--border)" }}>
        <nav aria-label={t.eras}>
          <ol ref={navRef} className="flex gap-2 no-scrollbar overflow-x-auto pb-1">
            {eras.map((era) => {
              const count = filtered.filter((event) => event.periodId === era.id).length;
              const isActive = active === era.id;
              return (
                <li key={era.id} className="shrink-0" data-chip={era.id}>
                  <a
                    href={`#era-${era.id}`}
                    aria-current={isActive ? "true" : undefined}
                    aria-disabled={count === 0}
                    className={`flex min-h-[44px] flex-col justify-center rounded-lg border border-b-[3px] px-3 text-left transition-[background-color,opacity] duration-200 ${count === 0 ? "pointer-events-none opacity-35" : ""} ${isActive ? "bg-[color:var(--ink)] text-[color:var(--paper)]" : "hover:bg-[color:var(--surface)]"}`}
                    style={{ borderBottomColor: era.themeColor, borderColor: isActive ? "var(--ink)" : "var(--border)" }}
                  >
                    <span className="whitespace-nowrap text-[13px] font-semibold leading-tight">{era.title}</span>
                    <span className="whitespace-nowrap text-xs leading-tight opacity-75">
                      {era.startYear}–{era.endYear}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      <p className="theme-muted mt-5 flex flex-wrap items-center gap-x-4 text-sm" aria-live="polite">
        <span>{t.results(filtered.length, events.length)}</span>
        {hasFilters ? (
          <button type="button" onClick={reset} className="link-underline min-h-[44px] font-semibold text-accent">
            {t.reset}
          </button>
        ) : null}
      </p>

      {groups.length === 0 ? (
        <div className="theme-surface mt-4 rounded-xl border p-6 text-sm">
          <p>{t.none}</p>
        </div>
      ) : (
        <div className="mt-6 space-y-16 md:space-y-24">
          {groups.map(({ era, items }) => (
            <section key={era.id} id={`era-${era.id}`} data-era-section={era.id} aria-labelledby={`era-title-${era.id}`} className="scroll-mt-44">
              <header className="mb-8 md:ml-44">
                <p className="text-eyebrow" style={{ color: era.themeColor === "var(--sepia)" ? undefined : era.themeColor }}>
                  {era.startYear ? `${era.startYear}–${era.endYear}` : ""}
                </p>
                <h2 id={`era-title-${era.id}`} className="text-display mt-1 text-3xl font-semibold md:text-4xl">
                  {era.title}
                </h2>
                {era.description && !/^[\d০-৯]/.test(era.description) ? <p className="theme-muted mt-2 max-w-2xl text-sm leading-relaxed md:text-base">{era.description}</p> : null}
                <p className="text-eyebrow mt-3">{t.chapters(items.length)}</p>
              </header>
              <ol className="relative ml-1 space-y-3 border-l-2 pl-6 md:ml-44 md:pl-8" style={{ borderColor: era.themeColor }}>
                {items.map((entry) => (
                  <Entry key={entry.slug} entry={entry} locale={locale} color={era.themeColor} />
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
