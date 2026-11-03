import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllTopics } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale, type Topic } from "@/types/content";

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
    title: isBn ? "টপিকস" : "Topics",
    description: isBn
      ? "বিষয়ভিত্তিক টপিক হাব থেকে ধারাবাহিকভাবে ইতিহাস শিখুন।"
      : "Explore topic hubs to learn history through connected themes.",
    canonicalPath: `/${locale}/topics`,
    languagePathWithoutLocale: "/topics",
    type: "website",
  });
}

// Topic hubs are grouped by the part of the story they cover, in chronological order.
// A hub not listed here still appears, under "More topics".
const TOPIC_GROUPS: Array<{ id: string; en: string; bn: string; slugs: string[] }> = [
  { id: "early", en: "Early Bengal", bn: "প্রাচীন ও আদি মধ্যযুগীয় বাংলা", slugs: ["ancient-and-early-medieval-bengal", "pala-sena-period-and-knowledge-culture", "sultanate-frontier-and-regional-islamization"] },
  { id: "colonial", en: "Mughal and colonial Bengal", bn: "মুঘল ও ঔপনিবেশিক বাংলা", slugs: ["mughal-bengal-and-regional-resistance", "colonial-conquest-revenue-and-resistance", "peasant-religious-and-rural-resistance", "partition-of-bengal-1905"] },
  { id: "partition", en: "Partition and Pakistan", bn: "বিভাজন ও পাকিস্তান আমল", slugs: ["late-colonial-muslim-politics-and-agrarian-mobilization", "partition-and-identity", "pakistan-period-state-and-national-awakening", "language-movement-and-mother-language-day"] },
  { id: "bangladesh", en: "Liberation and Bangladesh", bn: "মুক্তিযুদ্ধ ও বাংলাদেশ", slugs: ["liberation-war-1971", "state-formation-crisis-and-military-rule-1972-1990", "democracy-and-civic-movements", "post-1971-state-crises-and-civic-contestation"] },
  { id: "culture", en: "Culture and memory", bn: "সংস্কৃতি ও স্মৃতি", slugs: ["bengal-culture-literature-and-memory"] },
];
const OVERVIEW_SLUG = "bangladesh-history";

export default async function TopicsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const isBn = locale === "bn";
  const topics = await getAllTopics(locale);
  const bySlug = new Map(topics.map((topic) => [topic.slug, topic] as const));
  const overview = bySlug.get(OVERVIEW_SLUG);
  const grouped = new Set<string>([OVERVIEW_SLUG, ...TOPIC_GROUPS.flatMap((group) => group.slugs)]);
  const groups = [
    ...TOPIC_GROUPS.map((group) => ({ id: group.id, title: isBn ? group.bn : group.en, items: group.slugs.map((slug) => bySlug.get(slug)).filter((t): t is Topic => Boolean(t)) })),
    { id: "more", title: isBn ? "আরও টপিক" : "More topics", items: topics.filter((topic) => !grouped.has(topic.slug)) },
  ].filter((group) => group.items.length > 0);

  const counts = (topic: Topic) => {
    const chapters = topic.eventSlugs.length;
    const people = topic.figureIds?.length ?? 0;
    return isBn
      ? `${chapters.toLocaleString("bn-BD")}টি অধ্যায় · ${people.toLocaleString("bn-BD")} ব্যক্তি`
      : `${chapters} ${chapters === 1 ? "chapter" : "chapters"} · ${people} people`;
  };

  return (
    <div className="space-y-14 md:space-y-20">
      <HeroSection
        showCollage={false}
        title={isBn ? "টপিক হাব" : "Topic hubs"}
        tagline={isBn ? "একটি প্রশ্ন ধরে ইতিহাসে প্রবেশ করুন" : "Follow one question through the centuries"}
        intro={
          isBn
            ? "প্রতিটি হাবে সংশ্লিষ্ট অধ্যায়, ব্যক্তি ও সূত্র একটি পড়ার ক্রমে সাজানো। নতুন হলে সাধারণ ইতিহাস দিয়ে শুরু করুন।"
            : "Each hub gathers related chapters, people and sources into a reading order. New to the subject? Start with the overview."
        }
      />

      {overview ? (
        <section aria-labelledby="topics-start">
          <Link href={`/${locale}/topics/${overview.slug}`} className="paper paper-stained group block rounded-sm p-6 md:p-9">
            <p id="topics-start" className="text-eyebrow">{isBn ? "এখান থেকে শুরু করুন" : "Start here"}</p>
            <h2 className="text-display mt-3 text-3xl font-semibold group-hover:text-accent md:text-4xl">{overview.title}</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed md:text-lg">{overview.tagline}</p>
            <p className="theme-muted mt-4 text-sm">{counts(overview)}</p>
            <span className="link-underline mt-5 inline-flex min-h-[44px] items-center text-sm font-semibold text-accent">
              {isBn ? "হাবটি খুলুন" : "Open the hub"} <span className="arrow ml-2">→</span>
            </span>
          </Link>
        </section>
      ) : null}

      {groups.map((group) => (
        <section key={group.id} aria-labelledby={`topics-${group.id}`}>
          <SectionTitle title={group.title} headingId={`topics-${group.id}`} />
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {group.items.map((topic) => (
              <li key={topic.slug}>
                <Link href={`/${locale}/topics/${topic.slug}`} className="theme-surface group flex h-full flex-col rounded-xl border p-5 hover:border-[color:var(--gold)]">
                  <h3 className="text-display text-xl font-semibold leading-snug group-hover:text-accent">{topic.title}</h3>
                  <p className="theme-muted mt-2 flex-1 text-sm leading-relaxed">{topic.tagline}</p>
                  <p className="text-eyebrow mt-4">{counts(topic)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
