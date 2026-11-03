import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getEventsByPlaceIdChronological, getFigure, getPeriod, getPlace, getTopic } from "@/lib/content";
import { eventStartYear } from "@/lib/eras";
import { isTemplatePlaceDescription, PLACE_TYPE_LABELS } from "@/lib/places";
import { buildPageMetadata, localeLanguageTag } from "@/lib/seo";
import {
  SUPPORTED_LOCALES,
  SUPPORTED_PLACE_IDS,
  type Locale,
  type PlaceId,
} from "@/types/content";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    SUPPORTED_PLACE_IDS.map((id) => ({ locale, id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  if (
    !SUPPORTED_LOCALES.includes(locale as Locale) ||
    !SUPPORTED_PLACE_IDS.includes(id as PlaceId)
  )
    return {};
  const place = await getPlace(locale, id);
  return buildPageMetadata({
    locale: locale as Locale,
    title: place.title,
    description: place.subtitle,
    canonicalPath: `/${locale}/places/${id}`,
    languagePathWithoutLocale: `/places/${id}`,
    type: "article",
  });
}

const PLACE_LABELS = {
  en: {
    events: "Chapters set here",
    eventCount: (count: number) => `${count} ${count === 1 ? "chapter" : "chapters"}`,
    inProgress: "In progress",
    showMore: (n: number) => `Show ${n} more chapters`,
    facts: "At a glance",
    type: "Type",
    today: "Today",
    span: "Chapters span",
    names: "Names over time",
    administration: "Who ruled here",
    related: "Related",
    people: "People",
    topics: "Topics",
    eras: "Eras",
    faq: "Questions",
    all: "All places",
  },
  bn: {
    events: "এখানকার অধ্যায়",
    eventCount: (count: number) => `${count.toLocaleString("bn-BD")}টি অধ্যায়`,
    inProgress: "প্রস্তুতাধীন",
    showMore: (n: number) => `আরও ${n.toLocaleString("bn-BD")}টি অধ্যায় দেখুন`,
    facts: "এক নজরে",
    type: "ধরন",
    today: "বর্তমানে",
    span: "অধ্যায়ের সময়কাল",
    names: "সময়ের সঙ্গে নাম",
    administration: "যাঁদের শাসনে ছিল",
    related: "সম্পর্কিত",
    people: "ব্যক্তি",
    topics: "টপিক",
    eras: "যুগ",
    faq: "প্রশ্নোত্তর",
    all: "সব স্থান",
  },
} as const;

const VISIBLE_EVENTS = 10;

export default async function PlaceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  if (
    !SUPPORTED_LOCALES.includes(locale as Locale) ||
    !SUPPORTED_PLACE_IDS.includes(id as PlaceId)
  )
    notFound();

  const [place, events] = await Promise.all([
    getPlace(locale, id),
    getEventsByPlaceIdChronological(locale, id),
  ]);
  const labels = PLACE_LABELS[locale as Locale];
  const isBn = locale === "bn";
  const fmt = (n: number) => n.toLocaleString(isBn ? "bn-BD" : "en-US", { useGrouping: false });

  const settle = async <T,>(promise: Promise<T>): Promise<T | null> => promise.catch(() => null);
  const [people, topics, eras] = await Promise.all([
    Promise.all((place.relatedFigureIds ?? []).slice(0, 8).map((figureId) => settle(getFigure(locale, figureId)))),
    Promise.all((place.relatedTopicIds ?? []).map((slug) => settle(getTopic(locale, slug)))),
    Promise.all((place.relatedPeriodIds ?? []).map((periodId) => settle(getPeriod(locale as Locale, periodId)))),
  ]);

  const years = events.map((event) => eventStartYear(event.slug)).filter((year): year is number => year !== null).sort((a, b) => a - b);
  const yearLabel = (year: number) => (year < 0 ? `${fmt(-year)} ${isBn ? "খ্রিস্টপূর্ব" : "BCE"}` : fmt(year));
  const span = years.length ? (years[0] === years[years.length - 1] ? yearLabel(years[0]) : `${yearLabel(years[0])}–${yearLabel(years[years.length - 1])}`) : undefined;
  const today = [place.modernAdministrativeUnit, place.modernCountry].filter(Boolean).join(", ");
  const typeLabel = PLACE_TYPE_LABELS[isBn ? "bn" : "en"][place.placeType] ?? PLACE_TYPE_LABELS.en.other;
  const hasDescription = !isTemplatePlaceDescription(place.description);
  const facts: Array<[string, string]> = [[labels.type, typeLabel]];
  if (today) facts.push([labels.today, today]);
  if (span) facts.push([labels.span, span]);

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: place.title,
    description: hasDescription ? place.description : place.subtitle,
    url: `https://bengalunfolded.com/${locale}/places/${id}`,
    inLanguage: localeLanguageTag(locale as Locale),
    ...(place.lat !== undefined && place.lon !== undefined ? { geo: { "@type": "GeoCoordinates", latitude: place.lat, longitude: place.lon } } : {}),
  };

  const eventItem = (event: (typeof events)[number]) => (
    <li key={event.slug}>
      <Link href={`/${locale}/events/${event.slug}`} className="theme-surface group block rounded-xl border p-4 hover:border-[color:var(--gold)] md:p-5">
        <p className="text-eyebrow">
          {event.year}
          {event.stub ? ` · ${labels.inProgress}` : ""}
        </p>
        <h3 className="text-display mt-1 text-xl font-semibold leading-snug group-hover:text-accent">{event.title}</h3>
        {event.stub ? null : <p className="theme-muted mt-2 line-clamp-3 text-sm leading-relaxed">{event.summary}</p>}
      </Link>
    </li>
  );

  const chips = (items: Array<{ href: string; label: string }>) => (
    <ul className="mt-3 flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className="theme-surface inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-medium hover:border-[color:var(--gold)]">
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }} />
      <HeroSection showCollage={false} title={place.title} tagline={place.subtitle} intro={hasDescription ? place.description : undefined} />

      <section aria-labelledby="place-facts">
        <h2 id="place-facts" className="sr-only">{labels.facts}</h2>
        <dl className="grid gap-px overflow-hidden rounded-xl border sm:grid-cols-3" style={{ background: "var(--border)", borderColor: "var(--border)" }}>
          {facts.map(([term, value]) => (
            <div key={term} className="p-4" style={{ background: "var(--surface-elev)" }}>
              <dt className="text-eyebrow">{term}</dt>
              <dd className="mt-1 text-base font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {events.length > 0 ? (
        <section aria-labelledby="place-events">
          <SectionTitle title={labels.events} subtitle={labels.eventCount(events.length)} headingId="place-events" />
          <ol className="mt-7 space-y-3">{events.slice(0, VISIBLE_EVENTS).map(eventItem)}</ol>
          {events.length > VISIBLE_EVENTS ? (
            <details className="mt-3">
              <summary className="btn-vintage cursor-pointer list-none">{labels.showMore(events.length - VISIBLE_EVENTS)}</summary>
              <ol className="mt-3 space-y-3">{events.slice(VISIBLE_EVENTS).map(eventItem)}</ol>
            </details>
          ) : null}
        </section>
      ) : (
        <div className="theme-surface rounded-2xl border p-8 text-center">
          <p className="theme-muted text-sm">{isBn ? "এই স্থানের জন্য এখনও কোনো অধ্যায় যোগ করা হয়নি।" : "No chapters have been added for this place yet."}</p>
        </div>
      )}

      {place.nameHistory?.length || place.historicalNames?.length ? (
        <section aria-labelledby="place-names">
          <h2 id="place-names" className="text-display text-2xl font-semibold md:text-3xl">{labels.names}</h2>
          {place.nameHistory?.length ? (
            <ul className="mt-4 space-y-3">
              {place.nameHistory.map((entry, index) => (
                <li key={`${entry.name}-${index}`} className="theme-surface rounded-xl border p-4">
                  <p className="font-semibold">
                    {entry.name}
                    {entry.fromYear || entry.toYear ? <span className="text-eyebrow ml-3">{[entry.fromYear, entry.toYear].filter(Boolean).join("–")}</span> : null}
                  </p>
                  {entry.note ? <p className="theme-muted mt-1 text-sm leading-relaxed">{entry.note}</p> : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-base">{place.historicalNames?.join(" · ")}</p>
          )}
        </section>
      ) : null}

      {place.administrativeHistory?.length ? (
        <section aria-labelledby="place-admin">
          <h2 id="place-admin" className="text-display text-2xl font-semibold md:text-3xl">{labels.administration}</h2>
          <ol className="mt-4 space-y-3 border-l-2 pl-5" style={{ borderColor: "var(--sepia)" }}>
            {place.administrativeHistory.map((entry, index) => (
              <li key={`${entry.label}-${index}`}>
                <p className="text-eyebrow">{[entry.fromYear, entry.toYear].filter(Boolean).join("–")}</p>
                <p className="font-semibold">{entry.label}{entry.authority ? ` · ${entry.authority}` : ""}</p>
                {entry.note ? <p className="theme-muted mt-1 text-sm leading-relaxed">{entry.note}</p> : null}
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {people.some(Boolean) || topics.some(Boolean) || eras.some(Boolean) ? (
        <section aria-labelledby="place-related" className="space-y-6">
          <h2 id="place-related" className="text-display text-2xl font-semibold md:text-3xl">{labels.related}</h2>
          {eras.some(Boolean) ? (
            <div>
              <p className="text-eyebrow">{labels.eras}</p>
              {chips(eras.filter((era): era is NonNullable<typeof era> => Boolean(era)).map((era) => ({ href: `/${locale}/periods/${era.id}`, label: era.title })))}
            </div>
          ) : null}
          {topics.some(Boolean) ? (
            <div>
              <p className="text-eyebrow">{labels.topics}</p>
              {chips(topics.filter((topic): topic is NonNullable<typeof topic> => Boolean(topic)).map((topic) => ({ href: `/${locale}/topics/${topic.slug}`, label: topic.title })))}
            </div>
          ) : null}
          {people.some(Boolean) ? (
            <div>
              <p className="text-eyebrow">{labels.people}</p>
              {chips(people.filter((person): person is NonNullable<typeof person> => Boolean(person)).map((person) => ({ href: `/${locale}/figures/${person.id}`, label: person.name })))}
            </div>
          ) : null}
        </section>
      ) : null}

      {place.faq?.length ? (
        <section aria-labelledby="place-faq">
          <h2 id="place-faq" className="text-display text-2xl font-semibold md:text-3xl">{labels.faq}</h2>
          <div className="mt-4 space-y-3">
            {place.faq.map((item, index) => (
              <article key={`${item.question}-${index}`} className="theme-surface rounded-xl border p-4">
                <h3 className="text-base font-semibold">{item.question}</h3>
                <p className="theme-muted mt-2 text-sm leading-relaxed">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <div>
        <Link href={`/${locale}/places`} className="link-underline inline-flex min-h-[44px] items-center text-sm font-semibold text-accent">
          ← {labels.all}
        </Link>
      </div>
    </div>
  );
}
