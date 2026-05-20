import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { buildPageMetadata, localeLanguageTag } from "@/lib/seo";
import { SUPPORTED_LOCALES, type Locale } from "@/types/content";

const PAGE_COPY = {
  en: {
    title: "Methodology",
    tagline: "How Bengal Unfolded handles claims, sources, memory, and editorial judgment.",
    intro:
      "This project is designed as a bilingual public-history reference, not a fast-moving news surface. The methodology below explains how chapters are written, how evidence is classified, and how uncertainty is handled.",
    eyebrow: "Public Trust · Editorial Method",
    metadataTitle: "Methodology | Bengal Unfolded",
    metadataDescription:
      "Read how Bengal Unfolded handles source quality, evidence levels, contested history, localization parity, and corrections.",
    quickTitle: "What This Page Covers",
    quickSubtitle: "The minimum rules readers should expect across events, figures, books, resources, and topic hubs.",
    quickPoints: [
      "Every historical page should connect claims to explicit sources whenever the model supports it.",
      "Source quality labels describe evidence class, not automatic truthfulness.",
      "Sensitive or contested history is written with neutrality, caution, and visible sourcing.",
      "English and Bangla should carry the same factual meaning, not separate narratives.",
    ],
    processTitle: "Editorial Workflow",
    processSubtitle: "From source collection to public page publication.",
    processSteps: [
      {
        title: "1. Collect",
        detail: "We gather books, articles, archives, reports, and reference works relevant to a chapter, person, or topic.",
      },
      {
        title: "2. Structure",
        detail: "Claims are mapped into normalized content fields so events, figures, periods, places, and resources remain linkable.",
      },
      {
        title: "3. Cite",
        detail: "Timeline items and major narrative sections use explicit source IDs and evidence-level metadata where required.",
      },
      {
        title: "4. Review",
        detail: "Sensitive framing, wording, localization parity, and linked-entity integrity are checked before publication.",
      },
    ],
    sourceTitle: "Source Quality Classes",
    sourceSubtitle: "These labels indicate what kind of source a reader is looking at.",
    sourceCards: [
      {
        name: "Primary",
        body: "Original or first-hand material such as official records, direct testimony, speeches, or first-party documents.",
      },
      {
        name: "Secondary",
        body: "Analytical or reference-oriented works that interpret, synthesize, or explain historical material.",
      },
      {
        name: "Archive",
        body: "Collections, repositories, and catalog-style archival surfaces that preserve or expose historical records.",
      },
      {
        name: "Editorial",
        body: "Narrative, interpretive, or opinion-driven works where persuasion or storytelling is stronger than documentary method.",
      },
    ],
    evidenceTitle: "Evidence Levels",
    evidenceSubtitle: "Evidence labels reflect confidence in support for a specific claim, not a claim’s moral or political importance.",
    evidenceCards: [
      {
        name: "High",
        body: "Used when a claim is strongly supported by reliable and specific source material.",
      },
      {
        name: "Medium",
        body: "Used when support is meaningful but partial, indirect, or dependent on synthesis across sources.",
      },
      {
        name: "Low",
        body: "Used when support is limited, interpretive, or still useful mainly as contextual guidance rather than firm confirmation.",
      },
    ],
    contestedTitle: "Contested and Sensitive History",
    contestedSubtitle: "Not all historical memory is settled. The writing standard is restraint, not rhetorical victory.",
    contestedPoints: [
      "When disagreement exists in sources, the preferred approach is to summarize the disagreement rather than flatten it into one absolute claim.",
      "Potentially traumatic, violent, or politically sensitive chapters should use stronger sourcing and may carry reader-facing warnings.",
      "Source quality and evidence level are shown so readers can distinguish well-supported claims from weaker contextual framing.",
    ],
    parityTitle: "Bilingual Parity",
    paritySubtitle: "Localization is not allowed to create two different factual histories.",
    parityPoints: [
      "English and Bangla should preserve the same core factual meaning.",
      "If one locale changes factual content, the other locale should be updated in the same change set.",
      "Proper nouns, dates, and linked entity references should stay aligned across locales.",
    ],
    correctionsTitle: "Corrections and Revisions",
    correctionsSubtitle: "This is a living archive. Accuracy work continues after publication.",
    correctionsBody:
      "When a claim, label, or linkage is found to be weak, incomplete, or wrong, the expected response is correction with traceable updates. Major feature and model changes are recorded in the changelog, and content-model changes are expected to remain synchronized with validation and documentation.",
    roadmapTitle: "Where This Leads",
    roadmapSubtitle:
      "This page is a public-facing foundation for later trust features such as contested-history markers, debate blocks, version history, and correction workflows.",
    closingTitle: "Related Internal Docs",
    closingSubtitle: "The public page is backed by stricter internal rules used during editing and validation.",
    links: {
      contract: "AI Contract",
      editorial: "Editorial Rules",
      model: "Content Model",
      rubric: "Source Quality Rubric",
    },
  },
  bn: {
    title: "পদ্ধতি",
    tagline: "বেঙ্গল আনফোল্ডেড কীভাবে দাবি, সূত্র, স্মৃতি ও সম্পাদকীয় সিদ্ধান্ত সামলায়।",
    intro:
      "এই প্রকল্পটি দ্রুতগতির সংবাদ-পৃষ্ঠা নয়; এটি দ্বিভাষিক পাবলিক-হিস্ট্রি রেফারেন্স হিসেবে নির্মিত। নিচের পদ্ধতি অংশে দেখানো হয়েছে কীভাবে অধ্যায় লেখা হয়, কীভাবে প্রমাণ শ্রেণিবদ্ধ হয়, এবং কীভাবে অনিশ্চয়তা সামলানো হয়।",
    eyebrow: "জনআস্থা · সম্পাদকীয় পদ্ধতি",
    metadataTitle: "পদ্ধতি | Bengal Unfolded",
    metadataDescription:
      "বেঙ্গল আনফোল্ডেড কীভাবে সূত্রের মান, প্রমাণের স্তর, বিতর্কিত ইতিহাস, ভাষাগত সামঞ্জস্য এবং সংশোধন নীতি সামলায় তা পড়ুন।",
    quickTitle: "এই পৃষ্ঠায় যা আছে",
    quickSubtitle: "ইভেন্ট, ব্যক্তিত্ব, বই, রিসোর্স ও টপিক হাব জুড়ে পাঠকের যে ন্যূনতম নিয়ম আশা করা উচিত।",
    quickPoints: [
      "মডেল যেখানে সমর্থন দেয়, সেখানে ঐতিহাসিক দাবিগুলোকে স্পষ্ট সূত্রের সঙ্গে যুক্ত করা উচিত।",
      "সূত্রের মান-লেবেল কোনো সূত্রকে স্বয়ংক্রিয়ভাবে সত্য ঘোষণা করে না; এটি শুধু তার প্রকৃতি বোঝায়।",
      "সংবেদনশীল বা বিতর্কিত ইতিহাস নিরপেক্ষতা, সতর্কতা ও দৃশ্যমান সূত্রসহ লেখা হয়।",
      "ইংরেজি ও বাংলা একই তথ্যগত অর্থ বহন করবে; আলাদা ইতিহাস বানাবে না।",
    ],
    processTitle: "সম্পাদকীয় কার্যপ্রবাহ",
    processSubtitle: "সূত্র সংগ্রহ থেকে প্রকাশিত পৃষ্ঠা পর্যন্ত।",
    processSteps: [
      {
        title: "১. সংগ্রহ",
        detail: "আমরা কোনো অধ্যায়, ব্যক্তি বা টপিকের জন্য প্রাসঙ্গিক বই, প্রবন্ধ, আর্কাইভ, প্রতিবেদন ও রেফারেন্স উপাদান সংগ্রহ করি।",
      },
      {
        title: "২. বিন্যাস",
        detail: "দাবিগুলোকে স্বাভাবিকীকৃত কনটেন্ট ফিল্ডে সাজানো হয় যাতে ইভেন্ট, ব্যক্তিত্ব, পর্ব, স্থান ও রিসোর্স একে অপরের সঙ্গে যুক্ত থাকে।",
      },
      {
        title: "৩. সূত্রায়ন",
        detail: "যেখানে প্রয়োজন, টাইমলাইন আইটেম ও প্রধান বর্ণনামূলক অংশে স্পষ্ট source ID ও evidence level যোগ করা হয়।",
      },
      {
        title: "৪. পর্যালোচনা",
        detail: "সংবেদনশীল ভাষা, শব্দচয়ন, EN/BN সামঞ্জস্য এবং linked-entity integrity প্রকাশের আগে পরীক্ষা করা হয়।",
      },
    ],
    sourceTitle: "সূত্রের মানের শ্রেণি",
    sourceSubtitle: "এই লেবেলগুলো পাঠককে বোঝায় তিনি কী ধরনের সূত্র দেখছেন।",
    sourceCards: [
      {
        name: "Primary",
        body: "মূল বা প্রত্যক্ষ উৎস; যেমন সরকারি নথি, প্রত্যক্ষ সাক্ষ্য, ভাষণ, বা প্রথম-পক্ষের দলিল।",
      },
      {
        name: "Secondary",
        body: "বিশ্লেষণধর্মী বা রেফারেন্সধর্মী কাজ, যা ঐতিহাসিক উপাদানকে ব্যাখ্যা, বিশ্লেষণ বা সংকলন করে।",
      },
      {
        name: "Archive",
        body: "সংগ্রহশালা, রিপোজিটরি বা ক্যাটালগধর্মী আর্কাইভ, যা ঐতিহাসিক নথি সংরক্ষণ বা উন্মুক্ত করে।",
      },
      {
        name: "Editorial",
        body: "এমন কাজ যেখানে দলিলভিত্তিক পদ্ধতির চেয়ে বর্ণনা, ব্যাখ্যা বা মতামত বেশি প্রভাবশালী।",
      },
    ],
    evidenceTitle: "প্রমাণের স্তর",
    evidenceSubtitle: "Evidence label কোনো দাবির নৈতিক গুরুত্ব নয়, বরং তার সমর্থনের শক্তি বোঝায়।",
    evidenceCards: [
      {
        name: "High",
        body: "যখন কোনো দাবি নির্দিষ্ট ও নির্ভরযোগ্য সূত্রে শক্তভাবে সমর্থিত হয়।",
      },
      {
        name: "Medium",
        body: "যখন সমর্থন অর্থবহ হলেও আংশিক, পরোক্ষ, বা একাধিক সূত্র মিলিয়ে গঠিত হয়।",
      },
      {
        name: "Low",
        body: "যখন সমর্থন সীমিত, বেশি ব্যাখ্যানির্ভর, বা দৃঢ় নিশ্চয়তার চেয়ে প্রেক্ষাপট বোঝাতে বেশি সহায়ক।",
      },
    ],
    contestedTitle: "বিতর্কিত ও সংবেদনশীল ইতিহাস",
    contestedSubtitle: "সব ঐতিহাসিক স্মৃতি একরকম স্থির নয়। এখানে মানদণ্ড হলো সংযম, স্লোগান নয়।",
    contestedPoints: [
      "সূত্রে মতভেদ থাকলে একে একক চূড়ান্ত দাবি বানানোর বদলে মতভেদের সারাংশ তুলে ধরা উত্তম।",
      "আঘাতজনক, সহিংস বা রাজনৈতিকভাবে সংবেদনশীল অধ্যায়ে শক্তিশালী সূত্র ব্যবহারের মানদণ্ড বেশি কঠোর হওয়া উচিত, এবং পাঠক-সতর্কতাও থাকতে পারে।",
      "সূত্রের মান ও evidence level দেখানো হয় যাতে পাঠক দৃঢ় দাবির সঙ্গে দুর্বল প্রেক্ষাপটমূলক দাবির পার্থক্য বুঝতে পারেন।",
    ],
    parityTitle: "দ্বিভাষিক সামঞ্জস্য",
    paritySubtitle: "লোকালাইজেশন মানে দুই ভাষায় দুই রকম তথ্যগত ইতিহাস নয়।",
    parityPoints: [
      "ইংরেজি ও বাংলা একই মূল তথ্যগত অর্থ ধরে রাখবে।",
      "এক ভাষায় তথ্যগত পরিবর্তন হলে একই পরিবর্তন অন্য ভাষাতেও একই change set-এ হওয়া উচিত।",
      "Proper noun, তারিখ, এবং linked entity reference দুই ভাষায় সমন্বিত থাকা উচিত।",
    ],
    correctionsTitle: "সংশোধন ও পুনর্বিবেচনা",
    correctionsSubtitle: "এটি একটি চলমান আর্কাইভ; প্রকাশের পরেও নির্ভুলতার কাজ চলবে।",
    correctionsBody:
      "কোনো দাবি, লেবেল বা লিংক দুর্বল, অসম্পূর্ণ বা ভুল প্রমাণিত হলে প্রত্যাশিত প্রতিক্রিয়া হলো traceable update সহ সংশোধন করা। বড় ফিচার ও মডেল পরিবর্তন changelog-এ নথিভুক্ত করা হয়, এবং content-model পরিবর্তন validation ও documentation-এর সঙ্গে সমন্বিত থাকার কথা।",
    roadmapTitle: "এখান থেকে পরবর্তী ধাপ",
    roadmapSubtitle:
      "এই পৃষ্ঠা ভবিষ্যতের trust feature যেমন contested-history marker, debate block, version history এবং correction workflow-এর জন্য প্রকাশ্য ভিত্তি তৈরি করে।",
    closingTitle: "সম্পর্কিত অভ্যন্তরীণ নথি",
    closingSubtitle: "এই public page-এর পেছনে আছে আরও কঠোর internal rule, যা editing ও validation-এ ব্যবহৃত হয়।",
    links: {
      contract: "AI Contract",
      editorial: "Editorial Rules",
      model: "Content Model",
      rubric: "Source Quality Rubric",
    },
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return {};
  const copy = PAGE_COPY[locale as Locale];

  return buildPageMetadata({
    locale: locale as Locale,
    title: copy.metadataTitle,
    description: copy.metadataDescription,
    canonicalPath: `/${locale}/methodology`,
    languagePathWithoutLocale: "/methodology",
    type: "website",
  });
}

function RuleList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="theme-surface rounded-2xl border p-4 text-sm leading-relaxed md:text-base">
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function MethodologyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) notFound();

  const copy = PAGE_COPY[locale as Locale];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: copy.title,
    description: copy.metadataDescription,
    url: `https://bengalunfolded.com/${locale}/methodology`,
    inLanguage: localeLanguageTag(locale as Locale),
  };

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <HeroSection
        title={copy.title}
        tagline={copy.tagline}
        intro={copy.intro}
        eyebrow={copy.eyebrow}
        rightSlot={
          <div className="space-y-3">
            <p className="theme-muted text-sm leading-relaxed">
              {locale === "bn"
                ? "পাবলিক-ফেসিং এই নীতিপত্রটি পাঠকদের বোঝায়, কোনো দাবি কীভাবে পৃষ্ঠায় পৌঁছায়।"
                : "This public-facing note explains how a historical claim reaches the page."}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="stamp">Primary / Secondary / Archive / Editorial</span>
              <span className="stamp">High / Medium / Low</span>
            </div>
          </div>
        }
      />

      <section className="theme-surface rounded-[2rem] border p-5 md:p-8">
        <SectionTitle title={copy.quickTitle} subtitle={copy.quickSubtitle} />
        <div className="mt-6">
          <RuleList items={copy.quickPoints} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="theme-surface rounded-[2rem] border p-5 md:p-8">
          <SectionTitle title={copy.processTitle} subtitle={copy.processSubtitle} />
          <div className="mt-6 grid gap-4">
            {copy.processSteps.map((step) => (
              <article key={step.title} className="rounded-2xl border border-amber-500/20 bg-[color:var(--paper-soft)]/50 p-4">
                <h3 className="font-display text-xl">{step.title}</h3>
                <p className="theme-muted mt-2 text-sm leading-relaxed md:text-base">{step.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="paper paper-stained torn-bottom rounded-[2rem] border p-5 md:p-8">
          <SectionTitle title={copy.correctionsTitle} subtitle={copy.correctionsSubtitle} />
          <p className="mt-6 text-sm leading-relaxed md:text-base">{copy.correctionsBody}</p>
          <div className="rule-double mt-6" />
          <h3 className="text-eyebrow mt-6">{copy.roadmapTitle}</h3>
          <p className="theme-muted mt-3 text-sm leading-relaxed md:text-base">{copy.roadmapSubtitle}</p>
        </div>
      </section>

      <section className="theme-surface rounded-[2rem] border p-5 md:p-8">
        <SectionTitle title={copy.sourceTitle} subtitle={copy.sourceSubtitle} />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {copy.sourceCards.map((card) => (
            <article key={card.name} className="rounded-2xl border border-amber-500/25 p-4">
              <p className="text-eyebrow">{card.name}</p>
              <p className="mt-3 text-sm leading-relaxed md:text-base">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="theme-surface rounded-[2rem] border p-5 md:p-8">
        <SectionTitle title={copy.evidenceTitle} subtitle={copy.evidenceSubtitle} />
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {copy.evidenceCards.map((card) => (
            <article key={card.name} className="rounded-2xl border border-emerald-500/25 p-4">
              <p className="text-eyebrow">{card.name}</p>
              <p className="mt-3 text-sm leading-relaxed md:text-base">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="theme-surface rounded-[2rem] border p-5 md:p-8">
          <SectionTitle title={copy.contestedTitle} subtitle={copy.contestedSubtitle} />
          <div className="mt-6">
            <RuleList items={copy.contestedPoints} />
          </div>
        </div>

        <div className="theme-surface rounded-[2rem] border p-5 md:p-8">
          <SectionTitle title={copy.parityTitle} subtitle={copy.paritySubtitle} />
          <div className="mt-6">
            <RuleList items={copy.parityPoints} />
          </div>
        </div>
      </section>

      <section className="theme-surface rounded-[2rem] border p-5 md:p-8">
        <SectionTitle title={copy.closingTitle} subtitle={copy.closingSubtitle} />
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm">
            {copy.links.contract}
          </span>
          <span className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm">
            {copy.links.editorial}
          </span>
          <span className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm">
            {copy.links.model}
          </span>
          <span className="inline-flex min-h-[44px] items-center rounded-lg border border-amber-500/40 px-4 text-sm">
            {copy.links.rubric}
          </span>
        </div>
      </section>
    </div>
  );
}
