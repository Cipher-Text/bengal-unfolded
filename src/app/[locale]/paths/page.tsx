import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { getAllLearningPaths, resolveLearningPathStep } from "@/lib/learning-paths";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";
import { QueryPathMode } from "@/components/QueryPathMode";

export const dynamic = "force-static";

const LABELS = {
  en: {
    title: "Learning Paths",
    tagline: "Curated routes through Bengal history",
    intro:
      "Each path is a short reading order: context first, then key chapters, people and sources. Pick the period you want to understand and follow the steps.",
    all: "All paths",
    beginner: "Beginner-friendly",
    examPrep: "Exam prep",
    available: "Paths in chronological order",
    steps: "steps",
    startsWith: "Starts with",
    open: "Open path",
    none: "No paths match this filter yet.",
    filter: "Filter paths",
  },
  bn: {
    title: "শেখার পথ",
    tagline: "বাংলার ইতিহাস শেখার নির্বাচিত রুট",
    intro:
      "প্রতিটি পথ একটি ছোট পড়ার ক্রম: আগে প্রেক্ষাপট, তারপর মূল অধ্যায়, ব্যক্তি ও সূত্র। যে যুগ বুঝতে চান তা বেছে নিয়ে ধাপগুলো অনুসরণ করুন।",
    all: "সব পথ",
    beginner: "নতুনদের জন্য",
    examPrep: "পরীক্ষা প্রস্তুতি",
    available: "কালানুক্রমিক পথসমূহ",
    steps: "ধাপ",
    startsWith: "শুরু হয়",
    open: "পথ খুলুন",
    none: "এই ফিল্টারে এখনও কোনো পথ নেই।",
    filter: "পথ ফিল্টার করুন",
  },
} as const;

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

export default async function PathsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  const labels = LABELS[locale as Locale];
  const paths = await getAllLearningPaths(locale as Locale);
  // Show where each path begins, so a card reads as a route and not just a topic summary.
  const startsWith = Object.fromEntries(
    await Promise.all(
      paths.map(async (path) => {
        const first = path.learningPath?.[0];
        return [path.slug, first ? (await resolveLearningPathStep(locale as Locale, first)).label : ""] as const;
      }),
    ),
  );

  return (
    <div className="space-y-8">
      <HeroSection showCollage={false} title={labels.title} tagline={labels.tagline} intro={labels.intro} />
      <Suspense fallback={<section className="min-h-48" aria-busy="true" />}>
        <QueryPathMode locale={locale as Locale} paths={paths} labels={labels} startsWith={startsWith} />
      </Suspense>
    </div>
  );
}
