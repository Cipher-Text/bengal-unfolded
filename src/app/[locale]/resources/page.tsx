import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { ResourceDirectoryInteractive, type ResourceListItem } from "@/components/ResourceDirectoryInteractive";
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
  const clean = (text: string, max: number) => {
    const t = text.replace(/\s+/g, " ").trim();
    if (t.length <= max) return t;
    const head = t.slice(0, max);
    const end = Math.max(head.lastIndexOf(". "), head.lastIndexOf("। "));
    return end > max * 0.5 ? head.slice(0, end + 1) : `${head.slice(0, head.lastIndexOf(" "))}…`;
  };
  const items: ResourceListItem[] = resources.map((resource) => ({
    id: resource.id,
    title: resource.title,
    attribution: resource.attribution,
    category: resource.category,
    subcategory: resource.subcategory,
    quality: resource.quality,
    excerpt: clean(resource.note ?? "", 170),
    href: resource.href?.startsWith("http") ? resource.href : undefined,
    search: [resource.title, resource.attribution, resource.note, resource.subcategory].filter(Boolean).join(" ").toLocaleLowerCase(),
  }));
  return (
    <div className="space-y-8">
      <HeroSection
        showCollage={false}
        title={bn ? "সূত্রভাণ্ডার" : "Source library"}
        tagline={bn ? "বই, নথি ও গবেষণা, নির্ভরযোগ্যতার মান-সহ" : "Books, records and research, each rated for reliability"}
        intro={bn ? "এই সাইটের অধ্যায়গুলো যেসব সূত্রের ওপর দাঁড়িয়ে, সেগুলো এখানে। প্রতিটি সূত্র প্রাথমিক, গৌণ, আর্কাইভ বা সম্পাদকীয় হিসেবে চিহ্নিত।" : "These are the sources the chapters rest on. Each one is marked as primary, secondary, archive or editorial, so you can see how much weight it can bear."}
      />
      <ResourceDirectoryInteractive resources={items} locale={locale as Locale} />
    </div>
  );
}
