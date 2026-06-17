import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllResourceIds, getEventsByResourceIdChronological, getResource, getTopicsByResourceId } from "@/lib/content";
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
      title: resource.seoTitle ?? `${resource.title} | Bengal Unfolded`,
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
  const labels = locale === "bn"
    ? { topicHub: "টপিক হাব", exploreTopicHub: "সম্পর্কিত টপিক দেখুন", category: "ক্যাটাগরি", creatorProfile: "স্রষ্টার প্রোফাইল", viewSource: "মূল সূত্র দেখুন", referencedInEvents: "যেসব ইভেন্টে ব্যবহৃত", timelineView: "ঘটনাপঞ্জি ভিউ" }
    : { topicHub: "Topic Hub", exploreTopicHub: "Explore related topics", category: "Category", creatorProfile: "Creator Profile", viewSource: "View Original Source", referencedInEvents: "Referenced In Events", timelineView: "Timeline View" };

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(resourceJsonLd) }} />
      <HeroSection title={resource.title} tagline={resource.attribution} intro={resource.note} />

      <AnimatedContainer>
        <SectionTitle title={labels.category} subtitle={`${resource.category} · ${resource.subcategory}`} />
        <Link
          href={`/${locale}/creators/${resource.creatorId}`}
          className="mt-4 inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent hover:bg-amber-500/10"
        >
          {labels.creatorProfile}
        </Link>
        {resource.href ? (
          <Link
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 ml-2 inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent hover:bg-amber-500/10"
          >
            {labels.viewSource}
          </Link>
        ) : null}
        {relatedTopics.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {relatedTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/${locale}/topics/${topic.slug}`}
                className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent hover:bg-amber-500/10"
              >
                {labels.topicHub}: {labels.exploreTopicHub} - {topic.title}
              </Link>
            ))}
          </div>
        ) : null}
      </AnimatedContainer>

      <AnimatedContainer delay={0.05}>
        <SectionTitle title={labels.referencedInEvents} subtitle={labels.timelineView} />
        <div className="mt-4 space-y-3">
          {events.map((event, index) => (
            <div key={event.slug} className="relative pl-8">
              <span className="absolute top-5 left-2 h-2.5 w-2.5 rounded-full bg-amber-400" />
              {index < events.length - 1 ? <span className="absolute top-8 left-[0.84rem] h-[calc(100%+0.6rem)] w-px bg-amber-500/35" /> : null}
              <Link key={event.slug} href={`/${locale}/events/${event.slug}`} className="theme-surface block rounded-xl border p-4 hover:border-amber-400/40">
                <p className="theme-muted text-xs tracking-[0.2em] uppercase">{event.year}</p>
                <h3 className="mt-1 text-lg font-semibold">{event.title}</h3>
                <p className="theme-muted mt-1 text-sm">{event.summary}</p>
              </Link>
            </div>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
}
