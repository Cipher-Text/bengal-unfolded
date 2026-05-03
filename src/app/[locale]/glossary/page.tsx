import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllGlossaryTerms } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  const isBn = locale === "bn";
  return buildPageMetadata({
    locale: locale as Locale,
    title: isBn ? "গ্লসারি" : "Glossary",
    description: isBn
      ? "ইতিহাস-রাজনীতির গুরুত্বপূর্ণ টার্মগুলোর সংক্ষিপ্ত ব্যাখ্যা।"
      : "Key historical and political terms used across Bengal Unfolded.",
    canonicalPath: `/${locale}/glossary`,
    languagePathWithoutLocale: "/glossary",
    type: "website",
  });
}

export default async function GlossaryIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const terms = await getAllGlossaryTerms(locale);
  const isBn = locale === "bn";

  return (
    <div className="space-y-8">
      <HeroSection
        title={isBn ? "গ্লসারি" : "Glossary"}
        tagline={isBn ? "প্রসঙ্গ বুঝতে টার্মগুলোর দ্রুত ব্যাখ্যা" : "Quick term references for historical context"}
        intro={isBn ? "ইভেন্ট, টাইমলাইন, এবং বিশ্লেষণে ব্যবহৃত টার্মগুলোর ব্যাখ্যা।" : "Definitions for terms used across events, timelines, and historical analysis."}
      />
      <AnimatedContainer>
        <SectionTitle title={isBn ? "টার্মসমূহ" : "Terms"} />
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {terms.map((entry) => (
            <Link
              key={entry.id}
              href={`/${locale}/glossary/${entry.id}`}
              className="theme-surface rounded-xl border p-4 hover:border-amber-400/40"
            >
              <h3 className="text-lg font-semibold">{entry.term}</h3>
              <p className="theme-muted mt-1 text-sm">{entry.definition}</p>
            </Link>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
}
