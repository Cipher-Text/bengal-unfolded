import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { getAllResourceIds, getEventsByResourceIdChronological, getResource, getTopicsByResourceId } from "@/lib/content";
import { CATEGORY_LABELS, EVIDENCE_LABELS, QUALITY_HELP, QUALITY_LABELS } from "@/lib/resource-labels";
import { buildPageMetadata, normalizeMetaDescription } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export async function generateStaticParams() {
  const resourceIds = await getAllResourceIds();
  return SUPPORTED_LOCALES.flatMap((locale) => resourceIds.map((id) => ({ locale, id })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};

  try {
    const resource = await getResource(locale, id);
    const description = normalizeMetaDescription(
      resource.seoDescription ?? resource.note,
      locale === "bn"
        ? "এই সূত্রের প্রেক্ষাপট, ব্যবহার এবং সম্পর্কিত ঐতিহাসিক ঘটনাগুলো দেখুন।"
        : "Review this source's context, use, and related historical events.",
    );
    return buildPageMetadata({
      locale: locale as Locale,
      title: resource.seoTitle ?? resource.title,
      description,
      canonicalPath: `/${locale}/resources/${id}`,
      languagePathWithoutLocale: `/resources/${id}`,
      type: "article",
    });
  } catch {
    return {};
  }
}

export default async function ResourceDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  let resource: Awaited<ReturnType<typeof getResource>>;
  let events: Awaited<ReturnType<typeof getEventsByResourceIdChronological>>;
  try {
    [resource, events] = await Promise.all([getResource(locale, id), getEventsByResourceIdChronological(locale, id)]);
  } catch {
    notFound();
  }
  const relatedTopics = await getTopicsByResourceId(locale, id);

  const resourceJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: resource.title,
    description: resource.note,
    url: `https://bengalunfolded.com/${locale}/resources/${id}`,
    creator: { "@type": "Person", name: resource.attribution },
    isPartOf: events.map((event) => ({
      "@type": "Article",
      name: event.title,
      url: `https://bengalunfolded.com/${locale}/events/${event.slug}`,
    })),
  };
  const isBn = locale === "bn";
  const t = isBn
    ? { facts: "এক নজরে", type: "ধরন", reliability: "নির্ভরযোগ্যতা", evidence: "প্রমাণের শক্তি", why: "কেন গুরুত্বপূর্ণ", open: "মূল সূত্রটি খুলুন", noLink: "এই সূত্রের কোনো অনলাইন লিংক নথিভুক্ত নেই।", creator: "এই স্রষ্টার আরও সূত্র", used: "যেসব অধ্যায়ে ব্যবহৃত", topics: "সম্পর্কিত টপিক", showMore: (n: number) => `আরও ${n.toLocaleString("bn-BD")}টি অধ্যায় দেখুন`, all: "সব সূত্র" }
    : { facts: "At a glance", type: "Type", reliability: "Reliability", evidence: "Evidence strength", why: "Why it matters", open: "Open the original source", noLink: "No online link is recorded for this source.", creator: "More from this creator", used: "Used in these chapters", topics: "Related topics", showMore: (n: number) => `Show ${n} more chapters`, all: "All sources" };
  const VISIBLE = 8;
  const facts: Array<[string, string]> = [
    [t.type, `${CATEGORY_LABELS[locale as Locale][resource.category]}${resource.subcategory ? ` · ${resource.subcategory}` : ""}`],
    [t.reliability, `${QUALITY_LABELS[locale as Locale][resource.quality]} — ${QUALITY_HELP[locale as Locale][resource.quality]}`],
  ];
  if (resource.evidenceLevel) facts.push([t.evidence, EVIDENCE_LABELS[locale as Locale][resource.evidenceLevel]]);

  const eventItem = (event: (typeof events)[number]) => (
    <li key={event.slug}>
      <Link href={`/${locale}/events/${event.slug}`} className="theme-surface group block rounded-xl border p-4 hover:border-[color:var(--gold)]">
        <p className="text-eyebrow">{event.year}</p>
        <h3 className="text-display mt-1 text-lg font-semibold leading-snug group-hover:text-accent">{event.title}</h3>
      </Link>
    </li>
  );

  return (
    <div className="space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(resourceJsonLd) }} />
      <HeroSection showCollage={false} title={resource.title} tagline={resource.attribution} intro={resource.note} />

      <section aria-labelledby="resource-facts">
        <h2 id="resource-facts" className="sr-only">{t.facts}</h2>
        <dl className="grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2 lg:grid-cols-3" style={{ background: "var(--border)", borderColor: "var(--border)" }}>
          {facts.map(([term, value]) => (
            <div key={term} className="p-4" style={{ background: "var(--surface-elev)" }}>
              <dt className="text-eyebrow">{term}</dt>
              <dd className="mt-1 text-base font-semibold leading-snug">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {resource.href ? (
            <a href={resource.href} target="_blank" rel="noopener noreferrer" className="btn-ink">
              {t.open}
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <p className="theme-muted text-sm">{t.noLink}</p>
          )}
          <Link href={`/${locale}/creators/${resource.creatorId}`} className="btn-vintage">
            {t.creator}
          </Link>
        </div>
      </section>

      {resource.whyItMatters ? (
        <section aria-labelledby="resource-why">
          <h2 id="resource-why" className="text-display text-2xl font-semibold md:text-3xl">{t.why}</h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed md:text-lg">{resource.whyItMatters}</p>
        </section>
      ) : null}

      {events.length > 0 ? (
        <section aria-labelledby="resource-events">
          <h2 id="resource-events" className="text-display text-2xl font-semibold md:text-3xl">{t.used}</h2>
          <ol className="mt-4 grid gap-3 md:grid-cols-2">{events.slice(0, VISIBLE).map(eventItem)}</ol>
          {events.length > VISIBLE ? (
            <details className="mt-3">
              <summary className="btn-vintage cursor-pointer list-none">{t.showMore(events.length - VISIBLE)}</summary>
              <ol className="mt-3 grid gap-3 md:grid-cols-2">{events.slice(VISIBLE).map(eventItem)}</ol>
            </details>
          ) : null}
        </section>
      ) : null}

      {relatedTopics.length > 0 ? (
        <section aria-labelledby="resource-topics">
          <h2 id="resource-topics" className="text-eyebrow">{t.topics}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {relatedTopics.map((topic) => (
              <li key={topic.slug}>
                <Link href={`/${locale}/topics/${topic.slug}`} className="theme-surface inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-medium hover:border-[color:var(--gold)]">
                  {topic.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div>
        <Link href={`/${locale}/resources`} className="link-underline inline-flex min-h-[44px] items-center text-sm font-semibold text-accent">
          ← {t.all}
        </Link>
      </div>
    </div>
  );
}
