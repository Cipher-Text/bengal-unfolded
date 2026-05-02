import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllResourceIds, getEventsByResourceId, getResource } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
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
    return buildPageMetadata({
      locale: locale as Locale,
      title: `${resource.title} | Bengal Unfolded`,
      description: resource.note,
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

  try {
    const [resource, events] = await Promise.all([getResource(locale, id), getEventsByResourceId(locale, id)]);
    const resourceJsonLd = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: resource.title,
      description: resource.note,
      url: `https://bengalunfolded.com/${locale}/resources/${id}`,
      creator: { "@type": "Person", name: resource.attribution },
      isPartOf: events.map((event) => ({
        "@type": "Event",
        name: event.title,
        url: `https://bengalunfolded.com/${locale}/events/${event.slug}`,
      })),
    };
    return (
      <div className="space-y-8">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(resourceJsonLd) }} />
        <HeroSection title={resource.title} tagline={resource.attribution} intro={resource.note} />

        <AnimatedContainer>
          <SectionTitle title="Category" subtitle={`${resource.category} · ${resource.subcategory}`} />
          <Link
            href={`/${locale}/creators/${resource.creatorId}`}
            className="mt-4 inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent hover:bg-amber-500/10"
          >
            {locale === "bn" ? "স্রষ্টার প্রোফাইল" : "Creator Profile"}
          </Link>
          {resource.href ? (
            <Link
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 ml-2 inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent hover:bg-amber-500/10"
            >
              {locale === "bn" ? "মূল সূত্র দেখুন" : "View Original Source"}
            </Link>
          ) : null}
        </AnimatedContainer>

        <AnimatedContainer delay={0.05}>
          <SectionTitle title={locale === "bn" ? "যেসব ইভেন্টে ব্যবহৃত" : "Referenced In Events"} />
          <div className="mt-4 grid gap-3">
            {events.map((event) => (
              <Link key={event.slug} href={`/${locale}/events/${event.slug}`} className="theme-surface rounded-xl border p-4 hover:border-amber-400/40">
                <p className="theme-muted text-xs tracking-[0.2em] uppercase">{event.year}</p>
                <h3 className="mt-1 text-lg font-semibold">{event.title}</h3>
                <p className="theme-muted mt-1 text-sm">{event.summary}</p>
              </Link>
            ))}
          </div>
        </AnimatedContainer>
      </div>
    );
  } catch {
    notFound();
  }
}
