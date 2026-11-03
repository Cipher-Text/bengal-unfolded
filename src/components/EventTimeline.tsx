"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale, TimelineItem, TimelineTheme, TimelineType } from "@/types/content";
import type { EventResource } from "@/types/content";
import { renderGlossaryLinkedText } from "@/lib/glossary-linking";

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
    state_crackdown: "রাষ্ট্রীয় দমন",
    peak_conflict: "চূড়ান্ত সংঘর্ষ",
    policy_change: "নীতিগত পরিবর্তন",
    policy_implementation: "নীতি বাস্তবায়ন",
    movement_shift: "আন্দোলনের রূপান্তর",
    political_crisis: "রাজনৈতিক সংকট",
  },
};
const QUALITY_LABELS = {
  en: { primary: "Primary", secondary: "Secondary", archive: "Archive", editorial: "Editorial" },
  bn: { primary: "প্রাথমিক", secondary: "গৌণ", archive: "আর্কাইভ", editorial: "সম্পাদকীয়" },
} as const;
const EVIDENCE_LABELS = {
  en: { label: "Evidence", high: "High", medium: "Medium", low: "Low" },
  bn: { label: "প্রমাণের শক্তি", high: "উচ্চ", medium: "মাঝারি", low: "নিম্ন" },
} as const;
const THEME_LABELS: Record<Locale, Record<TimelineTheme, string>> = {
  en: { language: "Language", democracy: "Democracy", war: "War", culture: "Culture", economy: "Economy" },
  bn: { language: "ভাষা", democracy: "গণতন্ত্র", war: "যুদ্ধ", culture: "সংস্কৃতি", economy: "অর্থনীতি" },
};

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
  const [selectedTheme, setSelectedTheme] = useState<TimelineTheme | "all">("all");

  const filteredItems = useMemo(
    () => (selectedTheme === "all" ? items : items.filter((item) => item.themes?.includes(selectedTheme))),
    [items, selectedTheme],
  );

  const resourceById = useMemo(() => new Map(resources.map((resource) => [resource.id, resource] as const)), [resources]);
  const readMoreLabel = locale === "bn" ? "সম্পূর্ণ পড়ুন" : "Read full report";
  const sourcesLabel = locale === "bn" ? "উৎস" : "Sources";
  const evidenceLabels = EVIDENCE_LABELS[locale];
  const allThemeLabel = locale === "bn" ? "সব থিম" : "All Themes";

  const availableThemes = useMemo(() => {
    const set = new Set<TimelineTheme>();
    for (const item of items) for (const theme of item.themes ?? []) set.add(theme);
    return Array.from(set);
  }, [items]);

  function renderDetail(item: TimelineItem) {
    const itemKey = `${item.year}-${item.title}`;
    return (
      <>
        {renderGlossaryLinkedText(item.detail, locale)}
        {item.sourceIds?.length ? (
          <span className="ml-1 inline-flex flex-wrap items-center gap-1 align-baseline">
            {item.sourceIds.map((sourceId, citationIndex) => {
              const anchorId = citationAnchorId(itemKey, sourceId);
              return (
                <a key={`${itemKey}-cite-${sourceId}`} href={`#${anchorId}`} className="citation-num" aria-label={`${sourcesLabel} ${citationIndex + 1}`}>
                  [{citationIndex + 1}]
                </a>
              );
            })}
          </span>
        ) : null}
      </>
    );
  }

  function renderSources(item: TimelineItem) {
    if (!item.sourceIds?.length) return null;
    const itemKey = `${item.year}-${item.title}`;
    return (
      <div className="mt-3 border-t pt-2" style={{ borderColor: "rgba(107,74,31,0.3)" }}>
        <p className="byline mb-1">{sourcesLabel}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {item.sourceIds.map((sourceId, citationIndex) => {
            const resource = resourceById.get(sourceId);
            const label = resource?.title || sourceId;
            const anchorId = citationAnchorId(itemKey, sourceId);
            const quality = resource?.quality ? <span style={{ opacity: 0.7 }}>· {QUALITY_LABELS[locale][resource.quality]}</span> : null;
            if (resource?.href) {
              return (
                <a key={`${itemKey}-${sourceId}`} id={anchorId} href={resource.href} target="_blank" rel="noopener noreferrer" className="citation">
                  <span className="citation-num">[{citationIndex + 1}]</span>
                  <span>{label}</span>
                  {quality}
                </a>
              );
            }
            return (
              <span key={`${itemKey}-${sourceId}`} id={anchorId} className="citation">
                <span className="citation-num">[{citationIndex + 1}]</span>
                <span>{label}</span>
                {quality}
              </span>
            );
          })}
        </div>
      </div>
    );
  }

  function renderTags(item: TimelineItem) {
    return (
      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
        {item.phaseLabel ? (
          <span className="byline" style={{ color: item.themeColor ?? "var(--rust)" }}>⋄ {item.phaseLabel}</span>
        ) : null}
        {item.type ? <span className="byline">⋄ {TYPE_LABELS[locale][item.type]}</span> : null}
        {item.evidenceLevel ? (
          <span className="byline" style={{ color: "var(--forest)" }}>
            ⋄ {evidenceLabels.label}: {evidenceLabels[item.evidenceLevel]}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      {availableThemes.length ? (
        <div className="mb-5 flex flex-wrap items-center gap-2" role="group" aria-label={locale === "bn" ? "থিম অনুযায়ী ফিল্টার" : "Filter by theme"}>
          <button type="button" aria-pressed={selectedTheme === "all"} onClick={() => setSelectedTheme("all")} className="section-tab">
            {allThemeLabel}
          </button>
          {availableThemes.map((theme) => (
            <button key={theme} type="button" aria-pressed={selectedTheme === theme} onClick={() => setSelectedTheme(theme)} className="section-tab">
              {THEME_LABELS[locale][theme]}
            </button>
          ))}
        </div>
      ) : null}

      <ol className="relative space-y-6 border-l-2 pl-5 sm:pl-8" style={{ borderColor: "var(--sepia)" }}>
        {filteredItems.map((item) => (
          <li key={`${item.year}-${item.title}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[1.72rem] top-2 h-3 w-3 rounded-full border-2 sm:-left-[2.45rem]"
              style={{ borderColor: "var(--sepia)", background: item.themeColor ?? "var(--rust)" }}
            />
            <article className="theme-surface rounded-2xl border p-4 sm:p-5">
              <p className="text-eyebrow">{item.year}</p>
              <h3 className="font-display mt-1 text-xl font-semibold leading-snug sm:text-2xl">{item.title}</h3>
              {renderTags(item)}
              <p className="mt-3 text-base leading-relaxed">{renderDetail(item)}</p>
              {item.href ? (
                <Link href={item.href} className="btn-ink mt-3">
                  {item.ctaLabel ?? readMoreLabel}
                  <span className="arrow">→</span>
                </Link>
              ) : null}
              {renderSources(item)}
            </article>
          </li>
        ))}
      </ol>
    </div>
  );
}
