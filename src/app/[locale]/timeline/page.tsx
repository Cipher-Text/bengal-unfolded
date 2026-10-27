import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { TimelineExplorerInteractive } from "@/components/TimelineExplorerInteractive";
import { getAllEvents } from "@/lib/content";
import { EVENT_THEME_BY_SLUG } from "@/lib/event-presentation";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export const dynamic = "force-static";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!SUPPORTED_LOCALES.includes(locale as Locale))return {};const bn=locale==="bn";return buildPageMetadata({locale:locale as Locale,title:bn?"পূর্ণ টাইমলাইন":"Full Timeline",description:bn?"বেঙ্গল আনফোল্ডেড-এর সব ঐতিহাসিক অধ্যায় সার্চ, ফিল্টার ও পেজিনেশনের মাধ্যমে দেখুন।":"Explore all historical chapters in Bengal Unfolded with search, filters, and pagination.",canonicalPath:`/${locale}/timeline`,languagePathWithoutLocale:"/timeline",type:"website"});}
export default async function TimelineExplorerPage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!SUPPORTED_LOCALES.includes(locale as Locale))notFound();const events=await getAllEvents(locale);const timelineEvents=events.map(({slug,year,title,subtitle,summary,periodLabel,movementLabel,importance,themeColor,ctaLabel})=>({slug,year,title,subtitle,summary,periodLabel,movementLabel,importance,themeColor,ctaLabel}));return <div className="space-y-8"><HeroSection title={locale==="bn"?"পূর্ণ টাইমলাইন":"Full Timeline Explorer"} tagline={locale==="bn"?"বছর, শিরোনাম ও সারাংশ ধরে সার্চ করুন":"Search by year, title, and summary"} intro={locale==="bn"?"সব অধ্যায় একসাথে দেখে গুরুত্ব, পর্ব এবং বৃহত্তর ধারাবাহিকতা বোঝার জন্য এই এক্সপ্লোরার ব্যবহার করুন.":"Use this explorer to see all chapters together and understand their importance, period, and broader continuity."}/><Suspense fallback={<div className="min-h-96" aria-busy="true"/>}><TimelineExplorerInteractive events={timelineEvents} themes={EVENT_THEME_BY_SLUG} locale={locale as Locale}/></Suspense></div>;}
