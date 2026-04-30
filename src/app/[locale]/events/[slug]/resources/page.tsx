import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionTitle } from "@/components/SectionTitle";
import { getEventContent } from "@/lib/content";
import { SUPPORTED_EVENT_SLUGS, SUPPORTED_LOCALES, type EventResource, type EventSlug, type Locale } from "@/types/content";

const CATEGORY_ORDER: EventResource["category"][] = ["read", "watch", "explore", "understand"];

const CATEGORY_LABELS = {
  en: { read: "Read", watch: "Watch", explore: "Explore", understand: "Understand" },
  bn: { read: "পড়ুন", watch: "দেখুন", explore: "অন্বেষণ", understand: "বোঝুন" },
} as const;

const SUBCATEGORY_LABELS = {
  en: {
    "historical-literature": "Historical Literature",
    novel: "Novel",
    memoir: "Memoir",
    movie: "Movie",
    documentary: "Documentary",
    drama: "Drama",
    archive: "Archive",
    documents: "Documents",
    photos: "Photos",
    research: "Research",
    papers: "Papers",
  },
  bn: {
    "historical-literature": "ঐতিহাসিক সাহিত্য",
    novel: "উপন্যাস",
    memoir: "স্মৃতিকথা",
    movie: "চলচ্চিত্র",
    documentary: "ডকুমেন্টারি",
    drama: "নাটক",
    archive: "আর্কাইভ",
    documents: "ডকুমেন্টস",
    photos: "ছবি",
    research: "গবেষণা",
    papers: "পেপারস",
  },
} as const;

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => SUPPORTED_EVENT_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_EVENT_SLUGS.includes(slug as EventSlug)) return {};
  const event = await getEventContent(locale, slug);
  return {
    title: `${event.meta.year} Resources | ${event.meta.title} | Bengal Unfolded`,
    description: "Categorized resources for deeper learning.",
    alternates: {
      canonical: `/${locale}/events/${slug}/resources`,
      languages: { en: `/en/events/${slug}/resources`, bn: `/bn/events/${slug}/resources` },
    },
    openGraph: {
      title: `${event.meta.year} Resources | ${event.meta.title} | Bengal Unfolded`,
      description: "Categorized resources for deeper learning.",
      url: `/${locale}/events/${slug}/resources`,
      locale: locale === "bn" ? "bn_BD" : "en_US",
    },
  };
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
                <h3 className="text-lg font-semibold text-amber-400">{SUBCATEGORY_LABELS[locale as Locale][subcategory as keyof typeof SUBCATEGORY_LABELS.en]}</h3>
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
