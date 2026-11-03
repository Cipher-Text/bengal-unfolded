import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FigureDirectoryInteractive, type FigureListItem } from "@/components/FigureDirectoryInteractive";
import { HeroSection } from "@/components/HeroSection";
import { getAllFiguresChronological } from "@/lib/content";
import { inferFigureEntityType } from "@/lib/figures";
import { hasRealPortrait } from "@/lib/portraits";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

export const dynamic = "force-static";
export function generateStaticParams() { return SUPPORTED_LOCALES.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  return buildPageMetadata({ locale: locale as Locale, title: locale === "bn" ? "ঐতিহাসিক ব্যক্তিত্ব" : "Historical Figures", description: locale === "bn" ? "বাংলার ইতিহাসের ঘটনার সঙ্গে যুক্ত নেতা, সংগঠক, বুদ্ধিজীবী ও সংগঠনের প্রোফাইল দেখুন।" : "Explore the leaders, organisers, thinkers and organisations connected to Bengal Unfolded events.", canonicalPath: `/${locale}/figures`, languagePathWithoutLocale: "/figures" });
}
/** One short sentence from a longer paragraph, for compact directory cards. */
function excerpt(text: string | undefined, max: number): string {
  const clean = (text ?? "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const head = clean.slice(0, max);
  const end = Math.max(head.lastIndexOf(". "), head.lastIndexOf("। "));
  return end > max * 0.5 ? head.slice(0, end + 1) : `${head.slice(0, head.lastIndexOf(" "))}…`;
}

export default async function FiguresListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
  const isBn = locale === "bn";
  const figures = await getAllFiguresChronological(locale);
  const items: FigureListItem[] = figures.map((figure) => ({
    id: figure.id,
    name: figure.name,
    role: figure.role,
    group: figure.group,
    entity: inferFigureEntityType(figure),
    image: hasRealPortrait(figure.image) ? figure.image : undefined,
    period: figure.activePeriod ?? ([figure.birthYear, figure.deathYear].filter(Boolean).join("–") || undefined),
    excerpt: excerpt(figure.contribution, 140),
    search: [figure.name, figure.name_en, figure.role, ...(figure.tags ?? []), ...(figure.alternateNames ?? []), ...(figure.searchAliases ?? [])].filter(Boolean).join(" ").toLocaleLowerCase(),
  }));

  return (
    <div className="space-y-8">
      <HeroSection
        showCollage={false}
        title={isBn ? "ইতিহাসের মানুষ" : "People of the record"}
        tagline={isBn ? "নেতা, সংগঠক, বুদ্ধিজীবী ও সংগঠন" : "Leaders, organisers, thinkers and the groups they built"}
        intro={isBn ? "নাম বা ভূমিকা দিয়ে খুঁজুন। প্রতিটি প্রোফাইলে তাঁদের অবদান, প্রেক্ষাপট ও প্রভাব আলাদা করে দেখানো হয়েছে।" : "Search by name or role. Each profile separates what they did, the context they worked in, and the impact that followed."}
      />
      <FigureDirectoryInteractive figures={items} locale={locale as Locale} />
    </div>
  );
}
