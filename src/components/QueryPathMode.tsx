"use client";

import { useUrlSearchParams } from "@/lib/use-url-search-params";
import Link from "next/link";
import type { LearningPathMode, LearningPathSummary } from "@/lib/learning-paths";
import type { Locale } from "@/types/content";

const MODES: LearningPathMode[] = ["beginner", "student", "researcher", "exam-prep"];
const MODE_LABELS = {
  en: { beginner: "Beginner", student: "Student", researcher: "Researcher", "exam-prep": "Exam prep" },
  bn: { beginner: "শুরু", student: "শিক্ষার্থী", researcher: "গবেষক", "exam-prep": "পরীক্ষা প্রস্তুতি" },
} as const;

export function QueryPathMode({ locale, paths, labels }: { locale: Locale; paths: LearningPathSummary[]; labels: { all: string; available: string; steps: string; difficulty: string; open: string; none: string } }) {
  const params = useUrlSearchParams();
  const candidate = params.get("mode") ?? "";
  const mode = MODES.includes(candidate as LearningPathMode) ? candidate as LearningPathMode : "";
  const filtered = mode ? paths.filter((path) => path.modes.includes(mode)) : paths;
  return <>
    <div className="mt-4 flex flex-wrap gap-2">
      <Link href={`/${locale}/paths`} aria-pressed={!mode} className={`inline-flex min-h-[40px] items-center rounded-full border px-4 text-sm font-medium ${!mode ? "border-amber-500/60 text-accent" : "border-amber-500/25 theme-muted"} hover:bg-amber-500/10`}>{labels.all}</Link>
      {MODES.map((item) => <Link key={item} href={`/${locale}/paths?mode=${item}`} aria-pressed={mode === item} className={`inline-flex min-h-[40px] items-center rounded-full border px-4 text-sm font-medium ${mode === item ? "border-amber-500/60 text-accent" : "border-amber-500/25 theme-muted"} hover:bg-amber-500/10`}>{MODE_LABELS[locale][item]}</Link>)}
    </div>
    <section className="mt-8">
      <h2 className="text-xl font-semibold">{labels.available} <span className="theme-muted text-sm font-normal">{filtered.length} / {paths.length}</span></h2>
      {filtered.length ? <div className="mt-4 grid gap-4 md:grid-cols-2">{filtered.map((path) => <Link key={path.slug} href={`/${locale}/paths/${path.slug}`} className="theme-surface group rounded-xl border p-5 hover:border-amber-500/40"><div className="flex flex-wrap gap-2">{path.modes.map((item) => <span key={item} className="rounded-full border border-amber-500/30 px-2.5 py-1 text-[11px] font-medium text-accent">{MODE_LABELS[locale][item]}</span>)}</div><h3 className="mt-4 text-xl font-semibold">{path.title}</h3><p className="theme-muted mt-2 text-sm leading-relaxed">{path.description}</p><div className="mt-4 flex flex-wrap gap-4 text-sm"><span className="text-accent">{path.stepCount} {labels.steps}</span><span className="theme-muted">{labels.difficulty}: {path.difficulty}</span></div><p className="mt-5 text-sm font-medium text-accent">{labels.open} <span className="arrow ml-1">→</span></p></Link>)}</div> : <div className="theme-surface mt-4 rounded-xl border p-6 theme-muted">{labels.none}</div>}
    </section>
  </>;
}
