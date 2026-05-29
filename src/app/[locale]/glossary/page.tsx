import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllGlossaryTerms } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type GlossaryTerm, type Locale } from "@/types/content";

const CHRONOLOGICAL_GLOSSARY_GROUPS = [
  {
    label: { en: "Ancient and Early Medieval Bengal", bn: "প্রাচীন ও প্রারম্ভিক মধ্যযুগীয় বাংলা" },
    termIds: ["gauda", "pala-dynasty", "mahavihara", "sena-dynasty"],
  },
  {
    label: { en: "Sultanate and Mughal Bengal", bn: "সালতানাত ও মুঘল বাংলা" },
    termIds: ["bengal-sultanate", "mughal-subah", "nawab"],
  },
  {
    label: { en: "Company Rule and Colonial Society", bn: "কোম্পানি শাসন ও ঔপনিবেশিক সমাজ" },
    termIds: [
      "diwani",
      "colonial-rule",
      "permanent-settlement",
      "zamindar",
      "ryot",
      "fakir-sannyasi-resistance",
      "indigo-revolt",
      "swadeshi",
    ],
  },
  {
    label: { en: "Late Colonial Politics and Partition", bn: "ঔপনিবেশিক শেষ পর্যায়ের রাজনীতি ও দেশভাগ" },
    termIds: [
      "separate-electorates",
      "representation",
      "lahore-resolution",
      "direct-action-day",
      "radcliffe-line",
      "partition",
    ],
  },
  {
    label: { en: "Pakistan Period and Liberation", bn: "পাকিস্তান পর্ব ও মুক্তিযুদ্ধ" },
    termIds: [
      "east-pakistan",
      "language-movement",
      "autonomy",
      "six-points",
      "martial-law",
      "operation-searchlight",
      "liberation-war",
      "mujibnagar-government",
      "sovereignty",
    ],
  },
  {
    label: { en: "Post-Liberation and Contemporary Bangladesh", bn: "মুক্তিযুদ্ধোত্তর ও সমসাময়িক বাংলাদেশ" },
    termIds: ["baksal", "caretaker-government", "quota-system", "digital-security-act"],
  },
] as const;

function groupTermsChronologically(terms: GlossaryTerm[], locale: Locale) {
  const byId = new Map(terms.map((term) => [term.id, term]));
  const usedIds = new Set<string>();
  const groups: Array<{ label: string; terms: GlossaryTerm[] }> = CHRONOLOGICAL_GLOSSARY_GROUPS.map((group) => {
    const groupTerms = group.termIds
      .map((id) => byId.get(id))
      .filter((term): term is GlossaryTerm => Boolean(term));

    for (const term of groupTerms) usedIds.add(term.id);

    return {
      label: group.label[locale],
      terms: groupTerms,
    };
  }).filter((group) => group.terms.length > 0);

  const uncategorized = terms
    .filter((term) => !usedIds.has(term.id))
    .sort((a, b) => a.term.localeCompare(b.term, locale));

  if (uncategorized.length > 0) {
    groups.push({
      label: locale === "bn" ? "অন্যান্য" : "Other Terms",
      terms: uncategorized,
    });
  }

  return groups;
}

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
  const currentLocale = locale as Locale;
  const termGroups = groupTermsChronologically(terms, currentLocale);
  const isBn = currentLocale === "bn";

  return (
    <div className="space-y-8">
      <HeroSection
        title={isBn ? "গ্লসারি" : "Glossary"}
        tagline={isBn ? "প্রসঙ্গ বুঝতে টার্মগুলোর দ্রুত ব্যাখ্যা" : "Quick term references for historical context"}
        intro={isBn ? "ইভেন্ট, টাইমলাইন, এবং বিশ্লেষণে ব্যবহৃত টার্মগুলোর ব্যাখ্যা।" : "Definitions for terms used across events, timelines, and historical analysis."}
      />
      <AnimatedContainer>
        <SectionTitle title={isBn ? "পুরোনো থেকে নতুন" : "Old to New"} />
        <div className="mt-5 space-y-8">
          {termGroups.map((group) => (
            <section key={group.label} className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">{group.label}</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {group.terms.map((entry) => (
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
            </section>
          ))}
        </div>
      </AnimatedContainer>
    </div>
  );
}
