import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizPlayInteractive } from "@/components/QuizPlayInteractive";
import { getQuizSiteContent, getQuizTopicSummaries } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export const dynamic = "force-static";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  const bn = locale === "bn";
  return buildPageMetadata({
    locale: locale as Locale,
    title: bn ? "কুইজ খেলুন" : "Play the quiz",
    description: bn ? "বাংলার ইতিহাস নিয়ে কুইজ।" : "A quiz on Bengal's history.",
    canonicalPath: `/${locale}/quiz/play`,
    languagePathWithoutLocale: "/quiz/play",
    type: "website",
    noIndex: true,
  });
}

export default async function QuizPlayPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const current = locale as Locale;
  const [site, topics] = await Promise.all([getQuizSiteContent(current), getQuizTopicSummaries(current)]);
  if (!site) notFound();
  return <QuizPlayInteractive locale={current} site={site} topics={topics.map(({ slug, title }) => ({ slug, title }))} />;
}
