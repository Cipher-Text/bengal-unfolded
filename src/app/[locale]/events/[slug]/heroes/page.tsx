import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroProfileCard } from "@/components/HeroProfileCard";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getEventContent, getHeroesByEventSlug } from "@/lib/content";
import { SUPPORTED_EVENT_SLUGS, SUPPORTED_LOCALES, type EventSlug, type Locale } from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => SUPPORTED_EVENT_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_EVENT_SLUGS.includes(slug as EventSlug)) return {};
  const event = await getEventContent(locale, slug);
  return {
    title: `${event.meta.year} Heroes | ${event.meta.title} | Bengal Unfolded`,
    description: `Full hero list for ${event.meta.title}.`,
  };
}

const PAGE_SIZE = 20;

export default async function EventHeroesListPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale, slug } = await params;
  const { page } = await searchParams;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_EVENT_SLUGS.includes(slug as EventSlug)) notFound();

  const [event, heroes] = await Promise.all([getEventContent(locale, slug), getHeroesByEventSlug(locale, slug)]);
  const currentPage = Math.max(1, Number.parseInt(page ?? "1", 10) || 1);
  const totalPages = Math.max(1, Math.ceil(heroes.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const pagedHeroes = heroes.slice(start, start + PAGE_SIZE);

  return (
    <div className="space-y-8">
      <HeroSection
        title={locale === "bn" ? `${event.meta.year} সালের নায়করা` : `${event.meta.year} Heroes`}
        tagline={event.meta.title}
        intro={locale === "bn" ? `${event.meta.year} অধ্যায়ের সাথে যুক্ত নায়ক, শহীদ, সমন্বয়ক ও সম্মিলিত শক্তির পূর্ণ তালিকা।` : `Full list of heroes, martyrs, coordinators, and collectives associated with ${event.meta.year}.`}
      />

      <div>
        <SectionTitle title={locale === "bn" ? "পূর্ণ নায়ক তালিকা" : "Full Hero List"} subtitle={`${heroes.length} ${locale === "bn" ? "প্রোফাইল" : "profiles"}`} />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {pagedHeroes.map((hero, index) => (
            <HeroProfileCard key={hero.id} hero={hero} locale={locale as Locale} featured={index === 0 && safePage === 1} />
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between">
          {safePage > 1 ? (
            <Link href={`/${locale}/events/${slug}/heroes?page=${safePage - 1}`} className="inline-flex rounded-lg border border-amber-500/40 px-3 py-1.5 text-sm text-amber-400 hover:bg-amber-500/10">
              Previous
            </Link>
          ) : <span />}
          <p className="theme-muted text-sm">Page {safePage} of {totalPages}</p>
          {safePage < totalPages ? (
            <Link href={`/${locale}/events/${slug}/heroes?page=${safePage + 1}`} className="inline-flex rounded-lg border border-amber-500/40 px-3 py-1.5 text-sm text-amber-400 hover:bg-amber-500/10">
              Next
            </Link>
          ) : <span />}
        </div>
      </div>
    </div>
  );
}
