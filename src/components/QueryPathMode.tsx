"use client";

import Link from "next/link";
import { pushSearchParams, useUrlSearchParams } from "@/lib/use-url-search-params";
import type { LearningPathSummary } from "@/lib/learning-paths";
import type { Locale } from "@/types/content";

// Only filters that actually separate the paths. "Student" and "Researcher" matched 15 and 17 of 17 paths, so they were dropped.
const FILTERS = ["beginner", "exam-prep"] as const;
type Filter = (typeof FILTERS)[number];

type Labels = { all: string; beginner: string; examPrep: string; available: string; steps: string; startsWith: string; open: string; none: string; filter: string };

export function QueryPathMode({ locale, paths, labels, startsWith }: { locale: Locale; paths: LearningPathSummary[]; labels: Labels; startsWith: Record<string, string> }) {
  const params = useUrlSearchParams();
  const candidate = params.get("mode") ?? "";
  const mode = (FILTERS as readonly string[]).includes(candidate) ? (candidate as Filter) : "";
  const filtered = mode ? paths.filter((path) => path.modes.includes(mode)) : paths;
  const filterLabel: Record<Filter, string> = { beginner: labels.beginner, "exam-prep": labels.examPrep };
  const fmt = (n: number) => n.toLocaleString(locale === "bn" ? "bn-BD" : "en-US");
  const chipClass = (active: boolean) =>
    `section-tab inline-flex min-h-[44px] items-center !text-[13px] !tracking-[0.02em] !normal-case ${active ? "" : ""}`;

  return (
    <>
      <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={!mode} className={chipClass(!mode)} onClick={() => pushSearchParams(`/${locale}/paths/`, new URLSearchParams())}>
          {labels.all} ({fmt(paths.length)})
        </button>
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={mode === item}
            className={chipClass(mode === item)}
            onClick={() => pushSearchParams(`/${locale}/paths/`, new URLSearchParams({ mode: item }))}
          >
            {filterLabel[item]} ({fmt(paths.filter((path) => path.modes.includes(item)).length)})
          </button>
        ))}
      </div>

      <section className="mt-8" aria-labelledby="paths-list">
        <h2 id="paths-list" className="text-eyebrow">
          {labels.available}
        </h2>
        {filtered.length ? (
          <ol className="mt-5 grid gap-4 md:grid-cols-2">
            {filtered.map((path) => {
              const number = paths.indexOf(path) + 1;
              return (
                <li key={path.slug}>
                  <Link href={`/${locale}/paths/${path.slug}`} className="theme-surface group flex h-full flex-col rounded-xl border p-5 hover:border-[color:var(--gold)]">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-display text-3xl font-semibold text-accent">{String(number).padStart(2, "0").replace(/\d/g, (d) => (locale === "bn" ? "০১২৩৪৫৬৭৮৯"[Number(d)] : d))}</span>
                      <span className="text-eyebrow">
                        {fmt(path.stepCount)} {labels.steps}
                      </span>
                    </div>
                    <h3 className="text-display mt-3 text-xl font-semibold leading-snug group-hover:text-accent">{path.title}</h3>
                    <p className="theme-muted mt-2 line-clamp-3 flex-1 text-sm leading-relaxed">{path.tagline}</p>
                    {startsWith[path.slug] ? (
                      <p className="mt-4 text-sm">
                        <span className="text-eyebrow">{labels.startsWith}</span>
                        <br />
                        <span className="font-medium">{startsWith[path.slug]}</span>
                      </p>
                    ) : null}
                    <span className="link-underline mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent">
                      {labels.open} <span className="arrow ml-2">→</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
        ) : (
          <div className="theme-surface mt-4 rounded-xl border p-6 theme-muted">{labels.none}</div>
        )}
      </section>
    </>
  );
}
