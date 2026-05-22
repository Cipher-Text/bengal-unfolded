import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";
import { getAllEvents, getHomeContent } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";
import type { TimelineTheme } from "@/types/content";

const EventTimeline = dynamic(
	() => import("@/components/EventTimeline").then((mod) => mod.EventTimeline),
	{
		loading: () => (
			<div className="relative pl-6">
				<div className="theme-border absolute top-0 left-2.5 h-full w-px border-l" />
				<div className="space-y-6">
					<div className="theme-surface h-36 animate-pulse rounded-xl border p-4" />
					<div className="theme-surface h-36 animate-pulse rounded-xl border p-4" />
				</div>
			</div>
		),
	},
);
const HOMEPAGE_LANDMARK_LIMIT = 15;
const EVENT_THEME_BY_SLUG: Record<string, TimelineTheme[]> = {
	"1757": ["war", "economy"],
	"1765": ["economy", "democracy"],
	"1793": ["economy", "democracy"],
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

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;
	if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
	const isBn = locale === "bn";
	const title = isBn ? "বেঙ্গল আনফোল্ডেড (Bengal Unfolded)" : "Bengal Unfolded";
	const description = isBn
		? "বেঙ্গল আনফোল্ডেড একটি দ্বিভাষিক (বাংলা-ইংরেজি) বাংলাদেশ ও বঙ্গের ইতিহাস-সংস্কৃতি শেখার প্ল্যাটফর্ম, সংবাদ পোর্টাল নয়।"
		: "Bengal Unfolded is a bilingual (Bangla-English) Bangladesh and Bengal history and cultural learning platform, not a news portal.";

	return buildPageMetadata({
		locale: locale as Locale,
		title,
		description,
		canonicalPath: `/${locale}`,
		languagePathWithoutLocale: "",
		type: "website",
	});
}

export default async function LocaleHomePage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();
	const [home, events] = await Promise.all([
		getHomeContent(locale),
		getAllEvents(locale),
	]);
	const isBn = locale === "bn";
	const landingEvents = events
		.filter((event) => event.showOnLanding !== false)
		.slice(0, HOMEPAGE_LANDMARK_LIMIT);

	const phaseBySlug: Record<string, string> =
		locale === "bn"
			? {
					"1757": "পলাশী",
					"1765": "দেওয়ানি",
					"1793": "বন্দোবস্ত",
					"1857": "বিদ্রোহ",
					"1947": "বিভাজন",
					"1952": "ভাষা",
					"1969": "অভ্যুত্থান",
					"1971": "স্বাধীনতা",
					"1975": "বাকশাল",
					"1990": "গণতন্ত্র",
					"2006": "তত্ত্বাবধায়ক সংকট",
					"2024": "ন্যায্যতা",
				}
			: {
					"1757": "Plassey",
					"1765": "Diwani",
					"1793": "Settlement",
					"1857": "Revolt",
					"1947": "Partition",
					"1952": "Language",
					"1969": "Uprising",
					"1971": "Liberation",
					"1975": "BAKSAL",
					"1990": "Democracy",
					"2006": "Caretaker Crisis",
					"2024": "Justice",
				};

	const timelineItems = landingEvents.map((event) => ({
		year: event.year,
		title: event.title,
		detail: event.summary,
		href: `/${locale}/events/${event.slug}`,
		ctaLabel: event.ctaLabel || "Details",
		phaseLabel: phaseBySlug[event.slug],
		themeColor: event.themeColor,
		themes: EVENT_THEME_BY_SLUG[event.slug] ?? ["culture"],
		emphasis:
			event.slug === "1971-liberation-war"
				? ("peak" as const)
				: ("normal" as const),
	}));

	const startHeading = locale === "bn" ? "শুরু করার পথ" : "Start Exploring";
	const startBody =
		locale === "bn"
			? "দ্রুত প্রবেশের জন্য একটি পথ বেছে নিন: ধারাবাহিক কালরেখা, অথবা থিমভিত্তিক টপিক হাব।"
			: "Choose a path: follow the historical sequence in the timeline, or jump by theme in topic hubs.";

	return (
		<div className="space-y-14 md:space-y-20">
			<HeroSection
				title={home.title}
				tagline={home.tagline}
				intro={home.intro}
			/>

			<AnimatedContainer delay={0.08}>
				<section className="paper paper-stained relative px-6 py-8 md:px-10 md:py-10">
					<div className="compass-watermark -top-10 -right-10" />
					<div className="relative grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
						<div>
							<p className="text-eyebrow-script text-xl">
								{locale === "bn" ? "নতুন পাঠক" : "New Reader"}
							</p>
							<h2 className="text-display mt-2 text-3xl font-semibold leading-tight md:text-5xl">
								{startHeading}
							</h2>
							<p
								className="theme-muted text-balance mt-3 max-w-xl text-base leading-relaxed md:text-lg"
								style={{
									fontFamily: "var(--font-display), serif",
									fontStyle: "italic",
								}}
							>
								{startBody}
							</p>
						</div>
						<div className="flex flex-wrap items-center gap-3">
							<Link href={`/${locale}/timeline`} className="btn-ink">
								{locale === "bn" ? "পূর্ণ টাইমলাইন" : "Explore Timeline"}
								<span className="arrow">→</span>
							</Link>
							<Link href={`/${locale}/topics`} className="btn-vintage">
								{locale === "bn" ? "টপিক হাব" : "Topic Hubs"}
								<span className="arrow">→</span>
							</Link>
						</div>
					</div>
				</section>
			</AnimatedContainer>

			<AnimatedContainer>
				<SectionTitle
					eyebrow={locale === "bn" ? "ঐতিহাসিক কালরেখা" : "Historical Timeline"}
					title={home.timelineHeading}
					subtitle={home.timelineSubheading}
				/>
			</AnimatedContainer>

			<AnimatedContainer delay={0.05}>
				<EventTimeline items={timelineItems} locale={locale as Locale} />
			</AnimatedContainer>

			<AnimatedContainer delay={0.1}>
				<section className="paper paper-stained relative px-7 py-10 md:px-14 md:py-14">
					<div className="compass-watermark -bottom-20 -left-16" />
					<div className="relative">
						<p className="text-eyebrow-script text-xl">
							{locale === "bn"
								? "এই যাত্রার তাৎপর্য"
								: "Why this journey matters"}
						</p>
						<h2 className="text-display mt-3 text-3xl font-semibold leading-tight md:text-5xl">
							{home.whyJourneyMattersHeading}
						</h2>
						<div className="mt-4 flex items-center gap-3">
							<span className="h-px w-12 bg-[color:var(--sepia)] opacity-60" />
							<span className="ornament text-lg">✦</span>
							<span className="h-px w-12 bg-[color:var(--sepia)] opacity-60" />
						</div>
						<p
							className="drop-cap text-balance mt-6 max-w-3xl text-base leading-relaxed md:text-lg"
							style={{ fontFamily: "var(--font-display), serif" }}
						>
							{home.whyJourneyMattersBody}
						</p>
						<div className="mt-7 flex items-center gap-3">
							<span className="wax-seal">B</span>
							<div>
								<p className="text-eyebrow">
									{locale === "bn" ? "সম্পাদকীয় সিল" : "Editorial Seal"}
								</p>
								<p className="text-eyebrow-script">Bengal Unfolded</p>
							</div>
						</div>
					</div>
				</section>
			</AnimatedContainer>
		</div>
	);
}
