import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { ResourceDirectoryInteractive } from "@/components/ResourceDirectoryInteractive";
import { getAllResources } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export const dynamic = "force-static";

export function generateStaticParams() { return SUPPORTED_LOCALES.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  const bn = locale === "bn";
  return buildPageMetadata({ locale: locale as Locale, title: bn ? "রিসোর্স ডিরেক্টরি" : "Resource Directory", description: bn ? "প্রাথমিক সূত্র, বই, গবেষণা, মানচিত্র, ভিডিও ও রেফারেন্স রিসোর্স সার্চ ও ফিল্টার করে দেখুন।" : "Explore primary sources, books, research, maps, video, and reference resources with search and filters.", canonicalPath: `/${locale}/resources`, languagePathWithoutLocale: "/resources", type: "website" });
}

export default async function ResourcesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const resources = await getAllResources(locale);
  const bn = locale === "bn";
  return <div className="space-y-8"><HeroSection title={bn ? "রিসোর্স ডিরেক্টরি" : "Resource Directory"} tagline={bn ? "সার্চ ও ফিল্টারসহ সম্পূর্ণ রিসোর্স তালিকা" : "Complete resource list with search and filters"} intro={bn ? "ইতিহাস শেখার উপযোগী বিভাগ, উপবিভাগ এবং সূত্র-মান অনুযায়ী সাজানো কিউরেটেড রিসোর্সসমূহ দেখুন।" : "Browse curated resources organized by learning-focused category, subcategory, and source quality."}/><Suspense fallback={<div className="min-h-96" aria-busy="true"/>}><ResourceDirectoryInteractive resources={resources} locale={locale as Locale}/></Suspense></div>;
}
