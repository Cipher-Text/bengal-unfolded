import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { FigureDirectoryInteractive } from "@/components/FigureDirectoryInteractive";
import { FigureProfileCard } from "@/components/FigureProfileCard";
import { HeroSection } from "@/components/HeroSection";
import { getAllFiguresChronological } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export const dynamic = "force-static";
export function generateStaticParams() { return SUPPORTED_LOCALES.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  return buildPageMetadata({ locale: locale as Locale, title: locale === "bn" ? "ঐতিহাসিক ব্যক্তিত্ব" : "Historical Figures", description: "Explore all figures and historical actors connected to Bengal Unfolded events.", canonicalPath: `/${locale}/figures`, languagePathWithoutLocale: "/figures" });
}
export default async function FiguresListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const isBn = locale === "bn";
  const figures = await getAllFiguresChronological(locale);
  return <div className="space-y-8">
    <HeroSection title={isBn ? "সকল মূল ব্যক্তিত্ব" : "All Key Figures"} tagline={isBn ? "অবদান, প্রেক্ষাপট ও প্রভাবভিত্তিক ডিরেক্টরি" : "A contribution-first, context-rich directory"} intro={isBn ? "প্রতিটি প্রোফাইলে কী করেছেন, কোথায় করেছেন, কেন গুরুত্বপূর্ণ—এই তিন স্তরে উপস্থাপন করা হয়েছে।" : "Each profile is structured by what they did, where it mattered, and why it shaped history."} />
    <Suspense fallback={<section aria-label={isBn ? "ব্যক্তিত্ব ডিরেক্টরি" : "Figure Directory"} className="grid gap-4 md:grid-cols-2">{figures.slice(0, 20).map((figure, index) => <FigureProfileCard key={figure.id} figure={figure} locale={locale as Locale} featured={index === 0} />)}</section>}><FigureDirectoryInteractive figures={figures.map(({ id, name, name_en, role, group, contribution, context, impact, highlight, tags, alternateNames, searchAliases }) => ({ id, name, name_en, role, group, contribution, context, impact, highlight, tags, alternateNames, searchAliases }))} locale={locale as Locale} /></Suspense>
  </div>;
}
