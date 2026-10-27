"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { FigureProfileCard } from "@/components/FigureProfileCard";
import { SectionTitle } from "@/components/SectionTitle";
import type { Figure, Locale } from "@/types/content";

export function EventFiguresPagination({ figures, locale }: { figures: Figure[]; locale: Locale }) {
  const params = useSearchParams();
  const pathname = usePathname();
  const raw = Number(params.get("page") ?? 1);
  const requested = Number.isFinite(raw) && raw > 0 ? Math.floor(raw) : 1;
  const pageCount = Math.max(1, Math.ceil(figures.length / 20));
  const page = Math.min(requested, pageCount);
  const start = (page - 1) * 20;
  const shown = figures.slice(start, start + 20);
  const bn = locale === "bn";
  const href = (next: number) => next <= 1 ? pathname : `${pathname}?page=${next}`;
  return <div>
    <SectionTitle title={bn ? "পূর্ণ ব্যক্তিত্ব তালিকা" : "Full Figure List"} subtitle={`${figures.length} ${bn ? "প্রোফাইল" : "profiles"}`} />
    <div className="mt-4 grid gap-4 md:grid-cols-2">{shown.map((figure, index) => <FigureProfileCard key={figure.id} figure={figure} locale={locale} featured={index === 0 && page === 1} />)}</div>
    <nav aria-label={bn ? "ব্যক্তিত্বের পাতা" : "Figure pages"} className="mt-6 flex items-center justify-between">
      {page > 1 ? <a href={href(page - 1)} className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent">{bn ? "আগে" : "Previous"}</a> : <span />}
      <p className="theme-muted text-sm">{bn ? `${page} / ${pageCount}` : `Page ${page} of ${pageCount}`}</p>
      {page < pageCount ? <a href={href(page + 1)} className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent">{bn ? "পরে" : "Next"}</a> : <span />}
    </nav>
  </div>;
}
