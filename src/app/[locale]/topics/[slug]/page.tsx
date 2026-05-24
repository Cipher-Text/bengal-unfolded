import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import {
  getAllTopicSlugs,
  getAllTopics,
  getEventMeta,
  getFigure,
  getPeriod,
  getPlace,
  getResource,
  getTopic,
} from "@/lib/content";
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
      title: topic.seoTitle ?? `${topic.title} | Topic Hub`,
      description: topic.seoDescription ?? topic.description,
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
  const figureCards = await Promise.all(
    (topic.figureIds ?? []).map(async (figureId) => ({
      id: figureId,
      meta: await getFigure(locale, figureId),
    })),
  );
  const resourceCards = await Promise.all(
    (topic.resourceIds ?? []).map(async (resourceId) => ({
      id: resourceId,
      meta: await getResource(locale, resourceId),
    })),
  );
  const learningPathCards = await Promise.all(
    (topic.learningPath ?? []).map(async (item) => {
      if (item.type === "event") {
        const meta = await getEventMeta(locale, item.id);
        return { ...item, href: `/${locale}/events/${item.id}`, label: meta.title };
      }
      if (item.type === "figure") {
        const meta = await getFigure(locale, item.id);
        return { ...item, href: `/${locale}/figures/${item.id}`, label: meta.name };
      }
      if (item.type === "resource") {
        const meta = await getResource(locale, item.id);
        return { ...item, href: `/${locale}/resources/${item.id}`, label: meta.title };
      }
      if (item.type === "place") {
        const meta = await getPlace(locale as Locale, item.id);
        return { ...item, href: `/${locale}/places/${item.id}`, label: meta.title };
      }
      if (item.type === "period") {
        const meta = await getPeriod(locale as Locale, item.id);
        return { ...item, href: `/${locale}/periods/${item.id}`, label: meta.title };
      }
      if (item.type === "topic") {
        const meta = await getTopic(locale, item.id);
        return { ...item, href: `/${locale}/topics/${item.id}`, label: meta.title };
      }
      return { ...item, href: `/${locale}`, label: item.id };
    }),
  );

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: topic.title,
    description: topic.description,
    url: `https://bengalunfolded.com/${locale}/topics/${topic.slug}`,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: "https://bengalunfolded.com" },
    inLanguage: localeLanguageTag(locale as Locale),
    keywords: [
      ...(topic.keywords ?? []),
      ...(topic.primaryKeywords ?? []),
      ...(topic.secondaryKeywords ?? []),
    ],
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
        {topic.beginnerSummary ? (
          <p className="mt-3 text-sm leading-relaxed">
            <span className="font-semibold">{locale === "bn" ? "শুরুর সারাংশ: " : "Beginner summary: "}</span>
            {topic.beginnerSummary}
          </p>
        ) : null}
        {topic.advancedSummary ? (
          <p className="theme-muted mt-2 text-sm leading-relaxed">
            <span className="font-semibold">{locale === "bn" ? "উন্নত পাঠ: " : "Advanced summary: "}</span>
            {topic.advancedSummary}
          </p>
        ) : null}
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

      {figureCards.length > 0 ? (
        <section>
          <SectionTitle
            title={locale === "bn" ? "সম্পর্কিত ব্যক্তিত্ব" : "Related Figures"}
            subtitle={locale === "bn" ? `${figureCards.length}টি ব্যক্তিত্ব` : `${figureCards.length} figures`}
          />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {figureCards.map(({ id, meta }) => (
              <Link key={id} href={`/${locale}/figures/${id}`} className="theme-surface rounded-xl border p-4 hover:border-amber-500/40">
                <h3 className="text-lg font-semibold">{meta.name}</h3>
                <p className="theme-muted mt-1 text-sm">{meta.role}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {resourceCards.length > 0 ? (
        <section>
          <SectionTitle
            title={locale === "bn" ? "পড়ার রিসোর্স" : "Reading Resources"}
            subtitle={locale === "bn" ? "উৎসভিত্তিক নির্বাচিত পাঠ" : "Selected source-backed references"}
          />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {resourceCards.map(({ id, meta }) => (
              <Link key={id} href={`/${locale}/resources/${id}`} className="theme-surface rounded-xl border p-4 hover:border-amber-500/40">
                <h3 className="text-lg font-semibold">{meta.title}</h3>
                <p className="theme-muted mt-1 text-sm">{meta.attribution}</p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {learningPathCards.length > 0 ? (
        <section>
          <SectionTitle
            title={locale === "bn" ? "শেখার পথ" : "Learning Path"}
            subtitle={locale === "bn" ? "ধাপে ধাপে সম্পর্কিত পেজে যান" : "Follow these links in sequence"}
          />
          <div className="mt-4 space-y-3">
            {learningPathCards.map((step, index) => (
              <Link key={`${step.type}-${step.id}-${index}`} href={step.href} className="theme-surface block rounded-xl border p-4 hover:border-amber-500/40">
                <p className="text-sm text-accent">{`${index + 1}. ${step.type}`}</p>
                <h3 className="text-lg font-semibold">{step.label}</h3>
                {step.reason ? <p className="theme-muted mt-1 text-sm">{step.reason}</p> : null}
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {topic.faq && topic.faq.length > 0 ? (
        <section>
          <SectionTitle
            title={locale === "bn" ? "প্রশ্নোত্তর" : "FAQ"}
            subtitle={locale === "bn" ? "এই টপিকের সাধারণ প্রশ্ন" : "Common questions for this topic"}
          />
          <div className="mt-4 space-y-3">
            {topic.faq.map((item, index) => (
              <article key={`${item.question}-${index}`} className="theme-surface rounded-xl border p-4">
                <h3 className="text-base font-semibold">{item.question}</h3>
                <p className="theme-muted mt-2 text-sm leading-relaxed">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

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
