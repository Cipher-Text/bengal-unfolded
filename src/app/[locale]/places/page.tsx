import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllPlaces, getEventsByPlaceId } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import {
  SUPPORTED_LOCALES,
  type Locale,
} from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};

  const isBn = locale === "bn";
  return buildPageMetadata({
    locale: locale as Locale,
    title: isBn ? "স্থানসমূহ | Bengal Unfolded" : "Places | Bengal Unfolded",
    description: isBn
      ? "ঐতিহাসিক স্থানভিত্তিক ঘটনা একসাথে দেখুন।"
      : "Explore historical places and their related events.",
    canonicalPath: `/${locale}/places`,
    languagePathWithoutLocale: "/places",
    type: "website",
  });
}

export default async function PlacesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  const isBn = locale === "bn";
  const places = await getAllPlaces(locale);
  const placeRows = await Promise.all(
    places.map(async (place) => {
      const events = await getEventsByPlaceId(locale, place.id);
      return { place, eventCount: events.length };
    }),
  );

  return (
    <div className="space-y-8">
      <HeroSection
        title={isBn ? "স্থানসমূহ" : "Places"}
        tagline={
          isBn
            ? "স্থানভিত্তিক ঐতিহাসিক মানচিত্র"
            : "Place-based historical map"
        }
        intro={
          isBn
            ? "বাংলা/বাংলাদেশের ইতিহাসকে স্থানভিত্তিকভাবে অন্বেষণ করুন।"
            : "Explore Bengal/Bangladesh history through place-centered pages."
        }
      />

      <section>
        <SectionTitle
          title={isBn ? "সব স্থান" : "All Places"}
          subtitle={
            isBn
              ? `${placeRows.length}টি স্থান`
              : `${placeRows.length} place${placeRows.length !== 1 ? "s" : ""}`
          }
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {placeRows.map(({ place, eventCount }) => (
            <Link
              key={place.id}
              href={`/${locale}/places/${place.id}`}
              className="theme-surface block rounded-2xl border p-5 hover:border-amber-500/40"
            >
              <p className="theme-muted text-xs tracking-[0.2em] uppercase">
                {place.regionType}
              </p>
              <h3 className="mt-2 text-xl font-semibold">{place.title}</h3>
              <p className="theme-muted mt-2 text-sm">{place.subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed">{place.description}</p>
              <p className="theme-muted mt-4 text-xs">
                {isBn
                  ? `${eventCount}টি সম্পর্কিত ঘটনা`
                  : `${eventCount} related event${eventCount !== 1 ? "s" : ""}`}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
