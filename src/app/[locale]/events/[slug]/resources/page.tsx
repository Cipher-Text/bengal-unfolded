import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionTitle } from "@/components/SectionTitle";
import { getEventContent, getEventMetaForDisplay } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_EVENT_SLUGS, SUPPORTED_LOCALES, type EventResource, type EventSlug, type Locale } from "@/types/content";

const CATEGORY_ORDER: EventResource["category"][] = [
  "primary-sources",
  "academic-books",
  "research-articles-and-papers",
  "reference-sources",
  "news-and-contemporary-reports",
  "documentary-and-video",
  "maps-and-visual-sources",
  "memoirs-and-eyewitness-accounts",
  "cultural-and-literary-resources",
  "further-reading",
];

const CATEGORY_LABELS = {
  en: {
    "primary-sources": "Primary Sources",
    "academic-books": "Academic Books",
    "research-articles-and-papers": "Academic / Research",
    "reference-sources": "Reference",
    "news-and-contemporary-reports": "Editorial / News",
    "documentary-and-video": "Documentary / Video",
    "maps-and-visual-sources": "Maps / Archive",
    "memoirs-and-eyewitness-accounts": "Memoirs and Eyewitness Accounts",
    "cultural-and-literary-resources": "Cultural and Literary Resources",
    "further-reading": "Further Reading",
  },
  bn: {
    "primary-sources": "প্রাথমিক সূত্র",
    "academic-books": "অ্যাকাডেমিক বই",
    "research-articles-and-papers": "একাডেমিক / গবেষণা",
    "reference-sources": "রেফারেন্স",
    "news-and-contemporary-reports": "সম্পাদকীয় / সংবাদ",
    "documentary-and-video": "ডকুমেন্টারি / ভিডিও",
    "maps-and-visual-sources": "মানচিত্র / আর্কাইভ",
    "memoirs-and-eyewitness-accounts": "স্মৃতিকথা ও প্রত্যক্ষদর্শীর বর্ণনা",
    "cultural-and-literary-resources": "সাংস্কৃতিক ও সাহিত্যিক রিসোর্স",
    "further-reading": "আরও পড়ুন",
  },
} as const;

const EVIDENCE_ORDER = { high: 0, medium: 1, low: 2 } as const;
const SOURCE_QUALITY_ORDER = { primary: 0, archive: 1, academic: 2, reference: 3, secondary: 4, editorial: 5, unknown: 6 } as const;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => SUPPORTED_EVENT_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_EVENT_SLUGS.includes(slug as EventSlug)) return {};
  const eventMeta = await getEventMetaForDisplay(locale, slug);
  return buildPageMetadata({
    locale: locale as Locale,
    title: `${eventMeta.year} Resources — ${eventMeta.title}`,
    description: "Categorized resources for deeper learning.",
    canonicalPath: `/${locale}/events/${slug}/resources`,
    languagePathWithoutLocale: `/events/${slug}/resources`,
    type: "article",
  });
}

export default async function EventResourceCategoriesPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_EVENT_SLUGS.includes(slug as EventSlug)) notFound();

  const event = await getEventContent(locale, slug);

  const grouped = CATEGORY_ORDER.map((category) => {
    const byCategory = event.resources.filter((resource) => resource.category === category);
    const bySubcategory = byCategory.reduce<Record<string, EventResource[]>>((acc, resource) => {
      acc[resource.subcategory] = [...(acc[resource.subcategory] ?? []), resource];
      return acc;
    }, {});
    for (const key of Object.keys(bySubcategory)) {
      bySubcategory[key] = bySubcategory[key].sort((a, b) => {
        const aSource = a.sourceQuality ? SOURCE_QUALITY_ORDER[a.sourceQuality] : Number.MAX_SAFE_INTEGER;
        const bSource = b.sourceQuality ? SOURCE_QUALITY_ORDER[b.sourceQuality] : Number.MAX_SAFE_INTEGER;
        if (aSource !== bSource) return aSource - bSource;
        const aEvidence = a.evidenceLevel ? EVIDENCE_ORDER[a.evidenceLevel] : Number.MAX_SAFE_INTEGER;
        const bEvidence = b.evidenceLevel ? EVIDENCE_ORDER[b.evidenceLevel] : Number.MAX_SAFE_INTEGER;
        if (aEvidence !== bEvidence) return aEvidence - bEvidence;
        return a.title.localeCompare(b.title);
      });
    }
    return { category, bySubcategory };
  });

  return (
    <div className="space-y-10">
      <HeroSection
        title={`${event.meta.year} Resources`}
        tagline={event.meta.title}
        intro={locale === "bn" ? "সাব-ক্যাটাগরি অনুযায়ী সব রিসোর্স একসাথে দেখুন।" : "Explore all resources grouped by subcategory."}
      />

      {grouped.map(({ category, bySubcategory }) => {
        const subcategories = Object.keys(bySubcategory);
        if (subcategories.length === 0) return null;

        return (
          <section key={category} className="space-y-4">
            <SectionTitle title={CATEGORY_LABELS[locale as Locale][category]} />
            {subcategories.map((subcategory) => (
              <div key={subcategory} className="space-y-3">
                <h3 className="text-lg font-semibold text-amber-400">{subcategory}</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {bySubcategory[subcategory].map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} locale={locale as Locale} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        );
      })}
    </div>
  );
}
