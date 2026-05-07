import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllTopics } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};

  const isBn = locale === "bn";
  return buildPageMetadata({
    locale: locale as Locale,
    title: isBn ? "টপিকস | Bengal Unfolded" : "Topics | Bengal Unfolded",
    description: isBn
      ? "বিষয়ভিত্তিক টপিক হাব থেকে ধারাবাহিকভাবে ইতিহাস শিখুন।"
      : "Explore topic hubs to learn history through connected themes.",
    canonicalPath: `/${locale}/topics`,
    languagePathWithoutLocale: "/topics",
    type: "website",
  });
}

export default async function TopicsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const isBn = locale === "bn";
  const topics = (await getAllTopics(locale)).sort((a, b) => {
    const priorityDiff = (a.priority ?? Number.MAX_SAFE_INTEGER) - (b.priority ?? Number.MAX_SAFE_INTEGER);
    if (priorityDiff !== 0) return priorityDiff;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="space-y-8">
      <HeroSection
        title={isBn ? "টপিক হাব" : "Topic Hubs"}
        tagline={isBn ? "ক্লাস্টারভিত্তিক শেখার পেজসমূহ" : "Cluster-based learning pages"}
        intro={
          isBn
            ? "প্রতিটি টপিক হাবে সংশ্লিষ্ট ইভেন্ট, প্রেক্ষাপট এবং রেফারেন্স একটি ধারাবাহিক শেখার পথে সাজানো।"
            : "Each topic hub organizes related events, context, and references into one learning path."
        }
      />

      <section>
        <SectionTitle
          title={isBn ? "উপলভ্য টপিক" : "Available Topics"}
          subtitle={isBn ? `বর্তমানে ${topics.length}টি হাব সক্রিয়` : `Currently ${topics.length} active hubs`}
        />
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/${locale}/topics/${topic.slug}`}
              className="theme-surface rounded-xl border p-5 hover:border-amber-500/40"
            >
              <h3 className="text-lg font-semibold">{topic.title}</h3>
              <p className="theme-muted mt-2 text-sm leading-relaxed">{topic.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
