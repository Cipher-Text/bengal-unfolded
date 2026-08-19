import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllCreators, getAllResources } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import {
  SUPPORTED_LOCALES,
  type Creator,
  type EventResource,
  type Locale,
  type ResourceCategory,
} from "@/types/content";

const PAGE_SIZE = 24;
const CREATOR_TYPES: Creator["type"][] = ["person", "organization"];
const RESOURCE_COUNT_VALUES = ["2", "5", "10"] as const;
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

type CreatorSummary = Creator & {
  resources: EventResource[];
  resourceCount: number;
  categories: ResourceCategory[];
  categoryLabels: string[];
};

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function toPage(value: string | undefined): number {
  const page = Number(value);
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

function buildQuery(params: {
  q?: string;
  type?: string;
  category?: string;
  minResources?: string;
  page?: number;
}): string {
  const query = new URLSearchParams();
  if (params.q?.trim()) query.set("q", params.q.trim());
  if (params.type?.trim()) query.set("type", params.type.trim());
  if (params.category?.trim()) query.set("category", params.category.trim());
  if (params.minResources?.trim()) query.set("minResources", params.minResources.trim());
  if (params.page && params.page > 1) query.set("page", String(params.page));
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

function uniqueValues<T extends string>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function formatNumber(locale: Locale, value: number): string {
  return new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en-US").format(value);
}

function getResourceLabel(locale: Locale, count: number): string {
  const formattedCount = formatNumber(locale, count);
  if (locale === "bn") return `${formattedCount} রিসোর্স`;
  return `${formattedCount} ${count === 1 ? "resource" : "resources"}`;
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string; type?: string; category?: string; minResources?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { page, q, type, category, minResources } = await searchParams;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};

  const currentPage = toPage(page);
  const hasFilters = Boolean(q?.trim() || type?.trim() || category?.trim() || minResources?.trim());
  const isBn = locale === "bn";

  return buildPageMetadata({
    locale: locale as Locale,
    title: isBn ? "সূত্রপঞ্জি" : "Source Directory",
    description: isBn
      ? "বেঙ্গল আনফোল্ডেডে উদ্ধৃত ইতিহাসবিদ, প্রকাশনা, আর্কাইভ, গণমাধ্যম, গবেষক, বই ও প্রতিষ্ঠানের তালিকা।"
      : "Find historians, publishers, archives, media outlets, researchers, books, and institutions cited across Bengal Unfolded.",
    canonicalPath: `/${locale}/creators`,
    languagePathWithoutLocale: "/creators",
    type: "website",
    noIndex: currentPage > 1 || hasFilters,
  });
}

export default async function CreatorsIndexPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string; type?: string; category?: string; minResources?: string }>;
}) {
  const { locale } = await params;
  const { page = "1", q = "", type = "", category = "", minResources = "" } = await searchParams;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  const currentLocale = locale as Locale;
  const isBn = currentLocale === "bn";
  const [allCreators, allResources] = await Promise.all([
    getAllCreators(currentLocale),
    getAllResources(currentLocale),
  ]);
  const resourcesByCreatorId = new Map<string, EventResource[]>();
  for (const resource of allResources) {
    const resources = resourcesByCreatorId.get(resource.creatorId) ?? [];
    resources.push(resource);
    resourcesByCreatorId.set(resource.creatorId, resources);
  }

  const typeValue = CREATOR_TYPES.includes(type as Creator["type"]) ? (type as Creator["type"]) : "";
  const categoryValue = CATEGORY_VALUES.includes(category as ResourceCategory) ? (category as ResourceCategory) : "";
  const minResourcesValue = RESOURCE_COUNT_VALUES.includes(minResources as (typeof RESOURCE_COUNT_VALUES)[number])
    ? minResources
    : "";
  const minResourceCount = minResourcesValue ? Number(minResourcesValue) : 0;
  const nq = normalize(q);

  const categoryOptions = uniqueValues(allResources.map((resource) => resource.category)).sort((a, b) => {
    return CATEGORY_VALUES.indexOf(a) - CATEGORY_VALUES.indexOf(b);
  });

  const summaries: CreatorSummary[] = allCreators.map((creator) => {
    const resources = resourcesByCreatorId.get(creator.id) ?? [];
    const categories = uniqueValues(resources.map((resource) => resource.category)).sort((a, b) => {
      return CATEGORY_VALUES.indexOf(a) - CATEGORY_VALUES.indexOf(b);
    });
    return {
      ...creator,
      resources,
      resourceCount: resources.length,
      categories,
      categoryLabels: categories.map((item) => CATEGORY_LABELS[currentLocale][item]),
    };
  });

  const creators = summaries
    .filter((creator) => {
      const byType = typeValue ? creator.type === typeValue : true;
      const byCategory = categoryValue ? creator.categories.includes(categoryValue) : true;
      const byResourceCount = minResourceCount ? creator.resourceCount >= minResourceCount : true;
      const byQuery = nq
        ? [
            creator.name,
            creator.id,
            creator.type,
            ...creator.categoryLabels,
            ...creator.resources.flatMap((resource) => [
              resource.title,
              resource.note,
              resource.subcategory,
              resource.quality,
            ]),
          ]
            .map((value) => normalize(value))
            .some((value) => value.includes(nq))
        : true;
      return byType && byCategory && byResourceCount && byQuery;
    })
    .sort((a, b) => {
      if (b.resourceCount !== a.resourceCount) return b.resourceCount - a.resourceCount;
      return a.name.localeCompare(b.name);
    });

  const currentPage = toPage(page);
  const totalPages = Math.max(1, Math.ceil(creators.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pagedCreators = creators.slice(start, start + PAGE_SIZE);

  const personCount = summaries.filter((creator) => creator.type === "person").length;
  const organizationCount = summaries.filter((creator) => creator.type === "organization").length;

  return (
    <div className="space-y-8">
      <HeroSection
        title={isBn ? "সূত্রপঞ্জি" : "Source Directory"}
        tagline={isBn ? "রেফারেন্স-সংযুক্ত ব্যক্তি ও প্রতিষ্ঠান" : "Resource-linked people and institutions"}
        intro={
          isBn
            ? "বেঙ্গল আনফোল্ডেডে উদ্ধৃত ইতিহাসবিদ, প্রকাশনা, আর্কাইভ, গণমাধ্যম, গবেষক, বই ও প্রতিষ্ঠানের তালিকা।"
            : "Find historians, publishers, archives, media outlets, researchers, books, and institutions cited across Bengal Unfolded."
        }
        rightTitle={isBn ? "সূত্র নিবন্ধন" : "The Source Register"}
        rightLabel={isBn ? "ব্যক্তি · প্রতিষ্ঠান" : "People · Institutions"}
        rightSlot={
          isBn
            ? "বেঙ্গল আনফোল্ডেডে ব্যবহৃত ইতিহাসবিদ, প্রকাশনা, আর্কাইভ, গণমাধ্যম, গবেষক ও প্রতিষ্ঠানের সংকলিত তালিকা।"
            : "A curated index of historians, publishers, archives, media outlets, researchers, and institutions referenced across Bengal Unfolded."
        }
      />

      <section className="theme-surface rounded-2xl border p-5 md:p-6">
        <SectionTitle
          title={isBn ? "সার্চ ও ফিল্টার" : "Search and Filters"}
          subtitle={isBn ? "নাম, সূত্রের ধরন, রিসোর্স ক্যাটাগরি ও রিসোর্স সংখ্যার ভিত্তিতে ফিল্টার করুন।" : "Filter by name, creator type, resource category, and resource count."}
        />
        <form className="mt-4 grid gap-3 md:grid-cols-[1fr_180px_230px_190px_auto]" method="get" action={`/${locale}/creators`}>
          <input
            name="q"
            defaultValue={q}
            placeholder={isBn ? "নাম, সূত্র, নোট বা রেফারেন্স খুঁজুন" : "Search name, source, note, or reference"}
            className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm"
          />
          <select name="type" defaultValue={typeValue} className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm">
            <option value="">{isBn ? "সব ধরন" : "All types"}</option>
            <option value="person">{isBn ? "ব্যক্তি" : "Person"}</option>
            <option value="organization">{isBn ? "প্রতিষ্ঠান" : "Organization"}</option>
          </select>
          <select name="category" defaultValue={categoryValue} className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm">
            <option value="">{isBn ? "সব রিসোর্স বিভাগ" : "All resource categories"}</option>
            {categoryOptions.map((value) => (
              <option key={value} value={value}>
                {CATEGORY_LABELS[currentLocale][value]}
              </option>
            ))}
          </select>
          <select name="minResources" defaultValue={minResourcesValue} className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm">
            <option value="">{isBn ? "যেকোনো সংখ্যা" : "Any count"}</option>
            {RESOURCE_COUNT_VALUES.map((value) => (
              <option key={value} value={value}>
                {isBn ? `কমপক্ষে ${formatNumber(currentLocale, Number(value))}` : `${value}+ resources`}
              </option>
            ))}
          </select>
          <button type="submit" className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-amber-500/40 px-4 text-sm font-medium text-accent hover:bg-amber-500/10">
            {isBn ? "প্রয়োগ করুন" : "Apply"}
          </button>
        </form>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <div className="theme-surface rounded-xl border p-4">
          <p className="text-eyebrow">{isBn ? "মোট সূত্র" : "Total Sources"}</p>
          <p className="mt-2 text-2xl font-semibold">{formatNumber(currentLocale, summaries.length)}</p>
        </div>
        <div className="theme-surface rounded-xl border p-4">
          <p className="text-eyebrow">{isBn ? "ব্যক্তি" : "People"}</p>
          <p className="mt-2 text-2xl font-semibold">{formatNumber(currentLocale, personCount)}</p>
        </div>
        <div className="theme-surface rounded-xl border p-4">
          <p className="text-eyebrow">{isBn ? "প্রতিষ্ঠান" : "Organizations"}</p>
          <p className="mt-2 text-2xl font-semibold">{formatNumber(currentLocale, organizationCount)}</p>
        </div>
      </section>

      <div>
        <div className="flex items-center justify-between gap-3">
          <SectionTitle
            title={isBn ? "সব সূত্র" : "All Sources"}
            subtitle={`${formatNumber(currentLocale, creators.length)} ${isBn ? "সূত্র" : "sources"}`}
          />
          {(q || typeValue || categoryValue || minResourcesValue) ? (
            <Link href={`/${locale}/creators`} className="text-sm font-medium text-amber-400 hover:text-amber-300">
              {isBn ? "ফিল্টার রিসেট" : "Reset filters"}
            </Link>
          ) : null}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {pagedCreators.map((creator) => {
            const featuredResources = creator.resources.slice(0, 3);
            return (
              <article key={creator.id} className="theme-surface rounded-xl border p-5 hover:border-amber-400/40">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-eyebrow">{creator.type === "organization" ? (isBn ? "প্রতিষ্ঠান" : "Organization") : (isBn ? "ব্যক্তি" : "Person")}</p>
                    <h2 className="mt-2 text-xl font-semibold leading-snug">
                      <Link href={`/${locale}/creators/${creator.id}`} className="link-ink">
                        {creator.name}
                      </Link>
                    </h2>
                  </div>
                  <span className="stamp shrink-0">{getResourceLabel(currentLocale, creator.resourceCount)}</span>
                </div>
                {creator.categoryLabels.length > 0 ? (
                  <p className="theme-muted mt-3 text-sm">{creator.categoryLabels.slice(0, 2).join(" · ")}</p>
                ) : null}
                {featuredResources.length > 0 ? (
                  <ul className="mt-4 space-y-2">
                    {featuredResources.map((resource) => (
                      <li key={resource.id}>
                        <Link href={`/${locale}/resources/${resource.id}`} className="theme-muted link-ink text-sm leading-relaxed">
                          {resource.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
                <Link href={`/${locale}/creators/${creator.id}`} className="btn-vintage mt-5">
                  {isBn ? "সূত্র দেখুন" : "View Source"}
                  <span className="arrow">→</span>
                </Link>
              </article>
            );
          })}
        </div>

        {!pagedCreators.length ? (
          <div className="theme-surface mt-4 rounded-xl border p-6 text-sm theme-muted">
            {isBn ? "কোনো সূত্র পাওয়া যায়নি।" : "No sources found."}
          </div>
        ) : null}

        <div className="mt-6 flex items-center justify-between">
          {safePage > 1 ? (
            <Link
              href={`/${locale}/creators${buildQuery({ q, type: typeValue, category: categoryValue, minResources: minResourcesValue, page: safePage - 1 })}`}
              aria-label={isBn ? "আগের পাতা" : "Previous page"}
              className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent hover:bg-amber-500/10"
            >
              {isBn ? "আগে" : "Previous"}
            </Link>
          ) : (
            <span />
          )}
          <p className="theme-muted text-sm">
            {isBn
              ? `${formatNumber(currentLocale, safePage)} / ${formatNumber(currentLocale, totalPages)}`
              : `Page ${safePage} of ${totalPages}`}
          </p>
          {safePage < totalPages ? (
            <Link
              href={`/${locale}/creators${buildQuery({ q, type: typeValue, category: categoryValue, minResources: minResourcesValue, page: safePage + 1 })}`}
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
