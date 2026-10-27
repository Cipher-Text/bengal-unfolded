"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { FigureProfileCard } from "@/components/FigureProfileCard";
import { SectionTitle } from "@/components/SectionTitle";
import { inferFigureEntityType, type FigureEntityType } from "@/lib/figures";
import type { Figure, Locale } from "@/types/content";

const groups: Figure["group"][] = ["leader", "coordinator", "martyr", "organization", "collective", "intellectual", "revolutionary"];
const entities: FigureEntityType[] = ["person", "party", "alliance", "organization"];
const norm = (value: string) => value.trim().toLocaleLowerCase();

export function FigureDirectoryInteractive({ figures, locale }: { figures: Figure[]; locale: Locale }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const isBn = locale === "bn";
  const query = params.get("q") ?? "";
  const entity = params.get("entity") ?? "";
  const group = params.get("group") ?? "";
  const page = Math.max(1, Number.parseInt(params.get("page") ?? "1", 10) || 1);
  const [draft, setDraft] = useState({ q: query, entity, group });
  useEffect(() => {
    const syncFromHistory = () => {
      const current = new URLSearchParams(window.location.search);
      setDraft({ q: current.get("q") ?? "", entity: current.get("entity") ?? "", group: current.get("group") ?? "" });
    };
    window.addEventListener("popstate", syncFromHistory);
    return () => window.removeEventListener("popstate", syncFromHistory);
  }, [params]);
  useEffect(() => {
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (params.size > 0) {
      if (!robots) { robots = document.createElement("meta"); robots.name = "robots"; document.head.appendChild(robots); }
      robots.content = "noindex,follow";
    } else if (robots?.content === "noindex,follow") robots.remove();
  }, [params]);
  const filtered = useMemo(() => figures.filter((figure) => {
    const matchesQuery = !norm(query) || [figure.name, figure.name_en, figure.role, figure.contribution, figure.context, figure.impact, ...(figure.tags ?? []), ...(figure.alternateNames ?? []), ...(figure.searchAliases ?? [])].some((value) => norm(value ?? "").includes(norm(query)));
    return matchesQuery && (!entities.includes(entity as FigureEntityType) || inferFigureEntityType(figure) === entity) && (!groups.includes(group as Figure["group"]) || figure.group === group);
  }), [figures, query, entity, group]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / 20));
  const safePage = Math.min(page, pageCount);
  const shown = filtered.slice((safePage - 1) * 20, safePage * 20);
  function update(next: Record<string, string | number | undefined>, replace = false) {
    const nextParams = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) nextParams.set(key, String(value));
      else nextParams.delete(key);
    }
    const url = `${pathname}${nextParams.size ? `?${nextParams}` : ""}`;
    if (replace) window.history.replaceState(null, "", url);
    else window.history.pushState(null, "", url);
  }
  function submit(event: React.FormEvent) { event.preventDefault(); update({ q: draft.q.trim() || undefined, entity: draft.entity || undefined, group: draft.group || undefined, page: undefined }); }
  const label = (en: string, bn: string) => isBn ? bn : en;
  return <>
    <section className="theme-surface rounded-2xl border p-5 md:p-6">
      <SectionTitle title={label("Filters and Search", "ফিল্টার ও সার্চ")} subtitle={label("Filter by keyword, entity type, and role group", "কিওয়ার্ড, সত্তার ধরন ও ভূমিকা দিয়ে তালিকা বাছাই করুন")} />
      <form className="mt-4 grid gap-3 md:grid-cols-[1fr_190px_220px_auto]" onSubmit={submit}>
        <input name="q" value={draft.q} onChange={(e) => setDraft({ ...draft, q: e.target.value })} placeholder={label("Search name, role, or tag", "নাম, ভূমিকা বা ট্যাগ")} className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm" />
        <select name="entity" value={draft.entity} onChange={(e) => setDraft({ ...draft, entity: e.target.value })} className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm"><option value="">{label("All entities", "সব সত্তা")}</option><option value="person">{label("Person", "ব্যক্তি")}</option><option value="party">{label("Party", "দল")}</option><option value="alliance">{label("Alliance", "জোট")}</option><option value="organization">{label("Organization", "সংস্থা")}</option></select>
        <select name="group" value={draft.group} onChange={(e) => setDraft({ ...draft, group: e.target.value })} className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm"><option value="">{label("All groups", "সব গ্রুপ")}</option>{groups.map((item) => <option key={item} value={item}>{item}</option>)}</select>
        <button type="submit" className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-amber-500/40 px-4 text-sm font-medium text-accent">{label("Apply", "প্রয়োগ করুন")}</button>
      </form>
    </section>
    <div>
      <div className="flex items-center justify-between gap-3"><SectionTitle title={label("Figure Directory", "ব্যক্তিত্ব ডিরেক্টরি")} subtitle={`${filtered.length} ${label("profiles", "প্রোফাইল")}`} />{(query || entity || group) && <button onClick={() => { setDraft({ q: "", entity: "", group: "" }); update({ q: undefined, entity: undefined, group: undefined, page: undefined }); }} className="text-sm font-medium text-amber-400">{label("Reset filters", "ফিল্টার রিসেট")}</button>}</div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">{shown.map((figure, index) => <FigureProfileCard key={figure.id} figure={figure} locale={locale} featured={index === 0 && safePage === 1} />)}</div>
      {!shown.length && <div className="theme-surface mt-4 rounded-xl border p-6 text-sm theme-muted">{label("No results found.", "কোনো ফলাফল পাওয়া যায়নি।")}</div>}
      <nav aria-label={label("Figure pages", "ব্যক্তিত্বের পাতা")} className="mt-6 flex items-center justify-between">{safePage > 1 ? <button onClick={() => update({ page: safePage - 1 })} className="min-h-[44px] rounded-lg border px-4">{label("Previous", "আগে")}</button> : <span/>}<p className="theme-muted text-sm">{label(`Page ${safePage} of ${pageCount}`, `পৃষ্ঠা ${safePage} / ${pageCount}`)}</p>{safePage < pageCount ? <button onClick={() => update({ page: safePage + 1 })} className="min-h-[44px] rounded-lg border px-4">{label("Next", "পরে")}</button> : <span/>}</nav>
    </div>
  </>;
}
