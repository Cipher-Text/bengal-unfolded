import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import {
  getAllLearningPaths,
  getLearningPathModeLabel,
  type LearningPathMode,
} from "@/lib/learning-paths";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

const MODES: LearningPathMode[] = ["beginner", "student", "researcher", "exam-prep"];

const LABELS = {
  en: {
    title: "Learning Paths",
    tagline: "Curated routes through Bengal history",
    intro:
      "Choose a structured path and move through events, figures, places, periods, and sources in a deliberate reading order.",
    filterTitle: "Browse by Mode",
    filterSubtitle: "Static paths only; progress tracking belongs to the future account system.",
    all: "All paths",
    available: "Available Paths",
    steps: "steps",
    difficulty: "Difficulty",
    open: "Open path",
    none: "No paths match this mode yet.",
  },
  bn: {
    title: "শেখার পথ",
    tagline: "বাংলার ইতিহাস শেখার নির্বাচিত রুট",
    intro:
      "একটি কাঠামোবদ্ধ পথ বেছে নিয়ে ঘটনা, ব্যক্তিত্ব, স্থান, পর্ব ও সূত্র ধারাবাহিকভাবে পড়ুন।",
    filterTitle: "মোড অনুযায়ী দেখুন",
    filterSubtitle: "এখন শুধু স্ট্যাটিক পথ; প্রগ্রেস ট্র্যাকিং ভবিষ্যৎ অ্যাকাউন্ট সিস্টেমে থাকবে।",
    all: "সব পথ",
    available: "উপলভ্য পথ",
    steps: "ধাপ",
    difficulty: "স্তর",
    open: "পথ খুলুন",
    none: "এই মোডে এখনও কোনো পথ নেই।",
  },
} as const;

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function toMode(value: string | undefined): LearningPathMode | undefined {
  return MODES.includes(value as LearningPathMode) ? (value as LearningPathMode) : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};

  const isBn = locale === "bn";
  return buildPageMetadata({
    locale: locale as Locale,
    title: isBn ? "শেখার পথ" : "Learning Paths",
    description: isBn
      ? "বেঙ্গল আনফোল্ডেড-এ বিষয়ভিত্তিক শেখার পথ ধরে ইতিহাস পড়ুন।"
      : "Follow curated Bengal Unfolded learning paths through events, figures, places, periods, and sources.",
    canonicalPath: `/${locale}/paths`,
    languagePathWithoutLocale: "/paths",
    type: "website",
  });
}

export default async function PathsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ mode?: string | string[] }>;
}) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  const labels = LABELS[locale as Locale];
  const mode = toMode(firstValue((await searchParams).mode));
  const paths = await getAllLearningPaths(locale as Locale);
  const filteredPaths = mode ? paths.filter((path) => path.modes.includes(mode)) : paths;

  return (
    <div className="space-y-8">
      <HeroSection title={labels.title} tagline={labels.tagline} intro={labels.intro} />

      <section className="theme-surface rounded-2xl border p-5 md:p-6">
        <SectionTitle title={labels.filterTitle} subtitle={labels.filterSubtitle} />
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href={`/${locale}/paths`}
            className={`inline-flex min-h-[40px] items-center rounded-full border px-4 text-sm font-medium ${
              !mode ? "border-amber-500/60 text-accent" : "border-amber-500/25 theme-muted"
            } hover:bg-amber-500/10`}
          >
            {labels.all}
          </Link>
          {MODES.map((item) => (
            <Link
              key={item}
              href={`/${locale}/paths?mode=${item}`}
              className={`inline-flex min-h-[40px] items-center rounded-full border px-4 text-sm font-medium ${
                mode === item ? "border-amber-500/60 text-accent" : "border-amber-500/25 theme-muted"
              } hover:bg-amber-500/10`}
            >
              {getLearningPathModeLabel(locale as Locale, item)}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          title={labels.available}
          subtitle={`${filteredPaths.length} / ${paths.length}`}
        />
        {filteredPaths.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {filteredPaths.map((path) => (
              <Link
                key={path.slug}
                href={`/${locale}/paths/${path.slug}`}
                className="theme-surface group rounded-xl border p-5 hover:border-amber-500/40"
              >
                <div className="flex flex-wrap gap-2">
                  {path.modes.map((pathMode) => (
                    <span
                      key={pathMode}
                      className="rounded-full border border-amber-500/30 px-2.5 py-1 text-[11px] font-medium text-accent"
                    >
                      {getLearningPathModeLabel(locale as Locale, pathMode)}
                    </span>
                  ))}
                </div>
                <h2 className="mt-4 text-xl font-semibold">{path.title}</h2>
                <p className="theme-muted mt-2 text-sm leading-relaxed">{path.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <span className="text-accent">{path.stepCount} {labels.steps}</span>
                  <span className="theme-muted">{labels.difficulty}: {path.difficulty}</span>
                </div>
                <p className="mt-5 inline-flex items-center text-sm font-medium text-accent">
                  {labels.open}
                  <span className="arrow ml-1">→</span>
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="theme-surface mt-4 rounded-xl border p-6 theme-muted">
            {labels.none}
          </div>
        )}
      </section>
    </div>
  );
}
