import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllPlaces, getEventsByPlaceIdChronological } from "@/lib/content";
import { eventStartYear } from "@/lib/eras";
import { PLACE_GROUPS, PLACE_TYPE_LABELS, placeGroup } from "@/lib/places";
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
    title: isBn ? "স্থানসমূহ" : "Places",
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
  const fmt = (n: number) => n.toLocaleString(isBn ? "bn-BD" : "en-US");
  const fmtYear = (n: number) => n.toLocaleString(isBn ? "bn-BD" : "en-US", { useGrouping: false });
  const places = await getAllPlaces(locale);
  const rows = await Promise.all(
    places.map(async (place) => {
      const events = await getEventsByPlaceIdChronological(locale, place.id);
      // Spans come from the slug start years; the display `year` strings carry notes such as "1666 (January 27)".
      const years = events.map((event) => eventStartYear(event.slug)).filter((year): year is number => year !== null).sort((a, b) => a - b);
      const label = (year: number) => (year < 0 ? `${fmtYear(-year)} ${isBn ? "খ্রিস্টপূর্ব" : "BCE"}` : fmtYear(year));
      const first = years[0];
      const last = years[years.length - 1];
      return { place, count: events.length, span: first === undefined ? undefined : first === last ? label(first) : `${label(first)}–${label(last)}` };
    }),
  );
  const groups = PLACE_GROUPS.map((group) => ({
    ...group,
    items: rows.filter((row) => placeGroup(row.place.placeType) === group.id).sort((a, b) => b.count - a.count || a.place.title.localeCompare(b.place.title)),
  })).filter((group) => group.items.length > 0);

  return (
    <div className="space-y-14 md:space-y-20">
      <HeroSection
        showCollage={false}
        title={isBn ? "স্থানসমূহ" : "Places"}
        tagline={isBn ? "ইতিহাস যেখানে ঘটেছে" : "Where history happened"}
        intro={
          isBn
            ? "নগর, রণক্ষেত্র, প্রত্নস্থান ও অঞ্চল ধরে বাংলার ইতিহাস দেখুন। প্রতিটি স্থানে সেখানকার অধ্যায়গুলো কালক্রমে সাজানো।"
            : "Browse Bengal’s history by city, battlefield, heritage site and region. Each place gathers its chapters in date order."
        }
      />

      <nav aria-label={isBn ? "স্থানের ধরন" : "Place types"} className="-mt-6">
        <ul className="flex flex-wrap gap-2">
          {groups.map((group) => (
            <li key={group.id}>
              <a href={`#places-${group.id}`} className="section-tab inline-flex min-h-[44px] items-center !text-[13px] !tracking-[0.02em] !normal-case">
                {isBn ? group.bn : group.en} <span className="ml-1 opacity-70">({fmt(group.items.length)})</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {groups.map((group) => (
        <section key={group.id} id={`places-${group.id}`} aria-labelledby={`places-title-${group.id}`} className="scroll-mt-28">
          <SectionTitle title={isBn ? group.bn : group.en} subtitle={isBn ? group.bnNote : group.enNote} headingId={`places-title-${group.id}`} />
          <ul className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {group.items.map(({ place, count, span }) => (
              <li key={place.id}>
                <Link href={`/${locale}/places/${place.id}`} className="theme-surface group flex h-full flex-col rounded-xl border p-5 hover:border-[color:var(--gold)]">
                  <p className="text-eyebrow">{PLACE_TYPE_LABELS[isBn ? "bn" : "en"][place.placeType] ?? PLACE_TYPE_LABELS.en.other}</p>
                  <h3 className="text-display mt-2 text-xl font-semibold leading-snug group-hover:text-accent">{place.title}</h3>
                  <p className="theme-muted mt-2 flex-1 text-sm leading-relaxed">{place.subtitle}</p>
                  <p className="text-eyebrow mt-4">
                    {isBn ? `${fmt(count)}টি অধ্যায়` : `${count} ${count === 1 ? "chapter" : "chapters"}`}
                    {span ? ` · ${span}` : ""}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
