import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { EventFiguresPagination } from "@/components/EventFiguresPagination";
import { HeroSection } from "@/components/HeroSection";
import { getEventMetaForDisplay, getFiguresByEventSlug } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_EVENT_SLUGS, SUPPORTED_LOCALES, type EventSlug, type Locale } from "@/types/content";

export const dynamic = "force-static";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) => SUPPORTED_EVENT_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_EVENT_SLUGS.includes(slug as EventSlug)) return {};
  const eventMeta = await getEventMetaForDisplay(locale, slug);
  return buildPageMetadata({
    locale: locale as Locale,
    title: `${eventMeta.year} Figures — ${eventMeta.title}`,
    description: `Full figure list for ${eventMeta.title}.`,
    canonicalPath: `/${locale}/events/${slug}/figures`,
    languagePathWithoutLocale: `/events/${slug}/figures`,
  });
}

export default async function EventFiguresListPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale) || !SUPPORTED_EVENT_SLUGS.includes(slug as EventSlug)) notFound();

  const [eventMeta, figures] = await Promise.all([getEventMetaForDisplay(locale, slug), getFiguresByEventSlug(locale, slug)]);

  return (
    <div className="space-y-8">
      <HeroSection
        title={locale === "bn" ? `${eventMeta.year} সালের ব্যক্তিত্বরা` : `${eventMeta.year} Figures`}
        tagline={eventMeta.title}
        intro={locale === "bn" ? `${eventMeta.year} অধ্যায়ের সাথে যুক্ত ব্যক্তিত্ব, শহীদ, সমন্বয়ক ও সম্মিলিত শক্তির পূর্ণ তালিকা।` : `Full list of figures, martyrs, coordinators, and collectives associated with ${eventMeta.year}.`}
      />

      <div>
        <Suspense fallback={<div className="min-h-40" aria-busy="true" />}><EventFiguresPagination figures={figures} locale={locale as Locale} /></Suspense>
      </div>
    </div>
  );
}
