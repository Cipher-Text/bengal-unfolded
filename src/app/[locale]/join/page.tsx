import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedContainer } from "@/components/AnimatedContainer";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { buildPageMetadata, localeLanguageTag } from "@/lib/seo";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  FACEBOOK_PAGE_URL,
  GITHUB_REPO_URL,
} from "@/lib/site-links";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

const PAGE_COPY = {
  en: {
    title: "Join Bengal Unfolded",
    tagline:
      "Bengal Unfolded is a collaborative effort to make Bengal’s history easier to explore, understand, verify, and preserve.",
    eyebrow: "Join · Review · Collaborate",
    heroButtons: {
      facebook: "Contact on Facebook",
      github: "View GitHub Repo",
    },
    metadataTitle: "Join & Collaborate | Bengal Unfolded",
    metadataDescription:
      "Join Bengal Unfolded to review historical data, verify sources, contribute ideas, or collaborate on web development.",
    mission: {
      title: "Our Mission",
      body: "Our mission is to present the history, people, culture, places, and turning points of Bengal in an accessible, interactive, and source-aware way.",
    },
    vision: {
      title: "Our Vision",
      body: "Our vision is to build a trusted digital archive where students, readers, researchers, and history enthusiasts can explore Bengal across time, topics, places, and people.",
    },
    collaboration: {
      eyebrow: "How To Help",
      title: "Collaboration Areas",
      subtitle:
        "Bengal Unfolded is strongest when technical contributors and careful readers work on the same public-history surface together.",
      cards: [
        {
          title: "Web Development Collaboration",
          body: "Developers and designers can help improve the platform experience, UI, performance, accessibility, content structure, and interactive history features.",
          points: [
            "Frontend and UI improvements",
            "Interactive timeline and map features",
            "Performance and accessibility",
            "Open-source contribution through GitHub",
          ],
        },
        {
          title: "Historical Data Review",
          body: "History experts, researchers, teachers, students, and enthusiasts can help review historical information, verify dates, improve references, and suggest corrections.",
          points: [
            "Review historical facts and dates",
            "Suggest reliable sources",
            "Verify figures, events, and places",
            "Report mistakes or missing context",
          ],
        },
      ],
    },
    building: {
      eyebrow: "In Progress",
      title: "What We Are Building",
      subtitle: "The platform is growing toward a richer, source-aware learning experience.",
      items: [
        "Timeline Explorer",
        "Historical Figures",
        "Events & Movements",
        "Topics & Themes",
        "Source-backed Articles",
        "Interactive Learning Paths",
      ],
    },
    contact: {
      title: "Contact & Contribute",
      body: "For now, you can contact Bengal Unfolded through Facebook or email. Developers can also explore the GitHub repository and suggest improvements.",
      buttons: {
        facebook: "Facebook Page",
        email: "Send Email",
        github: "GitHub Repository",
      },
    },
    aside:
      "Bengal Unfolded welcomes collaboration from developers, researchers, teachers, students, and history enthusiasts. You can reach out through Facebook, email, or the project’s GitHub repository.",
  },
  bn: {
    title: "Bengal Unfolded-এর সঙ্গে যুক্ত হোন",
    tagline:
      "Bengal Unfolded বাংলার ইতিহাসকে সহজে জানা, বোঝা, যাচাই করা এবং সংরক্ষণের একটি সহযোগিতামূলক উদ্যোগ।",
    eyebrow: "যুক্ত হোন · রিভিউ করুন · সহযোগিতা করুন",
    heroButtons: {
      facebook: "Facebook-এ যোগাযোগ করুন",
      github: "GitHub Repo দেখুন",
    },
    metadataTitle: "যুক্ত হোন ও সহযোগিতা করুন | Bengal Unfolded",
    metadataDescription:
      "Bengal Unfolded-এর ইতিহাসভিত্তিক তথ্য যাচাই, সূত্র রিভিউ, কনটেন্ট উন্নয়ন ও ওয়েব ডেভেলপমেন্টে সহযোগিতা করুন।",
    mission: {
      title: "আমাদের লক্ষ্য",
      body: "আমাদের লক্ষ্য বাংলার ইতিহাস, মানুষ, সংস্কৃতি, স্থান এবং গুরুত্বপূর্ণ ঘটনাগুলোকে সহজ, ইন্টারেক্টিভ এবং তথ্যভিত্তিকভাবে উপস্থাপন করা।",
    },
    vision: {
      title: "আমাদের ভিশন",
      body: "আমাদের ভিশন হলো এমন একটি বিশ্বস্ত ডিজিটাল আর্কাইভ তৈরি করা, যেখানে শিক্ষার্থী, পাঠক, গবেষক এবং ইতিহাসপ্রেমীরা সময়, বিষয়, স্থান ও মানুষের মাধ্যমে বাংলাকে অনুসন্ধান করতে পারবেন।",
    },
    collaboration: {
      eyebrow: "কীভাবে সহযোগিতা করবেন",
      title: "সহযোগিতার ক্ষেত্র",
      subtitle:
        "প্রযুক্তিগত অবদান এবং ইতিহাসভিত্তিক সতর্ক রিভিউ একসঙ্গে এলে Bengal Unfolded আরও নির্ভরযোগ্য ও ব্যবহারযোগ্য হবে।",
      cards: [
        {
          title: "ওয়েব ডেভেলপমেন্ট সহযোগিতা",
          body: "ডেভেলপার ও ডিজাইনাররা প্ল্যাটফর্মের অভিজ্ঞতা, UI, পারফরম্যান্স, অ্যাক্সেসিবিলিটি, কনটেন্ট স্ট্রাকচার এবং ইন্টারেক্টিভ ইতিহাসভিত্তিক ফিচার উন্নত করতে সহায়তা করতে পারেন।",
          points: [
            "Frontend ও UI উন্নয়ন",
            "ইন্টারেক্টিভ টাইমলাইন ও ম্যাপ ফিচার",
            "পারফরম্যান্স ও অ্যাক্সেসিবিলিটি",
            "GitHub-এর মাধ্যমে ওপেন সোর্স অবদান",
          ],
        },
        {
          title: "ইতিহাসভিত্তিক তথ্য যাচাই",
          body: "ইতিহাসবিদ, গবেষক, শিক্ষক, শিক্ষার্থী এবং ইতিহাসপ্রেমীরা তথ্য রিভিউ, তারিখ যাচাই, সূত্র উন্নয়ন এবং সংশোধনের পরামর্শ দিতে পারেন।",
          points: [
            "ইতিহাসভিত্তিক তথ্য ও তারিখ রিভিউ",
            "নির্ভরযোগ্য সূত্রের পরামর্শ",
            "ব্যক্তিত্ব, ঘটনা ও স্থান যাচাই",
            "ভুল বা অসম্পূর্ণ প্রেক্ষাপট রিপোর্ট",
          ],
        },
      ],
    },
    building: {
      eyebrow: "নির্মাণাধীন",
      title: "আমরা যা তৈরি করছি",
      subtitle: "প্ল্যাটফর্মটি ধাপে ধাপে আরও সমৃদ্ধ, সূত্রভিত্তিক এবং শেখার উপযোগী হয়ে উঠছে।",
      items: [
        "টাইমলাইন এক্সপ্লোরার",
        "ঐতিহাসিক ব্যক্তিত্ব",
        "ঘটনা ও আন্দোলন",
        "বিষয়ভিত্তিক ইতিহাস",
        "সূত্রভিত্তিক লেখা",
        "ইন্টারেক্টিভ লার্নিং পাথ",
      ],
    },
    contact: {
      title: "যোগাযোগ ও অবদান",
      body: "আপাতত Facebook বা ইমেইলের মাধ্যমে Bengal Unfolded-এর সঙ্গে যোগাযোগ করতে পারেন। ডেভেলপাররা GitHub repository দেখে উন্নয়নের প্রস্তাব দিতে পারেন।",
      buttons: {
        facebook: "Facebook Page",
        email: "ইমেইল করুন",
        github: "GitHub Repository",
      },
    },
    aside:
      "ডেভেলপার, গবেষক, শিক্ষক, শিক্ষার্থী এবং ইতিহাসপ্রেমীদের সহযোগিতা Bengal Unfolded স্বাগত জানায়। Facebook, ইমেইল বা GitHub repository-এর মাধ্যমে যোগাযোগ করতে পারেন।",
  },
} as const;

type CollaborationCard = {
  title: string;
  body: string;
  points: readonly string[];
};

function CollaborationAreaCard({ card }: { card: CollaborationCard }) {
  return (
    <article className="theme-surface rounded-[2rem] border p-6 md:p-8">
      <h3 className="text-display text-2xl font-semibold md:text-3xl">{card.title}</h3>
      <p className="theme-muted mt-4 text-sm leading-relaxed md:text-base">{card.body}</p>
      <ul className="mt-6 grid gap-3">
        {card.points.map((point) => (
          <li
            key={point}
            className="rounded-2xl border border-amber-500/20 bg-[color:var(--paper-soft)]/60 px-4 py-3 text-sm leading-relaxed md:text-base"
          >
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ContactButtons({
  locale,
  labels,
}: {
  locale: Locale;
  labels: {
    facebook: string;
    email: string;
    github: string;
  };
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={FACEBOOK_PAGE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-ink"
      >
        {labels.facebook}
        <span className="arrow">↗</span>
      </a>
      <a href={CONTACT_EMAIL_HREF} className="btn-vintage">
        {labels.email}
        <span className="arrow">→</span>
      </a>
      <a
        href={GITHUB_REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm font-medium text-accent hover:bg-amber-500/10"
      >
        {labels.github}
        <span className="arrow ml-2">↗</span>
      </a>
      <Link
        href={`/${locale}`}
        className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/25 px-4 text-sm font-medium text-[color:var(--ink)] hover:bg-amber-500/8"
      >
        {locale === "bn" ? "হোমপেজে ফিরুন" : "Back to Home"}
      </Link>
    </div>
  );
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};

  const copy = PAGE_COPY[locale as Locale];
  return buildPageMetadata({
    locale: locale as Locale,
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    canonicalPath: `/${locale}/join`,
    languagePathWithoutLocale: "/join",
    type: "website",
  });
}

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  const currentLocale = locale as Locale;
  const copy = PAGE_COPY[currentLocale];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: copy.metadataTitle,
    description: copy.metadataDescription,
    url: `https://bengalunfolded.com/${locale}/join`,
    inLanguage: localeLanguageTag(currentLocale),
  };

  return (
    <div className="space-y-8 md:space-y-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <HeroSection
        title={copy.title}
        tagline={copy.tagline}
        eyebrow={copy.eyebrow}
        rightTitle={currentLocale === "bn" ? "সহযোগিতার পথ" : "Ways To Reach Out"}
        rightLabel={currentLocale === "bn" ? "সরাসরি যোগাযোগ" : "Direct Contact"}
        rightSlot={
          <div className="space-y-4">
            <p className="theme-muted text-sm leading-relaxed md:text-base">{copy.aside}</p>
            <div className="flex flex-wrap gap-2">
              <span className="stamp">Facebook</span>
              <span className="stamp">{CONTACT_EMAIL}</span>
              <span className="stamp">GitHub</span>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href={FACEBOOK_PAGE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ink"
              >
                {copy.heroButtons.facebook}
                <span className="arrow">↗</span>
              </a>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-vintage"
              >
                {copy.heroButtons.github}
                <span className="arrow">↗</span>
              </a>
            </div>
          </div>
        }
      />

      <section className="grid gap-6 lg:grid-cols-2">
        <AnimatedContainer>
          <article className="theme-surface rounded-[2rem] border p-6 md:p-8">
            <SectionTitle title={copy.mission.title} />
            <p className="mt-6 text-sm leading-relaxed md:text-base">{copy.mission.body}</p>
          </article>
        </AnimatedContainer>
        <AnimatedContainer delay={0.06}>
          <article className="paper paper-stained rounded-[2rem] border p-6 md:p-8">
            <SectionTitle title={copy.vision.title} />
            <p className="mt-6 text-sm leading-relaxed md:text-base">{copy.vision.body}</p>
          </article>
        </AnimatedContainer>
      </section>

      <AnimatedContainer delay={0.08}>
        <section className="space-y-6">
          <SectionTitle
            eyebrow={copy.collaboration.eyebrow}
            title={copy.collaboration.title}
            subtitle={copy.collaboration.subtitle}
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {copy.collaboration.cards.map((card, index) => (
              <AnimatedContainer key={card.title} delay={0.1 + index * 0.04}>
                <CollaborationAreaCard card={card} />
              </AnimatedContainer>
            ))}
          </div>
        </section>
      </AnimatedContainer>

      <AnimatedContainer delay={0.12}>
        <section className="paper paper-stained rounded-[2rem] border p-6 md:p-8">
          <SectionTitle
            eyebrow={copy.building.eyebrow}
            title={copy.building.title}
            subtitle={copy.building.subtitle}
          />
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {copy.building.items.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-amber-500/25 bg-[color:var(--paper-soft)]/60 px-4 py-4 text-sm leading-relaxed md:text-base"
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </AnimatedContainer>

      <AnimatedContainer delay={0.14}>
        <section className="theme-surface rounded-[2rem] border p-6 md:p-8">
          <SectionTitle title={copy.contact.title} subtitle={copy.contact.body} />
          <div className="mt-6">
            <ContactButtons locale={currentLocale} labels={copy.contact.buttons} />
          </div>
        </section>
      </AnimatedContainer>
    </div>
  );
}
