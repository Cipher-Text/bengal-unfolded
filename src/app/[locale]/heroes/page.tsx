import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroProfileCard } from "@/components/HeroProfileCard";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllHeroes } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { page } = await searchParams;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  const currentPage = Math.max(1, Number.parseInt(page ?? "1", 10) || 1);
  const canonical = currentPage > 1 ? `/${locale}/heroes?page=${currentPage}` : `/${locale}/heroes`;
  return buildPageMetadata({
    locale: locale as Locale,
    title: `Heroes | ${locale.toUpperCase()} | Bengal Unfolded`,
    description: "Explore all heroes and key figures connected to Bengal Unfolded events.",
    canonicalPath: canonical,
    languagePathWithoutLocale: "/heroes",
    noIndex: currentPage > 1,
  });
}

const PAGE_SIZE = 20;

export default async function HeroesListPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const { page } = await searchParams;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  const heroes = await getAllHeroes(locale);
  const currentPage = Math.max(1, Number.parseInt(page ?? "1", 10) || 1);
  const totalPages = Math.max(1, Math.ceil(heroes.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pagedHeroes = heroes.slice(start, start + PAGE_SIZE);

  return (
    <div className="space-y-8">
      <HeroSection
        title={locale === "bn" ? "সকল নায়ক ও গুরুত্বপূর্ণ ব্যক্তিত্ব" : "All Heroes & Key Figures"}
        tagline={locale === "bn" ? "অবদান, প্রেক্ষাপট ও প্রভাবভিত্তিক ডিরেক্টরি" : "A contribution-first, context-rich directory"}
        intro={locale === "bn" ? "প্রতিটি প্রোফাইলে কী করেছেন, কোথায় করেছেন, কেন গুরুত্বপূর্ণ—এই তিন স্তরে উপস্থাপন করা হয়েছে।" : "Each profile is structured by what they did, where it mattered, and why it shaped history."}
      />

      <div>
        <SectionTitle title={locale === "bn" ? "হিরো ডিরেক্টরি" : "Hero Directory"} subtitle={`${heroes.length} ${locale === "bn" ? "প্রোফাইল" : "profiles"}`} />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {pagedHeroes.map((hero, index) => (
            <HeroProfileCard key={hero.id} hero={hero} locale={locale as Locale} featured={index === 0 && safePage === 1} />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          {safePage > 1 ? (
            <Link href={`/${locale}/heroes?page=${safePage - 1}`} aria-label={locale === "bn" ? "আগের পাতা" : "Previous page"} className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent hover:bg-amber-500/10">
              {locale === "bn" ? "আগে" : "Previous"}
            </Link>
          ) : <span />}
          <p className="theme-muted text-sm">{locale === "bn" ? `${safePage} / ${totalPages}` : `Page ${safePage} of ${totalPages}`}</p>
          {safePage < totalPages ? (
            <Link href={`/${locale}/heroes?page=${safePage + 1}`} aria-label={locale === "bn" ? "পরের পাতা" : "Next page"} className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent hover:bg-amber-500/10">
              {locale === "bn" ? "পরে" : "Next"}
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  );
}
