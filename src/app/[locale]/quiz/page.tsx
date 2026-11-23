import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { QuizResumeCard } from "@/components/QuizResumeCard";
import { SectionTitle } from "@/components/SectionTitle";
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
    title: bn ? "কুইজ" : "Quiz",
    description: bn
      ? "বাংলার ইতিহাস নিয়ে ছোট কুইজ খেলুন, চমকপ্রদ তথ্য জানুন এবং সংশ্লিষ্ট কাহিনি পড়ুন।"
      : "Play a short quiz on Bengal's history, discover surprising facts and read the stories behind each question.",
    canonicalPath: `/${locale}/quiz`,
    languagePathWithoutLocale: "/quiz",
    type: "website",
  });
}

export default async function QuizPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const current = locale as Locale;
  const bn = current === "bn";
  const [site, topics] = await Promise.all([getQuizSiteContent(current), getQuizTopicSummaries(current)]);
  if (!site) notFound();
  const fmt = (n: number) => n.toLocaleString(bn ? "bn-BD" : "en-US");

  return (
    <div className="space-y-10">
      <HeroSection
        title={bn ? "কুইজ" : "Quiz"}
        tagline={site.hook}
        intro={bn ? "প্রায় ৩ মিনিট। সাইন-আপ লাগবে না।" : "About 3 minutes. No signup."}
        showCollage={false}
        primaryAction={topics.length > 0 ? { href: `/${current}/quiz/play`, label: bn ? "১০টি এলোমেলো প্রশ্ন শুরু করুন" : "Start 10 random questions" } : undefined}
      />

      {topics.length === 0 ? (
        <section className="theme-surface border p-6" style={{ borderColor: "var(--border)" }}>
          <p className="font-display text-lg">
            {bn ? "প্রথম প্রশ্নগুলো প্রস্তুত হচ্ছে।" : "The first questions are being prepared."}
          </p>
          <p className="theme-muted mt-2 text-sm">
            {bn ? "ততক্ষণ কাহিনিগুলো ঘুরে দেখুন।" : "Meanwhile, explore the stories."}
          </p>
          <Link href={`/${current}/topics`} className="btn-vintage mt-4">
            {bn ? "টপিকস দেখুন" : "Browse topics"}
          </Link>
        </section>
      ) : (
        <>
          <QuizResumeCard locale={current} />
          <section className="space-y-4">
            <SectionTitle title={bn ? "বিষয় বেছে নিন" : "Pick a topic"} />
            <ul className="grid gap-4 sm:grid-cols-2">
              {topics.map((topic) => (
                <li key={topic.slug}>
                  <Link
                    href={`/${current}/quiz/play?topic=${encodeURIComponent(topic.slug)}`}
                    className="theme-surface block h-full border p-5 transition-transform duration-200 hover:-translate-y-0.5"
                    style={{ borderColor: "var(--border-strong)" }}
                  >
                    <span className="font-display text-lg">{topic.title}</span>
                    <span className="theme-muted mt-1 block text-sm">{topic.tagline}</span>
                    <span className="text-eyebrow mt-3 block">
                      {bn ? `${fmt(topic.count)}টি প্রশ্ন` : `${fmt(topic.count)} questions`}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <p className="theme-muted text-sm">{site.disclaimer}</p>
        </>
      )}
    </div>
  );
}
