"use client";
import Link from "next/link";
import { forwardRef, useMemo, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import type { Locale, TimelineItem, TimelineTheme, TimelineType } from "@/types/content";
import type { EventResource } from "@/types/content";
import { renderGlossaryLinkedText } from "@/lib/glossary-linking";

const ITEMS_PER_PAGE = 1;

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

type Slot = "lead" | "mid-left" | "mid-right" | "brief";
const SLOT_PATTERN: Slot[] = ["lead", "mid-left", "mid-right", "brief"];

type NewspaperPageProps = { children: React.ReactNode; pageNumber?: number };
const NewspaperPage = forwardRef<HTMLDivElement, NewspaperPageProps>(function NewspaperPage(
  { children, pageNumber },
  ref,
) {
  return (
    <div ref={ref} className="newspaper-page paper paper-stained">
      <div className="newspaper-page-inner">
        {children}
        {pageNumber ? <p className="page-folio">— {pageNumber} —</p> : null}
      </div>
    </div>
  );
});

export function EventTimeline({
  items,
  locale = "en",
  resources = [],
}: {
  items: TimelineItem[];
  locale?: Locale;
  resources?: EventResource[];
}) {
  const bookRef = useRef<{ pageFlip: () => { flipNext: () => void; flipPrev: () => void; getCurrentPageIndex: () => number; getPageCount: () => number } } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
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
  const datelineCity = locale === "bn" ? "ঢাকা" : "DHAKA";

  const availableThemes = useMemo(() => {
    const set = new Set<TimelineTheme>();
    for (const item of items) for (const theme of item.themes ?? []) set.add(theme);
    return Array.from(set);
  }, [items]);

  // Group items into pages of ITEMS_PER_PAGE
  const itemPages = useMemo(() => {
    const groups: TimelineItem[][] = [];
    for (let i = 0; i < filteredItems.length; i += ITEMS_PER_PAGE) {
      groups.push(filteredItems.slice(i, i + ITEMS_PER_PAGE));
    }
    if (groups.length === 0) groups.push([]);
    return groups;
  }, [filteredItems]);

  const totalPages = itemPages.length + 1; // +1 cover

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
        <p className="byline mb-1">{locale === "bn" ? "আর্কাইভ থেকে" : "From the Archive"}</p>
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {item.sourceIds.map((sourceId, citationIndex) => {
            const resource = resourceById.get(sourceId);
            const label = resource?.title || sourceId;
            const anchorId = citationAnchorId(itemKey, sourceId);
            if (resource?.href) {
              return (
                <a key={`${itemKey}-${sourceId}`} id={anchorId} href={resource.href} target="_blank" rel="noopener noreferrer" className="citation">
                  <span className="citation-num">[{citationIndex + 1}]</span>
                  <span>{label}</span>
                  {resource.quality ? <span style={{ opacity: 0.7 }}>· {QUALITY_LABELS[locale][resource.quality]}</span> : null}
                </a>
              );
            }
            return (
              <span key={`${itemKey}-${sourceId}`} id={anchorId} className="citation">
                <span className="citation-num">[{citationIndex + 1}]</span>
                <span>{label}</span>
                {resource?.quality ? <span style={{ opacity: 0.7 }}>· {QUALITY_LABELS[locale][resource.quality]}</span> : null}
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

  function renderCta(item: TimelineItem) {
    if (!item.href) return null;
    return (
      <Link href={item.href} className="btn-ink mt-3">
        {item.ctaLabel ?? readMoreLabel}
        <span className="arrow">→</span>
      </Link>
    );
  }

  function renderArticle(item: TimelineItem, slotIndex: number) {
    const itemKey = `${item.year}-${item.title}`;
    const slot = SLOT_PATTERN[slotIndex] ?? "mid-left";

    if (slot === "lead") {
      return (
        <article key={itemKey} className="news-lead broadsheet-rule-right">
          <p className="dateline">{datelineCity}, {item.year}</p>
          <span className="byline">{locale === "bn" ? "নিজস্ব প্রতিবেদক" : "Bengal Unfolded Correspondent"}</span>
          <h3 className="headline headline-front mt-1.5">{item.title}</h3>
          {renderTags(item)}
          <p className="deck mt-3">{locale === "bn" ? "প্রধান প্রতিবেদন · প্রথম পৃষ্ঠা" : "LEAD · FRONT PAGE"}</p>
          <div className="mt-3">
            <div className="photo-cutline aspect-[16/8] w-full" />
            <p className="photo-caption">
              {locale === "bn" ? "ছবি · বঙ্গ সংরক্ষণাগার" : "Photo · Bengal Archives"} — {item.year}, {item.title}
            </p>
          </div>
          <div className="article-body column-2 mt-2">
            <p>{renderDetail(item)}</p>
          </div>
          {renderCta(item)}
          {renderSources(item)}
        </article>
      );
    }

    if (slot === "mid-left") {
      return (
        <article key={itemKey} className="news-quarter broadsheet-rule-right">
          <p className="dateline">{datelineCity}, {item.year}</p>
          <h3 className="headline headline-mid mt-1.5">{item.title}</h3>
          {renderTags(item)}
          <div className="article-body mt-2 text-[0.95rem]">
            <p>{renderDetail(item)}</p>
          </div>
          {renderCta(item)}
          {renderSources(item)}
        </article>
      );
    }

    if (slot === "mid-right") {
      return (
        <article key={itemKey} className="news-quarter broadsheet-rule-right">
          <p className="dateline">{datelineCity}, {item.year}</p>
          <h3 className="headline headline-mid mt-1.5">{item.title}</h3>
          {renderTags(item)}
          <div className="photo-cutline mt-3 aspect-[4/3] w-full" />
          <p className="photo-caption">{item.title}, {item.year}</p>
          <div className="article-body mt-2 text-[0.95rem]">
            <p>{renderDetail(item)}</p>
          </div>
          {renderCta(item)}
          {renderSources(item)}
        </article>
      );
    }

    return (
      <article key={itemKey} className="news-quarter">
        <div className="callout-box">
          <p className="byline mb-1">{locale === "bn" ? "সংক্ষিপ্ত" : "Brief"}</p>
          <p className="dateline">{datelineCity}, {item.year}</p>
          <h3 className="headline headline-side mt-1">{item.title}</h3>
          {renderTags(item)}
          <p className="article-body mt-2 text-[0.9rem]">{renderDetail(item)}</p>
          {renderCta(item)}
          {renderSources(item)}
        </div>
      </article>
    );
  }

  function flipNext() {
    bookRef.current?.pageFlip().flipNext();
  }
  function flipPrev() {
    bookRef.current?.pageFlip().flipPrev();
  }

  // Force remount HTMLFlipBook when theme filter changes (page count differs)
  const bookKey = `book-${selectedTheme}-${itemPages.length}`;

  return (
    <div className="newspaper-shell">
      {/* Section filter (outside flip-book) */}
      {availableThemes.length ? (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="byline mr-1">{locale === "bn" ? "সেকশন:" : "Sections:"}</span>
          <button type="button" aria-pressed={selectedTheme === "all"} onClick={() => { setSelectedTheme("all"); setCurrentPage(0); }} className="section-tab">
            {allThemeLabel}
          </button>
          {availableThemes.map((theme) => (
            <button key={theme} type="button" aria-pressed={selectedTheme === theme} onClick={() => { setSelectedTheme(theme); setCurrentPage(0); }} className="section-tab">
              {THEME_LABELS[locale][theme]}
            </button>
          ))}
        </div>
      ) : null}

      {/* The flipping newspaper */}
      <div className="flipbook-stage">
        <HTMLFlipBook
          key={bookKey}
          ref={bookRef}
          width={1100}
          height={1500}
          size="stretch"
          minWidth={280}
          maxWidth={1800}
          minHeight={400}
          maxHeight={2200}
          drawShadow
          flippingTime={1100}
          maxShadowOpacity={0.55}
          showCover={false}
          mobileScrollSupport
          usePortrait={true}
          startPage={0}
          startZIndex={0}
          autoSize={true}
          clickEventForward={false}
          useMouseEvents
          swipeDistance={30}
          showPageCorners
          disableFlipByClick={false}
          className="bengal-flipbook"
          style={{ width: "100%", margin: "0 auto" }}
          onFlip={(e: { data: number }) => setCurrentPage(e.data)}
        >
          {/* Content pages — one article per page */}
          {itemPages.map((group, pageIdx) => {
            const item = group[0];
            if (!item) return null;
            const pullSentence = item.detail
              ? (item.detail.split(/[.।]/)[1] || item.detail.split(/[.।]/)[0] || "").trim()
              : "";
            return (
              <NewspaperPage key={`page-${pageIdx}`} pageNumber={pageIdx + 1}>
                {/* Mini masthead */}
                <header className="masthead py-2">
                  <div className="masthead-rule">
                    <span>Vol. I · No. {String(pageIdx + 1).padStart(2, "0")}</span>
                    <span className="dotline" />
                    <span className="font-display font-bold text-base normal-case tracking-tight">
                      {locale === "bn" ? "বেঙ্গল আনফোল্ডেড" : "Bengal Unfolded"}
                    </span>
                    <span className="dotline" />
                    <span>{locale === "bn" ? `পৃষ্ঠা ${pageIdx + 1}` : `Page ${pageIdx + 1}`}</span>
                  </div>
                </header>

                <article className="mt-5">
                  <p className="dateline">{datelineCity}, {item.year}</p>
                  <span className="byline">{locale === "bn" ? "নিজস্ব প্রতিবেদক" : "Bengal Unfolded Correspondent"}</span>
                  <h3 className="headline headline-front mt-2">{item.title}</h3>
                  {renderTags(item)}
                  <p className="deck mt-3">
                    {item.phaseLabel
                      ? item.phaseLabel.toUpperCase()
                      : locale === "bn" ? "ঐতিহাসিক প্রতিবেদন" : "HISTORICAL REPORT"}
                  </p>

                  <div className="mt-5">
                    <div className="photo-cutline aspect-[16/9] w-full" />
                    <p className="photo-caption">
                      {locale === "bn" ? "ছবি · বঙ্গ সংরক্ষণাগার" : "Photo · Bengal Archives"} — {item.year}, {item.title}
                    </p>
                  </div>

                  <div className="article-body mt-5 max-w-3xl">
                    <p>{renderDetail(item)}</p>
                  </div>

                  {pullSentence ? (
                    <blockquote className="pull-quote mt-5">
                      “{pullSentence}.”
                      <span className="pull-quote-attr">
                        — {item.phaseLabel ?? (locale === "bn" ? "বেঙ্গল আনফোল্ডেড" : "Bengal Unfolded")}, {item.year}
                      </span>
                    </blockquote>
                  ) : null}

                  <div className="mt-5">{renderCta(item)}</div>
                  {renderSources(item)}
                </article>

                <div className="fleuron mt-7"><span aria-hidden="true">— ❦ ✦ ❦ —</span></div>

                {pageIdx === itemPages.length - 1 ? (
                  <p className="byline mt-4 text-center opacity-75">
                    {locale === "bn" ? "— সমাপ্ত —" : "— End of Issue —"}
                  </p>
                ) : null}
              </NewspaperPage>
            );
          })}

        </HTMLFlipBook>
      </div>

      {/* External nav controls */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-2">
        <button type="button" onClick={flipPrev} disabled={currentPage === 0} className="btn-vintage flex-1 justify-center sm:flex-none disabled:cursor-not-allowed disabled:opacity-40">
          <span className="arrow rotate-180 inline-block">→</span>
          {locale === "bn" ? "পূর্ববর্তী" : "Prev"}
        </button>
        <p className="byline order-last w-full text-center sm:order-none sm:w-auto">
          {locale === "bn" ? `পৃষ্ঠা ${currentPage + 1} / ${itemPages.length}` : `Page ${String(currentPage + 1).padStart(2, "0")} of ${String(itemPages.length).padStart(2, "0")}`}
        </p>
        <button type="button" onClick={flipNext} disabled={currentPage >= itemPages.length - 1} className="btn-ink flex-1 justify-center sm:flex-none disabled:cursor-not-allowed disabled:opacity-40">
          {locale === "bn" ? "পরবর্তী" : "Next"}
          <span className="arrow">→</span>
        </button>
      </div>
    </div>
  );
}
