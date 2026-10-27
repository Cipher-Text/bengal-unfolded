import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { CompareEventsInteractive } from "@/components/CompareEventsInteractive";
import { HeroSection } from "@/components/HeroSection";
import { getAllEvents, getEventContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type EventSlug, type Locale } from "@/types/content";

export const dynamic="force-static";
const DEFAULT_PAIR:Record<Locale,[EventSlug,EventSlug]>={en:["1947-partition-and-eastern-bengal","1952-language-movement"],bn:["1947-partition-and-eastern-bengal","1952-language-movement"]};
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!SUPPORTED_LOCALES.includes(locale as Locale))return {};const bn=locale==="bn";return buildPageMetadata({locale:locale as Locale,title:bn?"ঘটনা তুলনা":"Compare Events",description:bn?"বেঙ্গল আনফোল্ডেড-এ দুটি ঐতিহাসিক অধ্যায় পাশাপাশি তুলনা করুন।":"Compare two Bengal Unfolded historical chapters side by side.",canonicalPath:`/${locale}/compare`,languagePathWithoutLocale:"/compare",type:"website"});}
export default async function ComparePage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!SUPPORTED_LOCALES.includes(locale as Locale))notFound();const current=locale as Locale;const [options,first,second]=await Promise.all([getAllEvents(current),getEventContent(current,DEFAULT_PAIR[current][0]),getEventContent(current,DEFAULT_PAIR[current][1])]);const bn=current==="bn";return <div className="space-y-8"><HeroSection title={bn?"ঘটনা তুলনা":"Compare Events"} tagline={bn?"দুটি অধ্যায় পাশাপাশি পড়ুন":"Read two chapters side by side"} intro={bn?"সময়, প্রেক্ষাপট, কারণ, পরিণতি, ব্যক্তি, স্থান ও সূত্রের অবস্থা পাশাপাশি তুলনা করুন।":"Compare chronology, context, causes, consequences, people, places, and source posture side by side."}/><Suspense fallback={<div className="min-h-[60vh]" aria-busy="true"/>}><CompareEventsInteractive locale={current} options={options} initial={[first,second]}/></Suspense></div>;}
