"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { pushSearchParams, replaceSearchParams, useUrlSearchParams } from "@/lib/use-url-search-params";
import type { FigureEntityType } from "@/lib/figures";
import type { Figure, Locale } from "@/types/content";

export type FigureListItem = {
  id: string;
  name: string;
  role: string;
  group: Figure["group"];
  entity: FigureEntityType;
  /** Real portrait only; placeholder cards are filtered out on the server. */
  image?: string;
  period?: string;
  excerpt: string;
  search: string;
};

const PAGE = 48;
const GROUPS: Figure["group"][] = ["leader", "coordinator", "martyr", "intellectual", "organization", "collective", "revolutionary"];
const ENTITIES: FigureEntityType[] = ["person", "party", "alliance", "organization"];

const copy = {
  en: {
    search: "Search people and groups",
    placeholder: "Search by name, role or keyword",
    entityLabel: "Type",
    roleLabel: "Role",
    all: "All",
    entities: { person: "People", party: "Parties", alliance: "Alliances", organization: "Organizations" },
    groups: { leader: "Leaders", coordinator: "Coordinators", martyr: "Martyrs", intellectual: "Intellectuals", organization: "Organizations", collective: "Collectives", revolutionary: "Revolutionaries" },
    results: (n: number) => `${n} profiles`,
    reset: "Clear search and filters",
    more: (n: number) => `Show ${n} more`,
    none: "No profiles match. Try a different word or clear the filters.",
    details: "Read profile",
  },
  bn: {
    search: "ব্যক্তি ও সংগঠন খুঁজুন",
    placeholder: "নাম, ভূমিকা বা শব্দ লিখুন",
    entityLabel: "ধরন",
    roleLabel: "ভূমিকা",
    all: "সব",
    entities: { person: "ব্যক্তি", party: "দল", alliance: "জোট", organization: "সংস্থা" },
    groups: { leader: "নেতৃত্ব", coordinator: "সমন্বয়ক", martyr: "শহীদ", intellectual: "বুদ্ধিজীবী", organization: "সংগঠন", collective: "সম্মিলিত কণ্ঠ", revolutionary: "বিপ্লবী" },
    results: (n: number) => `${n.toLocaleString("bn-BD")}টি প্রোফাইল`,
    reset: "খোঁজ ও ফিল্টার মুছুন",
    more: (n: number) => `আরও ${n.toLocaleString("bn-BD")}টি দেখুন`,
    none: "কোনো প্রোফাইল মেলেনি। অন্য শব্দ চেষ্টা করুন বা ফিল্টার মুছুন।",
    details: "প্রোফাইল পড়ুন",
  },
} as const;

const norm = (value: string) => value.trim().toLocaleLowerCase();

function Avatar({ item }: { item: FigureListItem }) {
  return (
    <div className="relative h-24 w-[4.5rem] shrink-0 overflow-hidden rounded-md" style={{ background: "var(--paper-aged)" }} aria-hidden={item.image ? undefined : true}>
      {item.image ? (
        <Image src={item.image} alt={item.name} fill sizes="72px" className="object-cover" />
      ) : (
        <span className="text-display flex h-full w-full items-center justify-center text-3xl font-semibold" style={{ color: "var(--sepia)" }}>
          {Array.from(item.name.replace(/^(Dr\.?|Prof\.?|Sheikh|Maulana|Mr\.?)\s+/i, ""))[0]}
        </span>
      )}
    </div>
  );
}

export function FigureDirectoryInteractive({ figures, locale }: { figures: FigureListItem[]; locale: Locale }) {
  const t = copy[locale];
  const params = useUrlSearchParams();
  const query = params.get("q") ?? "";
  const entityParam = params.get("entity") ?? "";
  const groupParam = params.get("group") ?? "";
  const entity = (ENTITIES as string[]).includes(entityParam) ? (entityParam as FigureEntityType) : "";
  const group = (GROUPS as string[]).includes(groupParam) ? (groupParam as Figure["group"]) : "";
  const [limit, setLimit] = useState(PAGE);
  const [typed, setTyped] = useState<string | null>(null);
  const shownQuery = typed ?? query;
  const fmt = (n: number) => n.toLocaleString(locale === "bn" ? "bn-BD" : "en-US");

  // Filtered views are not separate pages; keep them out of search indexes like before.
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

  const setParam = (key: "q" | "entity" | "group", value: string, replace = false) => {
    const next = new URLSearchParams(window.location.search);
    if (value) next.set(key, value);
    else next.delete(key);
    setLimit(PAGE);
    (replace ? replaceSearchParams : pushSearchParams)(window.location.pathname, next);
  };

  const matches = (item: FigureListItem, skip?: "entity" | "group") =>
    (!norm(query) || item.search.includes(norm(query))) && (skip === "entity" || !entity || item.entity === entity) && (skip === "group" || !group || item.group === group);

  const filtered = useMemo(() => figures.filter((item) => matches(item)), [figures, query, entity, group]); // eslint-disable-line react-hooks/exhaustive-deps
  const count = (key: "entity" | "group", value: string) => figures.filter((item) => matches(item, key) && item[key] === value).length;
  const shown = filtered.slice(0, limit);
  const hasFilters = Boolean(query || entity || group);

  const chip = (active: boolean, label: string, n: number, onClick: () => void, disabled = false) => (
    <button key={label} type="button" aria-pressed={active} disabled={disabled && !active} onClick={onClick} className="section-tab min-h-[44px] !text-[13px] !tracking-[0.02em] !normal-case disabled:cursor-not-allowed disabled:opacity-40">
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
            value={shownQuery}
            onChange={(event) => {
              setTyped(event.target.value);
              setParam("q", event.target.value.trim(), true);
            }}
            placeholder={t.placeholder}
            className="theme-surface min-h-[48px] w-full rounded-lg border px-4 text-base"
            style={{ borderColor: "var(--border-strong)" }}
          />
        </label>
        <div role="group" aria-label={t.entityLabel} className="flex flex-wrap items-center gap-2">
          <span className="text-eyebrow mr-1">{t.entityLabel}</span>
          {chip(!entity, t.all, figures.filter((item) => matches(item, "entity")).length, () => setParam("entity", ""))}
          {ENTITIES.map((item) => chip(entity === item, t.entities[item], count("entity", item), () => setParam("entity", item), count("entity", item) === 0))}
        </div>
        <div role="group" aria-label={t.roleLabel} className="flex flex-wrap items-center gap-2">
          <span className="text-eyebrow mr-1">{t.roleLabel}</span>
          {chip(!group, t.all, figures.filter((item) => matches(item, "group")).length, () => setParam("group", ""))}
          {GROUPS.map((item) => chip(group === item, t.groups[item], count("group", item), () => setParam("group", item), count("group", item) === 0))}
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
        <ul className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((item) => (
            <li key={item.id}>
              <Link href={`/${locale}/figures/${item.id}`} prefetch={false} className="theme-surface group flex h-full gap-3 rounded-xl border p-3 hover:border-[color:var(--gold)]">
                <Avatar item={item} />
                <div className="min-w-0 flex-1">
                  <h3 className="text-display text-lg font-semibold leading-snug group-hover:text-accent">{item.name}</h3>
                  <p className="text-eyebrow mt-1">{[item.period, t.groups[item.group]].filter(Boolean).join(" · ")}</p>
                  <p className="mt-1.5 line-clamp-2 text-sm font-medium" style={{ color: "var(--rust)" }}>{item.role}</p>
                  {item.excerpt ? <p className="theme-muted mt-1 line-clamp-2 text-sm leading-relaxed">{item.excerpt}</p> : null}
                </div>
              </Link>
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
