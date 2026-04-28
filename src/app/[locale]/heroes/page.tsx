import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroProfileCard } from "@/components/HeroProfileCard";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllHeroes } from "@/lib/content";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  return {
    title: `Heroes | ${locale.toUpperCase()} | Bengal Unfolded`,
    description: "Explore all heroes and key figures connected to Bengal Unfolded events.",
  };
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
        title="All Heroes & Key Figures"
        tagline="People connected across multiple events"
        intro="Browse the complete list and open each profile for related events and details."
      />

      <div>
        <SectionTitle title="Hero Directory" subtitle={`${heroes.length} profiles`} />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {pagedHeroes.map((hero, index) => (
            <HeroProfileCard key={hero.id} hero={hero} locale={locale as Locale} featured={index === 0 && safePage === 1} />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          {safePage > 1 ? (
            <Link href={`/${locale}/heroes?page=${safePage - 1}`} className="inline-flex rounded-lg border border-amber-500/40 px-3 py-1.5 text-sm text-amber-400 hover:bg-amber-500/10">
              Previous
            </Link>
          ) : <span />}
          <p className="theme-muted text-sm">Page {safePage} of {totalPages}</p>
          {safePage < totalPages ? (
            <Link href={`/${locale}/heroes?page=${safePage + 1}`} className="inline-flex rounded-lg border border-amber-500/40 px-3 py-1.5 text-sm text-amber-400 hover:bg-amber-500/10">
              Next
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  );
}
