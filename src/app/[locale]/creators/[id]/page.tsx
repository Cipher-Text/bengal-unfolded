import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllCreators, getEventsByResourceId, getResourcesByCreatorId } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

function formatNumber(locale: Locale, value: number): string {
  return new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en-US").format(value);
}

function formatYear(locale: Locale, value: string): string {
  return /^\d+$/.test(value) ? formatNumber(locale, Number(value)) : value;
}

export async function generateStaticParams() {
  const params = await Promise.all(
    SUPPORTED_LOCALES.map(async (locale) => {
      const creators = await getAllCreators(locale);
      return creators.map((creator) => ({ locale, id: creator.id }));
    }),
  );
  return params.flat();
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};

  const creators = await getAllCreators(locale);
  const creator = creators.find((item) => item.id === id);
  if (!creator) return {};

  return buildPageMetadata({
    locale: locale as Locale,
    title: `${creator.name} | Bengal Unfolded`,
    description: locale === "bn" ? "এই স্রষ্টার সাথে যুক্ত রিসোর্সসমূহ।" : "Resources attributed to this creator.",
    canonicalPath: `/${locale}/creators/${id}`,
    languagePathWithoutLocale: `/creators/${id}`,
    type: "profile",
  });
}

export default async function CreatorDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  const creators = await getAllCreators(locale);
  const creator = creators.find((item) => item.id === id);
  if (!creator) notFound();

  const resources = await getResourcesByCreatorId(locale, id);
  const eventsByResource = await Promise.all(resources.map((resource) => getEventsByResourceId(locale, resource.id)));
  const eventMetaBySlug = new Map<string, (typeof eventsByResource)[number][number]>();
  for (const events of eventsByResource) {
    for (const event of events) {
      eventMetaBySlug.set(event.slug, event);
    }
  }
  const relatedEvents = Array.from(eventMetaBySlug.values());
  const creatorSchemaType = creator.type === "organization" ? "Organization" : "Person";
  const creatorJsonLd = {
    "@context": "https://schema.org",
    "@type": creatorSchemaType,
    name: creator.name,
    url: `https://bengalunfolded.com/${locale}/creators/${id}`,
    subjectOf: resources.map((resource) => ({
      "@type": "CreativeWork",
      name: resource.title,
      url: `https://bengalunfolded.com/${locale}/resources/${resource.id}`,
    })),
  };

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creatorJsonLd) }} />
      <HeroSection
        title={creator.name}
        tagline={locale === "bn" ? "স্রষ্টা/অবদানকারী" : "Creator / Contributor"}
        intro={locale === "bn" ? "এই নামের সাথে যুক্ত সব রিসোর্স একসাথে দেখুন।" : "Explore all resources attributed to this name."}
      />

      <AnimatedContainer>
        <SectionTitle title={locale === "bn" ? "রিসোর্সসমূহ" : "Resources"} subtitle={formatNumber(locale as Locale, resources.length)} />
        <div className="mt-4 grid gap-3">
          {resources.map((resource) => (
            <Link key={resource.id} href={`/${locale}/resources/${resource.id}`} className="theme-surface rounded-xl border p-4 hover:border-amber-400/40">
              <h3 className="text-lg font-semibold">{resource.title}</h3>
              <p className="theme-muted mt-1 text-sm">{resource.category} · {resource.subcategory}</p>
              <p className="theme-muted mt-1 text-sm">{resource.note}</p>
            </Link>
          ))}
        </div>
      </AnimatedContainer>

      <AnimatedContainer delay={0.05}>
        <SectionTitle title={locale === "bn" ? "সম্পর্কিত ইভেন্ট" : "Related Events"} subtitle={formatNumber(locale as Locale, relatedEvents.length)} />
        <div className="mt-4 grid gap-3">
          {relatedEvents.map((event) => (
            <Link key={event.slug} href={`/${locale}/events/${event.slug}`} className="theme-surface rounded-xl border p-4 hover:border-amber-400/40">
              <p className="theme-muted text-xs tracking-[0.2em] uppercase">{formatYear(locale as Locale, event.year)}</p>
              <h3 className="mt-1 text-lg font-semibold">{event.title}</h3>
              <p className="theme-muted mt-1 text-sm">{event.summary}</p>
            </Link>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
}
