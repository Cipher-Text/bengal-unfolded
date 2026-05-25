import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllResources } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale, type ResourceCategory, type SourceQuality } from "@/types/content";

const PAGE_SIZE = 20;
const CATEGORY_VALUES: ResourceCategory[] = ["read", "watch", "explore", "understand"];
const QUALITY_VALUES: SourceQuality[] = ["primary", "secondary", "archive", "editorial"];

const CATEGORY_LABELS: Record<Locale, Record<ResourceCategory, string>> = {
  en: {
    read: "Read",
    watch: "Watch",
    explore: "Explore",
    understand: "Understand",
  },
  bn: {
    read: "পড়ুন",
    watch: "দেখুন",
    explore: "অন্বেষণ",
    understand: "বোঝুন",
  },
};

const QUALITY_LABELS: Record<Locale, Record<SourceQuality, string>> = {
  en: {
    primary: "Primary",
    secondary: "Secondary",
    archive: "Archive",
    editorial: "Editorial",
  },
  bn: {
    primary: "প্রাথমিক",
    secondary: "গৌণ",
    archive: "আর্কাইভ",
    editorial: "সম্পাদকীয়",
  },
};

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

function normalize(v: string): string {
  return v.trim().toLowerCase();
}

function toPage(v: string | undefined): number {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}

function buildQuery(params: { q?: string; category?: string; subcategory?: string; quality?: string; page?: number }): string {
  const qs = new URLSearchParams();
  if (params.q?.trim()) qs.set("q", params.q.trim());
  if (params.category?.trim()) qs.set("category", params.category.trim());
  if (params.subcategory?.trim()) qs.set("subcategory", params.subcategory.trim());
  if (params.quality?.trim()) qs.set("quality", params.quality.trim());
  if (params.page && params.page > 1) qs.set("page", String(params.page));
  const s = qs.toString();
  return s ? `?${s}` : "";
}

function uniqueValues<T extends string>(items: T[]): T[] {
  return Array.from(new Set(items));
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string; category?: string; subcategory?: string; quality?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { page, q, category, subcategory, quality } = await searchParams;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};

  const currentPage = toPage(page);
  const hasFilters = Boolean(q?.trim() || category?.trim() || subcategory?.trim() || quality?.trim());
  const isBn = locale === "bn";

  return buildPageMetadata({
    locale: locale as Locale,
    title: isBn ? "রিসোর্স ডিরেক্টরি | Bengal Unfolded" : "Resource Directory | Bengal Unfolded",
    description: isBn
      ? "রিড, ভিডিও, অন্বেষণ ও গবেষণা রিসোর্স সার্চ ও ফিল্টার দিয়ে দেখুন।"
      : "Explore read, watch, understand, and archive resources with search and filters.",
    canonicalPath: `/${locale}/resources`,
    languagePathWithoutLocale: "/resources",
    type: "website",
    noIndex: currentPage > 1 || hasFilters,
  });
}

export default async function ResourcesIndexPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string; category?: string; subcategory?: string; quality?: string }>;
}) {
  const { locale } = await params;
  const { page = "1", q = "", category = "", subcategory = "", quality = "" } = await searchParams;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  const isBn = locale === "bn";
  const allResources = await getAllResources(locale);
  const categoryValue = CATEGORY_VALUES.includes(category as ResourceCategory) ? (category as ResourceCategory) : "";
  const qualityValue = QUALITY_VALUES.includes(quality as SourceQuality) ? (quality as SourceQuality) : "";
  const subcategoryValue = normalize(subcategory);
  const nq = normalize(q);

  const categoryOptions = uniqueValues(allResources.map((resource) => resource.category));
  const subcategoryOptions = uniqueValues(allResources.map((resource) => resource.subcategory)).sort((a, b) => {
    const labelA = SUBCATEGORY_LABELS[locale as Locale][a as keyof typeof SUBCATEGORY_LABELS.en];
    const labelB = SUBCATEGORY_LABELS[locale as Locale][b as keyof typeof SUBCATEGORY_LABELS.en];
    return labelA.localeCompare(labelB);
  });
  const qualityOptions = uniqueValues(allResources.flatMap((resource) => (resource.quality ? [resource.quality] : []))).sort();

  const resources = allResources
    .filter((resource) => {
      const byCategory = categoryValue ? resource.category === categoryValue : true;
      const bySubcategory = subcategoryValue ? normalize(resource.subcategory) === subcategoryValue : true;
      const byQuality = qualityValue ? resource.quality === qualityValue : true;
      const byQuery = nq
        ? [
            resource.title,
            resource.attribution,
            resource.note,
            resource.category,
            resource.subcategory,
            resource.quality ?? "",
            resource.id,
          ]
            .map((v) => normalize(v))
            .some((v) => v.includes(nq))
        : true;
      return byCategory && bySubcategory && byQuality && byQuery;
    })
    .sort((a, b) => {
      const catDiff = CATEGORY_VALUES.indexOf(a.category) - CATEGORY_VALUES.indexOf(b.category);
      if (catDiff !== 0) return catDiff;
      const qualA = a.quality ? QUALITY_VALUES.indexOf(a.quality) : QUALITY_VALUES.length;
      const qualB = b.quality ? QUALITY_VALUES.indexOf(b.quality) : QUALITY_VALUES.length;
      if (qualA !== qualB) return qualA - qualB;
      return a.title.localeCompare(b.title);
    });

  const currentPage = Math.max(1, Number.parseInt(page, 10) || 1);
  const totalPages = Math.max(1, Math.ceil(resources.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pagedResources = resources.slice(start, start + PAGE_SIZE);

  const title = isBn ? "রিসোর্স ডিরেক্টরি" : "Resource Directory";
  const tagline = isBn ? "সার্চ ও ফিল্টারসহ সম্পূর্ণ রিসোর্স তালিকা" : "Complete resource list with search and filters";
  const intro = isBn
    ? "রিড, ভিডিও, অন্বেষণ, এবং গবেষণা রিসোর্সগুলো বিভাগ, উপবিভাগ, এবং মানভিত্তিকভাবে সাজানো।"
    : "Browse read, watch, explore, and understand resources organized by category, subcategory, and quality.";

  return (
    <div className="space-y-8">
      <HeroSection title={title} tagline={tagline} intro={intro} />

      <section className="theme-surface rounded-2xl border p-5 md:p-6">
        <SectionTitle
          title={isBn ? "সার্চ ও ফিল্টার" : "Search and Filters"}
          subtitle={isBn ? "কিওয়ার্ড, বিভাগ, উপবিভাগ ও মান দিয়ে রিসোর্স বাছাই করুন" : "Filter resources by keyword, category, subcategory, and quality"}
        />
        <form className="mt-4 grid gap-3 md:grid-cols-[1fr_170px_220px_180px_auto]" method="get" action={`/${locale}/resources`}>
          <input
            name="q"
            defaultValue={q}
            placeholder={isBn ? "শিরোনাম, নাম বা নোট" : "Search title, attribution, or note"}
            className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm"
          />
          <select name="category" defaultValue={categoryValue} className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm">
            <option value="">{isBn ? "সব বিভাগ" : "All categories"}</option>
            {categoryOptions.map((value) => (
              <option key={value} value={value}>
                {CATEGORY_LABELS[locale as Locale][value]}
              </option>
            ))}
          </select>
          <select name="subcategory" defaultValue={subcategoryValue} className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm">
            <option value="">{isBn ? "সব উপবিভাগ" : "All subcategories"}</option>
            {subcategoryOptions.map((value) => (
              <option key={value} value={value}>
                {SUBCATEGORY_LABELS[locale as Locale][value as keyof typeof SUBCATEGORY_LABELS.en]}
              </option>
            ))}
          </select>
          <select name="quality" defaultValue={qualityValue} className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm">
            <option value="">{isBn ? "সব মান" : "All quality levels"}</option>
            {qualityOptions.map((value) => (
              <option key={value} value={value}>
                {QUALITY_LABELS[locale as Locale][value]}
              </option>
            ))}
          </select>
          <button type="submit" className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-amber-500/40 px-4 text-sm font-medium text-accent hover:bg-amber-500/10">
            {isBn ? "প্রয়োগ করুন" : "Apply"}
          </button>
        </form>
      </section>

      <div>
        <div className="flex items-center justify-between gap-3">
          <SectionTitle
            title={isBn ? "সব রিসোর্স" : "All Resources"}
            subtitle={`${resources.length} ${isBn ? "রিসোর্স" : "resources"}`}
          />
          {(q || categoryValue || subcategoryValue || qualityValue) ? (
            <Link href={`/${locale}/resources`} className="text-sm font-medium text-amber-400 hover:text-amber-300">
              {isBn ? "ফিল্টার রিসেট" : "Reset filters"}
            </Link>
          ) : null}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {pagedResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} locale={locale as Locale} />
          ))}
        </div>

        {!pagedResources.length ? (
          <div className="theme-surface mt-4 rounded-xl border p-6 text-sm theme-muted">
            {isBn ? "কোনো রিসোর্স পাওয়া যায়নি।" : "No resources found."}
          </div>
        ) : null}

        <div className="mt-6 flex items-center justify-between">
          {safePage > 1 ? (
            <Link
              href={`/${locale}/resources${buildQuery({ q, category: categoryValue, subcategory: subcategoryValue, quality: qualityValue, page: safePage - 1 })}`}
              aria-label={isBn ? "আগের পাতা" : "Previous page"}
              className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent hover:bg-amber-500/10"
            >
              {isBn ? "আগে" : "Previous"}
            </Link>
          ) : (
            <span />
          )}
          <p className="theme-muted text-sm">{isBn ? `${safePage} / ${totalPages}` : `Page ${safePage} of ${totalPages}`}</p>
          {safePage < totalPages ? (
            <Link
              href={`/${locale}/resources${buildQuery({ q, category: categoryValue, subcategory: subcategoryValue, quality: qualityValue, page: safePage + 1 })}`}
              aria-label={isBn ? "পরের পাতা" : "Next page"}
              className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent hover:bg-amber-500/10"
            >
              {isBn ? "পরে" : "Next"}
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  );
}
