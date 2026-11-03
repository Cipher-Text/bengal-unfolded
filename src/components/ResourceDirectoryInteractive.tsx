"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CATEGORY_LABELS, QUALITY_HELP, QUALITY_LABELS, RESOURCE_CATEGORIES, SOURCE_QUALITIES } from "@/lib/resource-labels";
import { pushSearchParams, replaceSearchParams, useUrlSearchParams } from "@/lib/use-url-search-params";
import type { Locale, ResourceCategory, SourceQuality } from "@/types/content";

export type ResourceListItem = {
  id: string;
  title: string;
  attribution: string;
  category: ResourceCategory;
  subcategory: string;
  quality?: SourceQuality;
  excerpt: string;
  /** External link, when the record has one. */
  href?: string;
  search: string;
};

const PAGE = 40;

const copy = {
  en: {
    search: "Search sources",
    placeholder: "Search by title, author or topic",
    category: "Type",
    quality: "Reliability",
    qualityNote: "How we classify a source",
    all: "All",
    results: (n: number) => `${n} sources`,
    reset: "Clear search and filters",
    more: (n: number) => `Show ${n} more`,
    none: "No sources match. Try a different word or clear the filters.",
    open: "Open source",
    noLink: "No online link recorded",
    page: "Source page",
  },
  bn: {
    search: "সূত্র খুঁজুন",
    placeholder: "শিরোনাম, লেখক বা বিষয় লিখুন",
    category: "ধরন",
    quality: "নির্ভরযোগ্যতা",
    qualityNote: "সূত্র কীভাবে শ্রেণিবদ্ধ করা হয়",
    all: "সব",
    results: (n: number) => `${n.toLocaleString("bn-BD")}টি সূত্র`,
    reset: "খোঁজ ও ফিল্টার মুছুন",
    more: (n: number) => `আরও ${n.toLocaleString("bn-BD")}টি দেখুন`,
    none: "কোনো সূত্র মেলেনি। অন্য শব্দ চেষ্টা করুন বা ফিল্টার মুছুন।",
    open: "সূত্রটি খুলুন",
    noLink: "অনলাইন লিংক নেই",
    page: "সূত্রের পাতা",
  },
} as const;

const norm = (value: string) => value.trim().toLocaleLowerCase();

export function ResourceDirectoryInteractive({ resources, locale }: { resources: ResourceListItem[]; locale: Locale }) {
  const t = copy[locale];
  const params = useUrlSearchParams();
  const query = params.get("q") ?? "";
  const categoryParam = params.get("category") ?? "";
  const qualityParam = params.get("quality") ?? "";
  const category = (RESOURCE_CATEGORIES as string[]).includes(categoryParam) ? (categoryParam as ResourceCategory) : "";
  const quality = (SOURCE_QUALITIES as string[]).includes(qualityParam) ? (qualityParam as SourceQuality) : "";
  const [limit, setLimit] = useState(PAGE);
  const [typed, setTyped] = useState<string | null>(null);
  const fmt = (n: number) => n.toLocaleString(locale === "bn" ? "bn-BD" : "en-US");

  // Filtered views are not separate pages; keep them out of search indexes.
  useEffect(() => {
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (params.size > 0) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.name = "robots";
        document.head.appendChild(robots);
      }
      robots.content = "noindex,follow";
    } else if (robots?.content === "noindex,follow") robots.remove();
  }, [params]);

  const setParam = (key: "q" | "category" | "quality", value: string, replace = false) => {
    const next = new URLSearchParams(window.location.search);
    if (value) next.set(key, value);
    else next.delete(key);
    setLimit(PAGE);
    (replace ? replaceSearchParams : pushSearchParams)(window.location.pathname, next);
  };

  const matches = (item: ResourceListItem, skip?: "category" | "quality") =>
    (!norm(query) || item.search.includes(norm(query))) && (skip === "category" || !category || item.category === category) && (skip === "quality" || !quality || item.quality === quality);

  const filtered = useMemo(() => resources.filter((item) => matches(item)), [resources, query, category, quality]); // eslint-disable-line react-hooks/exhaustive-deps
  const count = (key: "category" | "quality", value: string) => resources.filter((item) => matches(item, key) && item[key] === value).length;
  const shown = filtered.slice(0, limit);
  const categories = RESOURCE_CATEGORIES.filter((item) => resources.some((resource) => resource.category === item));
  const hasFilters = Boolean(query || category || quality);

  const chip = (key: string, active: boolean, label: string, n: number, onClick: () => void) => (
    <button key={key} type="button" aria-pressed={active} disabled={n === 0 && !active} onClick={onClick} className="section-tab min-h-[44px] !text-[13px] !tracking-[0.02em] !normal-case disabled:cursor-not-allowed disabled:opacity-40">
      {label} <span className="opacity-70">({fmt(n)})</span>
    </button>
  );

  return (
    <div>
      <div className="space-y-4">
        <label className="block">
          <span className="sr-only">{t.search}</span>
          <input
            type="search"
            value={typed ?? query}
            onChange={(event) => {
              setTyped(event.target.value);
              setParam("q", event.target.value.trim(), true);
            }}
            placeholder={t.placeholder}
            className="theme-surface min-h-[48px] w-full rounded-lg border px-4 text-base"
            style={{ borderColor: "var(--border-strong)" }}
          />
        </label>
        <div role="group" aria-label={t.quality} className="flex flex-wrap items-center gap-2">
          <span className="text-eyebrow mr-1">{t.quality}</span>
          {chip("all-q", !quality, t.all, resources.filter((item) => matches(item, "quality")).length, () => setParam("quality", ""))}
          {SOURCE_QUALITIES.map((item) => chip(item, quality === item, QUALITY_LABELS[locale][item], count("quality", item), () => setParam("quality", item)))}
        </div>
        <dl className="grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2 lg:grid-cols-4" aria-label={t.qualityNote}>
          {SOURCE_QUALITIES.map((item) => (
            <div key={item} className="flex gap-2">
              <dt className="font-semibold">{QUALITY_LABELS[locale][item]}</dt>
              <dd className="theme-muted">{QUALITY_HELP[locale][item]}</dd>
            </div>
          ))}
        </dl>
        <div role="group" aria-label={t.category} className="flex flex-wrap items-center gap-2">
          <span className="text-eyebrow mr-1">{t.category}</span>
          {chip("all-c", !category, t.all, resources.filter((item) => matches(item, "category")).length, () => setParam("category", ""))}
          {categories.map((item) => chip(item, category === item, CATEGORY_LABELS[locale][item], count("category", item), () => setParam("category", item)))}
        </div>
      </div>

      <p className="theme-muted mt-6 flex flex-wrap items-center gap-x-4 text-sm" aria-live="polite">
        <span>{t.results(filtered.length)}</span>
        {hasFilters ? (
          <button
            type="button"
            className="link-underline min-h-[44px] font-semibold text-accent"
            onClick={() => {
              setTyped("");
              setLimit(PAGE);
              pushSearchParams(window.location.pathname, new URLSearchParams());
            }}
          >
            {t.reset}
          </button>
        ) : null}
      </p>

      {shown.length ? (
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {shown.map((item) => (
            <li key={item.id} className="theme-surface flex flex-col rounded-xl border p-4">
              <p className="text-eyebrow">
                {CATEGORY_LABELS[locale][item.category]}
                {item.quality ? ` · ${QUALITY_LABELS[locale][item.quality]}` : ""}
              </p>
              <h3 className="text-display mt-1.5 text-lg font-semibold leading-snug">
                <Link prefetch={false} href={`/${locale}/resources/${item.id}`} className="hover:text-accent">
                  {item.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm font-medium" style={{ color: "var(--rust)" }}>{item.attribution}</p>
              {item.excerpt ? <p className="theme-muted mt-2 line-clamp-2 flex-1 text-sm leading-relaxed">{item.excerpt}</p> : <div className="flex-1" />}
              <p className="mt-3 flex flex-wrap items-center gap-x-5 text-sm">
                <Link prefetch={false} href={`/${locale}/resources/${item.id}`} className="link-underline inline-flex min-h-[44px] items-center font-semibold text-accent">
                  {t.page} <span className="arrow ml-1.5">→</span>
                </Link>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex min-h-[44px] items-center font-semibold text-accent">
                    {t.open} <span aria-hidden="true" className="ml-1.5">↗</span>
                  </a>
                ) : (
                  <span className="theme-muted">{t.noLink}</span>
                )}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="theme-surface mt-4 rounded-xl border p-6 text-sm">{t.none}</div>
      )}

      {filtered.length > shown.length ? (
        <div className="mt-8 text-center">
          <button type="button" className="btn-vintage" onClick={() => setLimit((current) => current + PAGE)}>
            {t.more(Math.min(PAGE, filtered.length - shown.length))}
          </button>
        </div>
      ) : null}
    </div>
  );
}
