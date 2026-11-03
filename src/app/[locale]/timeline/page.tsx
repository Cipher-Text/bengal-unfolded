import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { TimelineExplorerInteractive, type TimelineEntry, type TimelineEra } from "@/components/TimelineExplorerInteractive";
import { getAllEvents, getAllPeriods } from "@/lib/content";
import { resolveEraId, sortPeriodsChronologically } from "@/lib/eras";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export const dynamic = "force-static";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!SUPPORTED_LOCALES.includes(locale as Locale))return {};const bn=locale==="bn";return buildPageMetadata({locale:locale as Locale,title:bn?"পূর্ণ টাইমলাইন":"Full Timeline",description:bn?"বেঙ্গল আনফোল্ডেড-এর সব ঐতিহাসিক অধ্যায় যুগ অনুযায়ী একটানা কালপঞ্জিতে দেখুন।":"Explore all historical chapters in Bengal Unfolded as one continuous, searchable chronology grouped by era.",canonicalPath:`/${locale}/timeline`,languagePathWithoutLocale:"/timeline",type:"website"});}
/** First sentence(s) of a summary that fit within `max` characters, for compact timeline rows. */
function excerpt(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const head = clean.slice(0, max);
  const sentenceEnd = Math.max(head.lastIndexOf(". "), head.lastIndexOf("। "));
  if (sentenceEnd > max * 0.5) return head.slice(0, sentenceEnd + 1);
  return `${head.slice(0, head.lastIndexOf(" "))}…`;
}

export default async function TimelineExplorerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const bn = locale === "bn";
  const [events, periods] = await Promise.all([getAllEvents(locale), getAllPeriods(locale)]);
  const entries: TimelineEntry[] = events.map((event) => ({
    slug: event.slug,
    year: event.year,
    title: event.title,
    // Stub chapters only carry template text; show the "In progress" label instead of presenting it as a summary.
    excerpt: event.stub ? "" : excerpt(event.summary, event.importance === "landmark" ? 320 : 170),
    periodId: resolveEraId(event, periods),
    importance: event.importance,
    stub: event.stub,
    sensitive: event.sensitive,
  }));
  const eras: TimelineEra[] = sortPeriodsChronologically(periods).map(({ id, title, startYear, endYear, themeColor, subtitle }) => ({ id, title, startYear, endYear, themeColor, description: subtitle }));

  return (
    <div className="space-y-8">
      <HeroSection
        showCollage={false}
        title={bn ? "টাইমলাইন" : "Timeline"}
        tagline={bn ? "একটানা কালপঞ্জিতে বাংলার ইতিহাস" : "Bengal’s history, in one continuous line"}
        intro={bn ? "যুগ ধরে এগিয়ে যান, অথবা খুঁজে নিন নির্দিষ্ট বছর বা বিষয়। গুরুত্বপূর্ণ মোড়গুলো বড় করে দেখানো হয়েছে।" : "Scroll through the eras, or search for a year or subject. Landmark chapters are set larger so the turning points stand out."}
      />
      <TimelineExplorerInteractive events={entries} eras={eras} locale={locale as Locale} />
    </div>
  );
}
