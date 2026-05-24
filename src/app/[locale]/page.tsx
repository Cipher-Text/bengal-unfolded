import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";
import { getAllEvents, getHomeContent } from "@/lib/content";
import { EVENT_THEME_BY_SLUG, getPhaseLabel } from "@/lib/event-presentation";
import { buildPageMetadata } from "@/lib/seo";
import { SUPPORTED_LOCALES, type EventSlug, type Locale } from "@/types/content";

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
const LANDING_MAJOR_EVENT_SLUGS: EventSlug[] = [
	"0750-1170-pala-dynasty-foundation",
	"1204-bakhtiyar-khalji-s-conquest-of-nadia",
	"1303-conquest-of-sylhet",
	"1352-bengal-sultanate-independence-and-unification",
	"1494-alauddin-husain-shah-begins-hussain-shahi-rule-in-bengal",
	"1576-battle-of-rajmahal",
	"1666-mughal-conquest-of-chittagong",
	"1757-battle-of-plassey",
	"1765-east-india-company-gets-diwani-rights-in-bengal",
	"1770-great-bengal-famine",
	"1793-permanent-settlement-in-bengal",
	"1859-1860-indigo-revolt",
	"1905-partition-of-bengal",
	"1930-chittagong-armoury-raid",
	"1940-lahore-resolution",
	"1947-partition-and-eastern-bengal",
	"1952-language-movement",
	"1969-mass-uprising",
	"1971-liberation-war",
	"1991-return-to-parliamentary-democracy",
];

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
	const landingEventSet = new Set<EventSlug>(LANDING_MAJOR_EVENT_SLUGS);
	const landingEvents = events.filter((event) => landingEventSet.has(event.slug));

	const timelineItems = landingEvents.map((event) => ({
		year: event.year,
		title: event.title,
		detail: event.summary,
		href: `/${locale}/events/${event.slug}`,
		ctaLabel: event.ctaLabel || "Details",
		phaseLabel: getPhaseLabel(locale as Locale, event.slug),
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
