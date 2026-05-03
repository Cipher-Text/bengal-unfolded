"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale, TimelineItem, TimelineType } from "@/types/content";
import type { EventResource } from "@/types/content";

const INITIAL_ITEMS = 8;
const LOAD_MORE_STEP = 8;

const TYPE_LABELS: Record<Locale, Record<TimelineType, string>> = {
  en: {
    judicial_event: "Judicial Event",
    protest_start: "Protest Start",
    movement_escalation: "Escalation",
    nationwide_movement: "Nationwide Movement",
    violence: "Violence",
    state_crackdown: "State Crackdown",
    peak_conflict: "Peak Conflict",
    policy_change: "Policy Change",
    policy_implementation: "Policy Implementation",
    movement_shift: "Movement Shift",
    political_crisis: "Political Crisis",
  },
  bn: {
    judicial_event: "বিচারিক ঘটনা",
    protest_start: "আন্দোলন শুরু",
    movement_escalation: "আন্দোলন তীব্রতা",
    nationwide_movement: "দেশব্যাপী আন্দোলন",
    violence: "সহিংসতা",
    state_crackdown: "রাষ্ট্রীয় দমন",
    peak_conflict: "চূড়ান্ত সংঘর্ষ",
    policy_change: "নীতিগত পরিবর্তন",
    policy_implementation: "নীতি বাস্তবায়ন",
    movement_shift: "আন্দোলনের রূপান্তর",
    political_crisis: "রাজনৈতিক সংকট",
  },
};
const QUALITY_LABELS = {
  en: { primary: "Primary", secondary: "Secondary", archive: "Archive", editorial: "Editorial" },
  bn: { primary: "প্রাথমিক", secondary: "গৌণ", archive: "আর্কাইভ", editorial: "সম্পাদকীয়" },
} as const;
const EVIDENCE_LABELS = {
  en: { label: "Evidence", high: "High", medium: "Medium", low: "Low" },
  bn: { label: "প্রমাণের শক্তি", high: "উচ্চ", medium: "মাঝারি", low: "নিম্ন" },
} as const;

function citationAnchorId(itemKey: string, sourceId: string): string {
  return `src-${itemKey}-${sourceId}`.replace(/[^a-zA-Z0-9-_]/g, "-");
}

export function EventTimeline({
  items,
  locale = "en",
  resources = [],
}: {
  items: TimelineItem[];
  locale?: Locale;
  resources?: EventResource[];
}) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_ITEMS);
  const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount]);
  const resourceById = useMemo(() => new Map(resources.map((resource) => [resource.id, resource] as const)), [resources]);
  const hasMore = visibleCount < items.length;
  const detailsLabel = locale === "bn" ? "বিস্তারিত" : "Details";
  const showMoreLabel = locale === "bn" ? "আরও দেখুন" : "Show more";
  const sourcesLabel = locale === "bn" ? "উৎস" : "Sources";
  const evidenceLabels = EVIDENCE_LABELS[locale];

  return (
    <div className="relative pl-6">
      <div className="theme-border absolute top-0 left-2.5 h-full w-px border-l" />
      <div className="space-y-6">
        {visibleItems.map((item, index) => (
          <article key={`${item.year}-${item.title}`} className={`group theme-surface relative rounded-xl border p-4 transition-transform duration-200 hover:-translate-y-0.5 md:p-5 ${item.emphasis === "peak" ? "md:p-7 md:rounded-2xl" : ""} animate-fade-slide-up`} style={{ borderColor: `${item.themeColor ?? "#d8b166"}55`, boxShadow: `0 0 0 1px ${item.themeColor ?? "#d8b166"}14, 0 14px 36px ${item.themeColor ?? "#d8b166"}22`, animationDelay: `${index * 80}ms` }}>
            <span className="absolute top-5 -left-[1.07rem] h-3 w-3 rounded-full transition-transform duration-300 group-hover:scale-125" style={{ backgroundColor: item.themeColor ?? "#d8b166" }} />
            <div className="flex flex-wrap items-center gap-2">
              <p className="theme-muted text-xs tracking-[0.2em] uppercase">{item.year}</p>
              {item.phaseLabel ? <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium" style={{ borderColor: `${item.themeColor ?? "#d8b166"}66`, color: item.themeColor ?? "#d8b166" }}>{item.phaseLabel}</span> : null}
              {item.type ? <span className="rounded-full border border-amber-500/40 px-2 py-0.5 text-[10px] font-medium text-accent">{TYPE_LABELS[locale][item.type]}</span> : null}
              {item.evidenceLevel ? <span className="rounded-full border border-emerald-500/40 px-2 py-0.5 text-[10px] font-medium text-emerald-300">{evidenceLabels.label}: {evidenceLabels[item.evidenceLevel]}</span> : null}
            </div>
            <div className="mt-1 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-start">
              <h3 className={`font-semibold ${item.emphasis === "peak" ? "text-xl md:text-2xl" : "text-lg"}`}>{item.title}</h3>
              {item.href ? (
                <Link href={item.href} className="inline-flex min-h-[44px] w-full items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors hover:text-white sm:w-auto sm:shrink-0" style={{ borderColor: `${item.themeColor ?? "#d8b166"}88`, color: item.themeColor ?? "#d8b166", backgroundColor: "transparent" }}>
                  {item.ctaLabel ?? detailsLabel}
                </Link>
              ) : null}
            </div>
            <p className={`theme-muted mt-2 ${item.emphasis === "peak" ? "text-base" : "text-sm"}`}>
              {item.detail}
              {item.sourceIds?.length ? (
                <span className="ml-1 inline-flex flex-wrap items-center gap-1 align-baseline">
                  {item.sourceIds.map((sourceId, citationIndex) => {
                    const itemKey = `${item.year}-${item.title}`;
                    const anchorId = citationAnchorId(itemKey, sourceId);
                    return (
                      <a
                        key={`${itemKey}-cite-${sourceId}`}
                        href={`#${anchorId}`}
                        className="text-[11px] font-medium text-accent underline-offset-2 hover:underline"
                        aria-label={`${sourcesLabel} ${citationIndex + 1}`}
                      >
                        [{citationIndex + 1}]
                      </a>
                    );
                  })}
                </span>
              ) : null}
            </p>
            {item.sourceIds?.length ? (
              <div className="mt-3">
                <p className="theme-muted text-xs">{sourcesLabel}</p>
                <div className="mt-1 flex flex-wrap gap-2">
                  {item.sourceIds.map((sourceId, citationIndex) => {
                    const resource = resourceById.get(sourceId);
                    const label = resource?.title || sourceId;
                    const itemKey = `${item.year}-${item.title}`;
                    const anchorId = citationAnchorId(itemKey, sourceId);
                    if (resource?.href) {
                      return (
                        <a
                          key={`${item.year}-${item.title}-${sourceId}`}
                          id={anchorId}
                          href={resource.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-full border border-amber-500/40 px-2 py-0.5 text-[11px] text-accent hover:bg-amber-500/10"
                        >
                          [{citationIndex + 1}] {label}
                          {resource.quality ? <span className="ml-1 rounded-full border border-amber-500/35 px-1 py-0 text-[10px]">{QUALITY_LABELS[locale][resource.quality]}</span> : null}
                        </a>
                      );
                    }
                    return (
                      <span
                        key={`${item.year}-${item.title}-${sourceId}`}
                        id={anchorId}
                        className="inline-flex items-center rounded-full border border-amber-500/30 px-2 py-0.5 text-[11px] theme-muted"
                      >
                        [{citationIndex + 1}] {label}
                        {resource?.quality ? <span className="ml-1 rounded-full border border-amber-500/35 px-1 py-0 text-[10px]">{QUALITY_LABELS[locale][resource.quality]}</span> : null}
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </article>
        ))}
      </div>
      {hasMore ? (
        <div className="mt-6">
          <button
            type="button"
            aria-expanded={!hasMore}
            onClick={() => setVisibleCount((count) => Math.min(count + LOAD_MORE_STEP, items.length))}
            className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm font-medium text-accent hover:bg-amber-500/10"
          >
            {showMoreLabel}
          </button>
        </div>
      ) : null}
    </div>
  );
}
