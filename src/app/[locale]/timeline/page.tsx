import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventGrid } from "@/components/EventGrid";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { getAllEvents } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type EventImportance, type Locale } from "@/types/content";
import type { TimelineTheme } from "@/types/content";

const PAGE_SIZE = 6;

function normalize(v: string): string {
  return v.trim().toLowerCase();
}

function toPage(v: string | undefined): number {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 1;
}

function buildQuery(params: { q?: string; year?: string; theme?: string; importance?: string; page?: number }): string {
  const qs = new URLSearchParams();
  if (params.q) qs.set("q", params.q);
  if (params.year) qs.set("year", params.year);
  if (params.theme) qs.set("theme", params.theme);
  if (params.importance) qs.set("importance", params.importance);
  if (params.page && params.page > 1) qs.set("page", String(params.page));
  const s = qs.toString();
  return s ? `?${s}` : "";
}

const IMPORTANCE_ORDER: EventImportance[] = ["landmark", "major", "high", "medium", "reference"];

const IMPORTANCE_LABELS: Record<Locale, Record<EventImportance, string>> = {
  en: {
    landmark: "Landmark",
    major: "Major",
    high: "High",
    medium: "Medium",
    reference: "Reference",
  },
  bn: {
    landmark: "ল্যান্ডমার্ক",
    major: "প্রধান",
    high: "উচ্চ",
    medium: "মধ্যম",
    reference: "রেফারেন্স",
  },
};

const EVENT_THEME_BY_SLUG: Record<string, TimelineTheme[]> = {
  "1757": ["war", "economy"],
  "1765": ["economy", "democracy"],
  "1857": ["war", "democracy"],
  "1906": ["democracy", "culture"],
  "1911": ["democracy", "culture"],
  "1943": ["economy", "war"],
  "1947": ["war", "democracy"],
  "1952": ["language", "culture", "democracy"],
  "1954": ["democracy"],
  "1958": ["democracy"],
  "1966": ["democracy", "economy"],
  "1969": ["democracy"],
  "1971": ["war", "democracy"],
  "1975": ["democracy"],
  "1990": ["democracy"],
  "2006": ["democracy"],
  "2013": ["democracy"],
  "2024": ["democracy", "economy"],
};

const THEME_LABELS: Record<Locale, Record<TimelineTheme, string>> = {
  en: {
    language: "Language",
    democracy: "Democracy",
    war: "War",
    culture: "Culture",
    economy: "Economy",
  },
  bn: {
    language: "ভাষা",
    democracy: "গণতন্ত্র",
    war: "যুদ্ধ",
    culture: "সংস্কৃতি",
    economy: "অর্থনীতি",
  },
};

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
    title: isBn ? "পূর্ণ টাইমলাইন | Bengal Unfolded" : "Full Timeline | Bengal Unfolded",
    description: isBn
      ? "বেঙ্গল আনফোল্ডেড-এর সব ঐতিহাসিক অধ্যায় সার্চ, ফিল্টার ও পেজিনেশনের মাধ্যমে দেখুন।"
      : "Explore all historical chapters in Bengal Unfolded with search, filters, and pagination.",
    canonicalPath: `/${locale}/timeline`,
    languagePathWithoutLocale: "/timeline",
    type: "website",
  });
}

export default async function TimelineExplorerPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; year?: string; theme?: string; importance?: string; page?: string }>;
}) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  const { q = "", year = "", theme = "", importance = "", page = "1" } = await searchParams;
  const safePage = toPage(page);
  const isBn = locale === "bn";

  const allEvents = await getAllEvents(locale);
  const years = Array.from(new Set(allEvents.map((e) => e.year))).sort((a, b) => a.localeCompare(b));
  const importanceValue = IMPORTANCE_ORDER.includes(importance as EventImportance) ? (importance as EventImportance) : "";

  const nq = normalize(q);
  const filtered = allEvents.filter((event) => {
    const byYear = year ? event.year === year : true;
    const eventThemes = EVENT_THEME_BY_SLUG[event.slug] ?? [];
    const byTheme = theme ? eventThemes.includes(theme as TimelineTheme) : true;
    const byImportance = importanceValue ? event.importance === importanceValue : true;
    const byQuery = nq
      ? [event.year, event.title, event.subtitle, event.summary, event.periodLabel ?? "", event.movementLabel ?? ""].some((v) => normalize(v).includes(nq))
      : true;
    return byYear && byTheme && byImportance && byQuery;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(safePage, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageEvents = filtered.slice(start, start + PAGE_SIZE);

  const title = isBn ? "পূর্ণ টাইমলাইন" : "Full Timeline Explorer";
  const tagline = isBn ? "বছর, শিরোনাম ও সারাংশ ধরে সার্চ করুন" : "Search by year, title, and summary";
  const intro = isBn
    ? "সব অধ্যায় একসাথে দেখে গুরুত্ব, পর্ব এবং বৃহত্তর ধারাবাহিকতা বোঝার জন্য এই এক্সপ্লোরার ব্যবহার করুন।"
    : "Use this explorer to see all chapters together and understand their importance, period, and broader continuity.";
  const groupedEvents = pageEvents.reduce<Array<{ label: string; events: typeof pageEvents }>>((groups, event) => {
    const label = event.periodLabel ?? (isBn ? "অন্যান্য অধ্যায়" : "Other Chapters");
    const currentGroup = groups[groups.length - 1];
    if (currentGroup && currentGroup.label === label) {
      currentGroup.events.push(event);
      return groups;
    }
    groups.push({ label, events: [event] });
    return groups;
  }, []);

  return (
    <div className="space-y-8">
      <HeroSection title={title} tagline={tagline} intro={intro} />

      <section className="theme-surface rounded-2xl border p-5 md:p-6">
        <SectionTitle
          title={isBn ? "সার্চ ও ফিল্টার" : "Search and Filters"}
          subtitle={isBn ? "কিওয়ার্ড, বছর, থিম ও গুরুত্ব দিয়ে অধ্যায় বাছাই করুন" : "Use keyword, year, theme, and importance to narrow events"}
        />
        <form className="mt-4 grid gap-3 md:grid-cols-[1fr_180px_180px_180px_auto]" method="get" action={`/${locale}/timeline`}>
          <input
            name="q"
            defaultValue={q}
            placeholder={isBn ? "কিওয়ার্ড লিখুন" : "Search keyword"}
            className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm"
          />
          <select
            name="year"
            defaultValue={year}
            className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm"
          >
            <option value="">{isBn ? "সব বছর" : "All years"}</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            name="theme"
            defaultValue={theme}
            className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm"
          >
            <option value="">{isBn ? "সব থিম" : "All themes"}</option>
            {(["language", "democracy", "war", "culture", "economy"] as TimelineTheme[]).map((t) => (
              <option key={t} value={t}>
                {THEME_LABELS[locale as Locale][t]}
              </option>
            ))}
          </select>
          <select
            name="importance"
            defaultValue={importance}
            className="theme-surface w-full rounded-lg border border-amber-500/30 px-3 py-2 text-sm"
          >
            <option value="">{isBn ? "সব গুরুত্ব" : "All importance levels"}</option>
            {IMPORTANCE_ORDER.map((level) => (
              <option key={level} value={level}>
                {IMPORTANCE_LABELS[locale as Locale][level]}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-amber-500/40 px-4 text-sm font-medium text-accent hover:bg-amber-500/10"
          >
            {isBn ? "প্রয়োগ করুন" : "Apply"}
          </button>
        </form>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="theme-muted text-sm">
            {isBn ? `মোট ফলাফল: ${filtered.length}` : `Total results: ${filtered.length}`}
          </p>
          {(q || year || theme || importance) && (
            <Link
              href={`/${locale}/timeline`}
              className="text-sm font-medium text-amber-400 hover:text-amber-300"
            >
              {isBn ? "ফিল্টার রিসেট" : "Reset filters"}
            </Link>
          )}
        </div>

        {pageEvents.length > 0 ? (
          <div className="space-y-8">
            {groupedEvents.map((group) => (
              <section key={group.label} className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold md:text-2xl">{group.label}</h2>
                  {group.events[0]?.movementLabel ? (
                    <p className="theme-muted mt-1 text-sm">{group.events[0].movementLabel}</p>
                  ) : null}
                </div>
                <EventGrid events={group.events} locale={locale as Locale} />
              </section>
            ))}
          </div>
        ) : (
          <div className="theme-surface rounded-xl border p-6 text-sm theme-muted">
            {isBn ? "কোনো ফলাফল পাওয়া যায়নি।" : "No results found."}
          </div>
        )}

        {totalPages > 1 ? (
          <div className="flex items-center justify-between">
            {currentPage > 1 ? (
              <Link
                href={`/${locale}/timeline${buildQuery({ q, year, theme, importance, page: currentPage - 1 })}`}
                className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent hover:bg-amber-500/10"
              >
                {isBn ? "আগের পাতা" : "Previous"}
              </Link>
            ) : (
              <span />
            )}
            <p className="theme-muted text-sm">
              {isBn ? `পৃষ্ঠা ${currentPage} / ${totalPages}` : `Page ${currentPage} / ${totalPages}`}
            </p>
            {currentPage < totalPages ? (
              <Link
                href={`/${locale}/timeline${buildQuery({ q, year, theme, importance, page: currentPage + 1 })}`}
                className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm text-accent hover:bg-amber-500/10"
              >
                {isBn ? "পরের পাতা" : "Next"}
              </Link>
            ) : (
              <span />
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
}
