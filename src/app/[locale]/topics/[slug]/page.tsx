import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllTopicSlugs, getAllTopics, getEventMeta, getTopic } from "@/lib/content";
import { buildPageMetadata, localeLanguageTag, SITE_NAME } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export async function generateStaticParams() {
  const slugs = await getAllTopicSlugs();
  return SUPPORTED_LOCALES.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};

  try {
    const topic = await getTopic(locale, slug);
    return buildPageMetadata({
      locale: locale as Locale,
      title: `${topic.title} | Topic Hub`,
      description: topic.description,
      canonicalPath: `/${locale}/topics/${slug}`,
      languagePathWithoutLocale: `/topics/${slug}`,
      type: "website",
    });
  } catch {
    return {};
  }
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  let topic: Awaited<ReturnType<typeof getTopic>>;
  let allTopics: Awaited<ReturnType<typeof getAllTopics>>;
  try {
    [topic, allTopics] = await Promise.all([getTopic(locale, slug), getAllTopics(locale)]);
  } catch {
    notFound();
  }

  const relatedTopics = allTopics
    .filter((item) => item.slug !== topic.slug)
    .sort((a, b) => {
      const priorityDiff = (a.priority ?? Number.MAX_SAFE_INTEGER) - (b.priority ?? Number.MAX_SAFE_INTEGER);
      if (priorityDiff !== 0) return priorityDiff;
      return a.title.localeCompare(b.title);
    });

  const eventCards = await Promise.all(
    topic.eventSlugs.map(async (eventSlug) => ({
      slug: eventSlug,
      meta: await getEventMeta(locale, eventSlug),
    })),
  );

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: topic.title,
    description: topic.description,
    url: `https://bengalunfolded.com/${locale}/topics/${topic.slug}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: "https://bengalunfolded.com" },
    inLanguage: localeLanguageTag(locale as Locale),
    keywords: topic.keywords,
  };

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />

      <HeroSection title={topic.title} tagline={topic.tagline} intro={topic.intro} />

      <section className="theme-surface-soft rounded-2xl border border-amber-400/20 p-6 md:p-8">
        <SectionTitle
          title={locale === "bn" ? "টপিক ওভারভিউ" : "Topic Overview"}
          subtitle={topic.description}
        />
      </section>

      <section>
        <SectionTitle
          title={locale === "bn" ? "সংযুক্ত ইভেন্টসমূহ" : "Connected Events"}
          subtitle={locale === "bn" ? `${topic.eventSlugs.length}টি ইভেন্ট` : `${topic.eventSlugs.length} events`}
        />
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {eventCards.map(({ slug: eventSlug, meta }) => (
            <Link
              key={eventSlug}
              href={`/${locale}/events/${eventSlug}`}
              className="theme-surface rounded-xl border p-4 hover:border-amber-500/40"
            >
              <p className="text-sm text-accent">{meta.year}</p>
              <h3 className="mt-1 text-lg font-semibold">{meta.title}</h3>
              <p className="theme-muted mt-2 text-sm leading-relaxed">
                {locale === "bn" ? "ইভেন্টের বিস্তারিত পেজে যান" : "Open the full event detail page"}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {relatedTopics.length > 0 ? (
        <section>
          <SectionTitle
            title={locale === "bn" ? "আরও টপিক" : "More Topics"}
            subtitle={locale === "bn" ? "সম্পর্কিত টপিক হাবসমূহ" : "Related topic hubs"}
          />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {relatedTopics.map((relatedTopic) => (
              <Link
                key={relatedTopic.slug}
                href={`/${locale}/topics/${relatedTopic.slug}`}
                className="theme-surface rounded-xl border p-4 hover:border-amber-500/40"
              >
                <h3 className="text-lg font-semibold">{relatedTopic.title}</h3>
                <p className="theme-muted mt-1 text-sm">{relatedTopic.description}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
