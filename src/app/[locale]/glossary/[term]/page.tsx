import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { getAllGlossaryTermIds, getGlossaryTerm } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export async function generateStaticParams() {
  const termIds = await getAllGlossaryTermIds();
  return SUPPORTED_LOCALES.flatMap((locale) => termIds.map((term) => ({ locale, term })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; term: string }> }): Promise<Metadata> {
  const { locale, term } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  try {
    const entry = await getGlossaryTerm(locale, term);
    return buildPageMetadata({
      locale: locale as Locale,
      title: `${entry.term} | Glossary`,
      description: entry.definition,
      canonicalPath: `/${locale}/glossary/${term}`,
      languagePathWithoutLocale: `/glossary/${term}`,
      type: "article",
    });
  } catch {
    return {};
  }
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ locale: string; term: string }> }) {
  const { locale, term } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  let entry;
  try {
    entry = await getGlossaryTerm(locale, term);
  } catch {
    notFound();
  }

  return (
    <div className="space-y-8">
      <HeroSection title={entry.term} tagline={entry.definition} />
      <AnimatedContainer>
        <SectionTitle title={locale === "bn" ? "ব্যাখ্যা" : "Explanation"} subtitle={entry.explanation} />
      </AnimatedContainer>
      {entry.relatedTerms?.length ? (
        <AnimatedContainer delay={0.05}>
          <SectionTitle title={locale === "bn" ? "সম্পর্কিত টার্ম" : "Related Terms"} />
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.relatedTerms.map((related) => (
              <Link key={related} href={`/${locale}/glossary/${related}`} className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-3 text-sm text-accent hover:bg-amber-500/10">
                {related}
              </Link>
            ))}
          </div>
        </AnimatedContainer>
      ) : null}
    </div>
  );
}
