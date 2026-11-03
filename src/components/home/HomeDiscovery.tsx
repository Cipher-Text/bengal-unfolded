import Image from "next/image";
import Link from "next/link";
import { BrandIcon } from "@/components/BrandIcon";
import { resolveEraId } from "@/lib/eras";
import { SectionTitle } from "@/components/SectionTitle";
import type { EventMeta, Figure, Locale, Period, Place, Topic } from "@/types/content";

const copy = {
  en: {
    stats: ["chapters", "people & groups", "eras", "sources"],
    eras: "The long view",
    erasSub: "Nine eras, from the early delta polities to the present. Choose where to begin.",
    eraCount: (n: number) => `${n} ${n === 1 ? "chapter" : "chapters"}`,
    explore: "Choose how to explore",
    exploreSub: "Three ways into the same archive.",
    paths: [
      { title: "By time", body: "Follow turning points across Bengal’s long chronology.", label: "Open the timeline", href: "/timeline", mark: "01" },
      { title: "By topic", body: "Enter through language, power, resistance, and identity.", label: "Browse topic hubs", href: "/topics", mark: "02" },
      { title: "By people & places", body: "Meet the actors and places that give history its texture.", label: "See people & places", href: "/figures", mark: "03" },
    ],
    topicsLead: "Or follow a thread",
    read: "Read this chapter",
    timeline: "Turning points across the centuries",
    timelineSub: "A short sample of the chronology, from the Pala era to 2024.",
    fullTimeline: "Explore the full timeline",
    people: "People in the record",
    places: "Places in the story",
    allPeople: "All people",
    allPlaces: "All places",
    method: "How we write history here",
    methodSub: "A public-history archive shaped by evidence, context, and care.",
    methodCta: "Read the methodology",
    principles: ["Source-aware writing", "Room for multiple perspectives", "Evidence distinguished from interpretation", "Care with sensitive history"],
    contribute: "Help keep the record open",
    contributeSub: "Spot an error, suggest a source, or help us review a chapter.",
    contributeCta: "Review & collaborate",
    placeCta: "Open place",
  },
  bn: {
    stats: ["অধ্যায়", "ব্যক্তি ও সংগঠন", "যুগ", "সূত্র"],
    eras: "দীর্ঘ পরিসরে",
    erasSub: "প্রাচীন বদ্বীপ-জনপদ থেকে বর্তমান পর্যন্ত নয়টি যুগ। কোথা থেকে শুরু করবেন বেছে নিন।",
    eraCount: (n: number) => `${n.toLocaleString("bn-BD")}টি অধ্যায়`,
    explore: "কীভাবে ইতিহাস দেখবেন",
    exploreSub: "একই আর্কাইভে ঢোকার তিনটি পথ।",
    paths: [
      { title: "সময়ের ধারায়", body: "বঙ্গের দীর্ঘ ইতিহাসের গুরুত্বপূর্ণ মোড়গুলো অনুসরণ করুন।", label: "টাইমলাইন খুলুন", href: "/timeline", mark: "০১" },
      { title: "বিষয় ধরে", body: "ভাষা, ক্ষমতা, প্রতিরোধ ও পরিচয়ের ভেতর দিয়ে প্রবেশ করুন।", label: "বিষয়ভিত্তিক হাব দেখুন", href: "/topics", mark: "০২" },
      { title: "মানুষ ও স্থান ধরে", body: "ইতিহাসকে প্রাণ দেয় যে মানুষ ও স্থান, তাদের সঙ্গে পরিচিত হোন।", label: "ব্যক্তি ও স্থান দেখুন", href: "/figures", mark: "০৩" },
    ],
    topicsLead: "অথবা একটি ধারা অনুসরণ করুন",
    read: "অধ্যায়টি পড়ুন",
    timeline: "শতাব্দীর পর শতাব্দীর মোড়",
    timelineSub: "পাল যুগ থেকে ২০২৪ পর্যন্ত কালরেখার একটি সংক্ষিপ্ত নমুনা।",
    fullTimeline: "সম্পূর্ণ টাইমলাইন দেখুন",
    people: "ইতিহাসের মানুষ",
    places: "গল্পের স্থানগুলো",
    allPeople: "সব ব্যক্তিত্ব",
    allPlaces: "সব স্থান",
    method: "এখানে আমরা যেভাবে ইতিহাস লিখি",
    methodSub: "প্রমাণ, প্রেক্ষাপট ও যত্নে গড়া একটি পাবলিক-হিস্ট্রি আর্কাইভ।",
    methodCta: "পদ্ধতি পড়ুন",
    principles: ["সূত্র ও প্রমাণের ভিত্তি", "একাধিক দৃষ্টিভঙ্গির স্থান", "তথ্য ও ব্যাখ্যার পার্থক্য", "সংবেদনশীল ইতিহাসে সতর্কতা"],
    contribute: "ইতিহাসকে আরও নির্ভরযোগ্য করতে সাহায্য করুন",
    contributeSub: "ভুল ধরিয়ে দিন, সূত্র জানান, অথবা একটি অধ্যায় পর্যালোচনায় যুক্ত হোন।",
    contributeCta: "রিভিউ ও সহযোগিতা করুন",
    placeCta: "স্থানটি দেখুন",
  },
} as const;

export function EraStrip({ locale, periods, events, stats }: { locale: Locale; periods: Period[]; events: EventMeta[]; stats: number[] }) {
  const c = copy[locale];
  const fmt = (n: number) => n.toLocaleString(locale === "bn" ? "bn-BD" : "en-US");
  return (
    <section aria-labelledby="home-eras">
      <SectionTitle eyebrow={locale === "bn" ? "কালপরিসর" : "The chronology"} title={c.eras} subtitle={c.erasSub} headingId="home-eras" />
      <ol className="mt-7 flex snap-x gap-3 overflow-x-auto pb-3 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        {periods.map((period) => {
          const count = events.filter((event) => resolveEraId(event, periods) === period.id).length;
          return (
            <li key={period.id} className="min-w-[11rem] snap-start md:min-w-0">
              <Link
                href={`/${locale}/periods/${period.id}`}
                className="theme-surface group block h-full rounded-lg border border-t-4 p-3 hover:border-[color:var(--gold)]"
                style={{ borderTopColor: period.themeColor }}
              >
                <p className="text-eyebrow">
                  {period.startYear}–{period.endYear}
                </p>
                <h3 className="text-display mt-2 text-base font-semibold leading-snug group-hover:text-accent">{period.title}</h3>
                <p className="theme-muted mt-2 text-xs">{c.eraCount(count)}</p>
              </Link>
            </li>
          );
        })}
      </ol>
      <p className="theme-muted mt-5 text-sm">
        {stats.map((value, i) => `${fmt(value)} ${c.stats[i]}`).join(" · ")}
      </p>
    </section>
  );
}

export function ExplorePaths({ locale, topics }: { locale: Locale; topics: Topic[] }) {
  const c = copy[locale];
  return (
    <section aria-labelledby="home-explore">
      <SectionTitle eyebrow={locale === "bn" ? "পাঠকের পথ" : "Reader’s paths"} title={c.explore} subtitle={c.exploreSub} headingId="home-explore" />
      <div className="mt-7 grid gap-4 md:grid-cols-3">
        {c.paths.map((path) => (
          <Link key={path.href} href={`/${locale}${path.href}`} className="home-path theme-surface group rounded-xl border p-5">
            <span className="text-eyebrow">{path.mark}</span>
            <h3 className="text-display mt-6 text-2xl font-semibold">{path.title}</h3>
            <p className="theme-muted mt-3 text-sm leading-relaxed">{path.body}</p>
            <span className="link-underline mt-5 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent">
              {path.label} <span className="arrow ml-2">→</span>
            </span>
          </Link>
        ))}
      </div>
      {topics.length ? (
        <div className="mt-8">
          <p className="text-eyebrow">{c.topicsLead}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {topics.slice(0, 6).map((topic) => (
              <li key={topic.slug}>
                <Link
                  href={`/${locale}/topics/${topic.slug}`}
                  className="theme-surface inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-medium hover:border-[color:var(--gold)]"
                >
                  {topic.title}
                  <span aria-hidden="true" className="ml-2">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

export function TimelinePreview({ locale, events }: { locale: Locale; events: EventMeta[] }) {
  const c = copy[locale];
  return (
    <section aria-labelledby="home-timeline">
      <SectionTitle eyebrow={locale === "bn" ? "কালরেখা" : "Chronology sample"} title={c.timeline} subtitle={c.timelineSub} headingId="home-timeline" />
      <ol className="mt-7 border-l-2 border-[color:var(--sepia)]/35 pl-5 md:grid md:grid-cols-3 md:gap-x-5 md:gap-y-8 md:border-l-0 md:pl-0">
        {events.map((event) => (
          <li key={event.slug} className="relative mb-6 md:mb-0">
            <Link href={`/${locale}/events/${event.slug}`} className="group block md:border-t-2 md:border-[color:var(--sepia)]/40 md:pt-4">
              <span
                aria-hidden="true"
                className="absolute -left-[1.62rem] top-1.5 h-3 w-3 rounded-full border-2 border-[color:var(--bg)] md:static md:mb-3 md:block"
                style={{ backgroundColor: event.themeColor }}
              />
              <p className="text-eyebrow">{event.year}</p>
              <h3 className="text-display mt-2 text-xl font-semibold group-hover:text-accent">{event.title}</h3>
              <p className="theme-muted mt-2 line-clamp-3 text-sm leading-relaxed">{event.summary}</p>
            </Link>
          </li>
        ))}
      </ol>
      <div className="mt-8">
        <Link href={`/${locale}/timeline`} className="btn-vintage">
          {c.fullTimeline}
          <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}

// Specific, recognisable sites; region-level nodes ("Bengal Region", "Bangladesh") make weak landing cards.
const FEATURED_PLACE_IDS = ["palashi-plassey", "mahasthangarh", "dhaka-jahangirnagar"];
// Most place records still carry template descriptions; do not show those as if they were content.
const isTemplateDescription = (text: string) => /place (timeline )?node/i.test(text);

export function PeopleAndPlaces({ locale, figures, places }: { locale: Locale; figures: Figure[]; places: Place[] }) {
  const c = copy[locale];
  return (
    <section className="grid gap-10 lg:grid-cols-[1.35fr_1fr]" aria-label={`${c.people} / ${c.places}`}>
      <div>
        <h2 className="text-display text-2xl font-semibold md:text-3xl">{c.people}</h2>
        <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {figures.slice(0, 4).map((figure) => (
            <li key={figure.id}>
              <Link href={`/${locale}/figures/${figure.id}`} className="postcard group block overflow-hidden p-2.5">
                <div className="relative aspect-[4/5] overflow-hidden bg-[color:var(--paper-aged)]">
                  {figure.image ? (
                    <Image src={figure.image} alt={figure.name} fill sizes="(min-width: 1024px) 14vw, 40vw" className="object-cover" />
                  ) : (
                    <BrandIcon className="h-full w-full rounded-none opacity-35" />
                  )}
                </div>
                <h3 className="text-display mt-2.5 text-base font-semibold leading-tight group-hover:text-accent">{figure.name}</h3>
                <p className="theme-muted mt-1 text-xs">{figure.activePeriod ?? [figure.birthYear, figure.deathYear].filter(Boolean).join("–")}</p>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={`/${locale}/figures`} className="link-underline mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent">
          {c.allPeople} <span className="arrow ml-2">→</span>
        </Link>
      </div>
      <div>
        <h2 className="text-display text-2xl font-semibold md:text-3xl">{c.places}</h2>
        <ul className="mt-5 space-y-3">
          {FEATURED_PLACE_IDS.map((id) => places.find((place) => place.id === id)).filter((place): place is Place => Boolean(place)).map((place) => (
            <li key={place.id}>
              <Link href={`/${locale}/places/${place.id}`} className="theme-surface block rounded-xl border p-4 hover:border-[color:var(--gold)]">
                <p className="text-eyebrow">{place.placeType}</p>
                <h3 className="text-display mt-1.5 text-xl font-semibold">{place.title}</h3>
                {isTemplateDescription(place.description) ? null : (
                  <p className="theme-muted mt-1.5 line-clamp-2 text-sm leading-relaxed">{place.description}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
        <Link href={`/${locale}/places`} className="link-underline mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent">
          {c.allPlaces} <span className="arrow ml-2">→</span>
        </Link>
      </div>
    </section>
  );
}

export function EditorialMethod({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <section className="paper paper-stained rounded-sm p-6 md:p-9" aria-labelledby="home-method">
      <SectionTitle eyebrow="Bengal Unfolded" title={c.method} subtitle={c.methodSub} headingId="home-method" />
      <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {c.principles.map((principle, i) => (
          <li key={principle} className="border-t border-[color:var(--sepia)]/30 pt-3">
            <span className="text-eyebrow">0{i + 1}</span>
            <p className="mt-2 text-base font-semibold">{principle}</p>
          </li>
        ))}
      </ul>
      <Link href={`/${locale}/methodology`} className="btn-vintage mt-7">
        {c.methodCta}
        <span className="arrow">→</span>
      </Link>
    </section>
  );
}

export function Contribute({ locale, heading, body }: { locale: Locale; heading: string; body: string }) {
  const c = copy[locale];
  return (
    <section className="grid gap-5 md:grid-cols-[1.15fr_0.85fr]" aria-label={heading}>
      <div>
        <h2 className="text-display text-3xl font-semibold md:text-4xl">{heading}</h2>
        <p className="theme-muted mt-4 max-w-2xl text-base leading-relaxed">{body}</p>
      </div>
      <div className="theme-surface rounded-xl border p-6 md:p-8">
        <h2 className="text-display text-2xl font-semibold">{c.contribute}</h2>
        <p className="theme-muted mt-3 text-sm leading-relaxed">{c.contributeSub}</p>
        <Link href={`/${locale}/join`} className="btn-ink mt-6">
          {c.contributeCta}
          <span className="arrow">→</span>
        </Link>
      </div>
    </section>
  );
}

export const homeCopy = copy;
