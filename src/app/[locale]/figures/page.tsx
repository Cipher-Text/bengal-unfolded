import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FigureProfileCard } from "@/components/FigureProfileCard";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllFiguresChronological } from "@/lib/content";
import { inferFigureEntityType, type FigureEntityType } from "@/lib/figures";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Figure, type Locale } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string; entity?: string; group?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { page, q, entity, group } = await searchParams;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  const currentPage = Math.max(1, Number.parseInt(page ?? "1", 10) || 1);
  const query = new URLSearchParams();
  if (q?.trim()) query.set("q", q.trim());
  if (entity?.trim()) query.set("entity", entity.trim());
  if (group?.trim()) query.set("group", group.trim());
  if (currentPage > 1) query.set("page", String(currentPage));
  const qs = query.toString();
  const canonical = qs ? `/${locale}/figures?${qs}` : `/${locale}/figures`;
  const hasFilters = Boolean(q?.trim() || entity?.trim() || group?.trim());
  return buildPageMetadata({
    locale: locale as Locale,
    title: `Figures | ${locale.toUpperCase()} | Bengal Unfolded`,
    description: "Explore all figures and historical actors connected to Bengal Unfolded events.",
    canonicalPath: canonical,
    languagePathWithoutLocale: "/figures",
    noIndex: currentPage > 1 || hasFilters,
  });
}

const PAGE_SIZE = 20;
const GROUP_VALUES: Figure["group"][] = ["leader", "coordinator", "martyr", "organization", "collective"];
const ENTITY_VALUES: FigureEntityType[] = ["person", "party", "alliance", "organization"];

function normalize(v: string): string {
  return v.trim().toLowerCase();
}

function buildQuery(params: { q?: string; entity?: string; group?: string; page?: number }): string {
  const query = new URLSearchParams();
  if (params.q?.trim()) query.set("q", params.q.trim());
  if (params.entity?.trim()) query.set("entity", params.entity.trim());
  if (params.group?.trim()) query.set("group", params.group.trim());
  if (params.page && params.page > 1) query.set("page", String(params.page));
  const qs = query.toString();
  return qs ? `?${qs}` : "";
}

export default async function FiguresListPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; q?: string; entity?: string; group?: string }>;
}) {
  const { locale } = await params;
  const { page = "1", q = "", entity = "", group = "" } = await searchParams;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  const isBn = locale === "bn";
  const allFigures = await getAllFiguresChronological(locale);
  const nq = normalize(q);
  const entityValue = ENTITY_VALUES.includes(entity as FigureEntityType) ? (entity as FigureEntityType) : "";
  const groupValue = GROUP_VALUES.includes(group as Figure["group"]) ? (group as Figure["group"]) : "";

  const figures = allFigures.filter((figure) => {
    const byEntity = entityValue ? inferFigureEntityType(figure) === entityValue : true;
    const byGroup = groupValue ? figure.group === groupValue : true;
    const byQuery = nq
      ? [figure.name, figure.role, figure.contribution, figure.context, figure.impact, ...(figure.tags ?? [])]
        .map((v) => normalize(v))
        .some((v) => v.includes(nq))
      : true;
    return byEntity && byGroup && byQuery;
  });

  const currentPage = Math.max(1, Number.parseInt(page, 10) || 1);
  const totalPages = Math.max(1, Math.ceil(figures.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pagedFigures = figures.slice(start, start + PAGE_SIZE);

  return (
    <div className="space-y-8">
      <HeroSection
        title={isBn ? "সকল মূল ব্যক্তিত্ব" : "All Key Figures"}
        tagline={isBn ? "অবদান, প্রেক্ষাপট ও প্রভাবভিত্তিক ডিরেক্টরি" : "A contribution-first, context-rich directory"}
        intro={isBn ? "প্রতিটি প্রোফাইলে কী করেছেন, কোথায় করেছেন, কেন গুরুত্বপূর্ণ—এই তিন স্তরে উপস্থাপন করা হয়েছে।" : "Each profile is structured by what they did, where it mattered, and why it shaped history."}
      />

      <section className="theme-surface rounded-2xl border p-5 md:p-6">
        <SectionTitle
          title={isBn ? "ফিল্টার ও সার্চ" : "Filters and Search"}
          subtitle={isBn ? "কিওয়ার্ড, সত্তার ধরন ও ভূমিকা দিয়ে তালিকা বাছাই করুন" : "Filter by keyword, entity type, and role group"}
        />
        <form className="mt-4 grid gap-3 md:grid-cols-[1fr_190px_220px_auto]" method="get" action={`/${locale}/figures`}>
          <input
            name="q"
            defaultValue={q}
            placeholder={isBn ? "নাম, ভূমিকা বা ট্যাগ" : "Search name, role, or tag"}
            className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm"
          />
          <select name="entity" defaultValue={entityValue} className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm">
            <option value="">{isBn ? "সব সত্তা" : "All entities"}</option>
            <option value="person">{isBn ? "ব্যক্তি" : "Person"}</option>
            <option value="party">{isBn ? "দল" : "Party"}</option>
            <option value="alliance">{isBn ? "জোট" : "Alliance"}</option>
            <option value="organization">{isBn ? "সংস্থা" : "Organization"}</option>
          </select>
          <select name="group" defaultValue={groupValue} className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm">
            <option value="">{isBn ? "সব গ্রুপ" : "All groups"}</option>
            <option value="leader">{isBn ? "নেতৃত্ব" : "Leader"}</option>
            <option value="coordinator">{isBn ? "সমন্বয়ক" : "Coordinator"}</option>
            <option value="martyr">{isBn ? "শহীদ" : "Martyr"}</option>
            <option value="organization">{isBn ? "সংগঠন" : "Organization"}</option>
            <option value="collective">{isBn ? "সম্মিলিত কণ্ঠ" : "Collective"}</option>
          </select>
          <button type="submit" className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-amber-500/40 px-4 text-sm font-medium text-accent hover:bg-amber-500/10">
            {isBn ? "প্রয়োগ করুন" : "Apply"}
          </button>
        </form>
      </section>

      <div>
        <div className="flex items-center justify-between gap-3">
          <SectionTitle title={isBn ? "ব্যক্তিত্ব ডিরেক্টরি" : "Figure Directory"} subtitle={`${figures.length} ${isBn ? "প্রোফাইল" : "profiles"}`} />
          {(q || entityValue || groupValue) ? (
            <Link href={`/${locale}/figures`} className="text-sm font-medium text-amber-400 hover:text-amber-300">
              {isBn ? "ফিল্টার রিসেট" : "Reset filters"}
            </Link>
          ) : null}
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {pagedFigures.map((figure, index) => (
            <FigureProfileCard key={figure.id} figure={figure} locale={locale as Locale} featured={index === 0 && safePage === 1} />
          ))}
        </div>
        {!pagedFigures.length ? (
          <div className="theme-surface mt-4 rounded-xl border p-6 text-sm theme-muted">
            {isBn ? "কোনো ফলাফল পাওয়া যায়নি।" : "No results found."}
          </div>
        ) : null}
        <div className="mt-6 flex items-center justify-between">
          {safePage > 1 ? (
            <Link href={`/${locale}/figures${buildQuery({ q, entity: entityValue, group: groupValue, page: safePage - 1 })}`} aria-label={isBn ? "আগের পাতা" : "Previous page"} className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent hover:bg-amber-500/10">
              {isBn ? "আগে" : "Previous"}
            </Link>
          ) : <span />}
          <p className="theme-muted text-sm">{isBn ? `${safePage} / ${totalPages}` : `Page ${safePage} of ${totalPages}`}</p>
          {safePage < totalPages ? (
            <Link href={`/${locale}/figures${buildQuery({ q, entity: entityValue, group: groupValue, page: safePage + 1 })}`} aria-label={isBn ? "পরের পাতা" : "Next page"} className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent hover:bg-amber-500/10">
              {isBn ? "পরে" : "Next"}
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  );
}
