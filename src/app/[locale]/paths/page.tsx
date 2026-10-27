import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import {
  getAllLearningPaths,
} from "@/lib/learning-paths";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";
import { QueryPathMode } from "@/components/QueryPathMode";

export const dynamic = "force-static";

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

  return (
    <div className="space-y-8">
      <HeroSection title={labels.title} tagline={labels.tagline} intro={labels.intro} />

      <section className="theme-surface rounded-2xl border p-5 md:p-6">
        <SectionTitle title={labels.filterTitle} subtitle={labels.filterSubtitle} />
      </section>
      <Suspense fallback={<section className="min-h-48" aria-busy="true" />}>
        <QueryPathMode locale={locale as Locale} paths={paths} labels={labels} />
      </Suspense>
    </div>
  );
}
