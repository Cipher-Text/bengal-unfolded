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
const CATEGORY_VALUES: ResourceCategory[] = [
  "primary-sources",
  "academic-books",
  "research-articles-and-papers",
  "reference-sources",
  "memoirs-and-eyewitness-accounts",
  "maps-and-visual-sources",
  "documentary-and-video",
  "news-and-contemporary-reports",
  "cultural-and-literary-resources",
  "further-reading",
];
const QUALITY_VALUES: SourceQuality[] = ["primary", "secondary", "archive", "editorial"];

const CATEGORY_LABELS: Record<Locale, Record<ResourceCategory, string>> = {
  en: {
    "primary-sources": "Primary Sources",
    "academic-books": "Academic Books",
    "reference-sources": "Reference Sources",
    "research-articles-and-papers": "Research Articles and Papers",
    "memoirs-and-eyewitness-accounts": "Memoirs and Eyewitness Accounts",
    "maps-and-visual-sources": "Maps and Visual Sources",
    "documentary-and-video": "Documentary and Video",
    "cultural-and-literary-resources": "Cultural and Literary Resources",
    "news-and-contemporary-reports": "News and Contemporary Reports",
    "further-reading": "Further Reading",
  },
  bn: {
    "primary-sources": "প্রাথমিক সূত্র",
    "academic-books": "অ্যাকাডেমিক বই",
    "reference-sources": "রেফারেন্স সূত্র",
    "research-articles-and-papers": "গবেষণা প্রবন্ধ ও পেপার",
    "memoirs-and-eyewitness-accounts": "স্মৃতিকথা ও প্রত্যক্ষদর্শীর বর্ণনা",
    "maps-and-visual-sources": "মানচিত্র ও ভিজ্যুয়াল সূত্র",
    "documentary-and-video": "ডকুমেন্টারি ও ভিডিও",
    "cultural-and-literary-resources": "সাংস্কৃতিক ও সাহিত্যিক রিসোর্স",
    "news-and-contemporary-reports": "সংবাদ ও সমসাময়িক প্রতিবেদন",
    "further-reading": "আরও পড়ুন",
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
      ? "প্রাথমিক সূত্র, বই, গবেষণা, মানচিত্র, ভিডিও ও রেফারেন্স রিসোর্স সার্চ ও ফিল্টার করে দেখুন।"
      : "Explore primary sources, books, research, maps, video, and reference resources with search and filters.",
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
    return a.localeCompare(b);
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
    ? "ইতিহাস শেখার উপযোগী বিভাগ, উপবিভাগ এবং সূত্র-মান অনুযায়ী সাজানো কিউরেটেড রিসোর্সসমূহ দেখুন।"
    : "Browse curated resources organized by learning-focused category, subcategory, and source quality.";

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
                {value}
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
