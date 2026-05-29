import Link from "next/link";
import type { ReactNode } from "react";
import { useId } from "react";
import type { Locale } from "@/types/content";

type TermPattern = {
  phrase: string;
  termId: string;
};

type GlossaryPreview = {
  term: string;
  definition: string;
};

const GLOSSARY_PREVIEWS: Record<Locale, Record<string, GlossaryPreview>> = {
  en: {
    "autonomy": { term: "Autonomy", definition: "The ability of a region or political unit to govern its own affairs within a larger state framework." },
    "baksal": { term: "BAKSAL", definition: "The Bangladesh Krishak Sramik Awami League, a one-party political system introduced in Bangladesh in 1975." },
    "bengal-sultanate": { term: "Bengal Sultanate", definition: "A series of Muslim-ruled states in Bengal, especially the independent sultanate that developed from the fourteenth century." },
    "caretaker-government": { term: "Caretaker Government", definition: "A non-party interim government system used in Bangladesh to oversee elections during political transition." },
    "colonial-rule": { term: "Colonial Rule", definition: "A system where an external power governs a territory for political and economic control." },
    "digital-security-act": { term: "Digital Security Act", definition: "A Bangladesh law enacted in 2018 to regulate digital security and online offences." },
    "direct-action-day": { term: "Direct Action Day", definition: "The Muslim League's 16 August 1946 political mobilization that became associated with massive communal violence in Calcutta." },
    "diwani": { term: "Diwani", definition: "The right to collect revenue and administer civil finance in a province." },
    "east-pakistan": { term: "East Pakistan", definition: "The eastern wing of Pakistan from 1955 to 1971, corresponding broadly to present-day Bangladesh." },
    "fakir-sannyasi-resistance": { term: "Fakir-Sannyasi Resistance", definition: "A series of late eighteenth-century resistance actions involving religious mendicants, rural groups, and anti-Company unrest in Bengal." },
    "gauda": { term: "Gauda", definition: "A historical name associated with an early Bengal region, kingdom, and political center." },
    "indigo-revolt": { term: "Indigo Revolt", definition: "A major peasant resistance movement in Bengal against coercive indigo cultivation in 1859-1860." },
    "lahore-resolution": { term: "Lahore Resolution", definition: "The 1940 Muslim League resolution that called for independent states in Muslim-majority areas of British India." },
    "language-movement": { term: "Language Movement", definition: "The Bengali movement demanding recognition of Bangla as a state language of Pakistan, culminating in the 1952 martyrs' day." },
    "liberation-war": { term: "Liberation War", definition: "An armed and political struggle for national independence." },
    "mahavihara": { term: "Mahavihara", definition: "A large Buddhist monastic and educational institution, often connected to scholarship, pilgrimage, and regional patronage." },
    "martial-law": { term: "Martial Law", definition: "Direct rule by military authorities, usually suspending normal constitutional governance." },
    "mughal-subah": { term: "Mughal Subah", definition: "A province of the Mughal Empire governed through imperial administrative and revenue structures." },
    "mujibnagar-government": { term: "Mujibnagar Government", definition: "The provisional government of Bangladesh formed in April 1971 during the Liberation War." },
    "nawab": { term: "Nawab", definition: "A title used for provincial rulers or high officials, especially in Mughal and post-Mughal Bengal." },
    "operation-searchlight": { term: "Operation Searchlight", definition: "The Pakistan Army's military crackdown in East Pakistan beginning on 25 March 1971." },
    "pala-dynasty": { term: "Pala Dynasty", definition: "A major Buddhist dynasty that ruled large parts of Bengal and eastern India from the eighth to twelfth centuries." },
    "partition": { term: "Partition", definition: "Political division of a territory into separate states or administrative units." },
    "permanent-settlement": { term: "Permanent Settlement", definition: "The 1793 British revenue arrangement that fixed land revenue demands and recognized zamindars as revenue intermediaries." },
    "quota-system": { term: "Quota System", definition: "A policy mechanism reserving portions of opportunities for designated groups." },
    "radcliffe-line": { term: "Radcliffe Line", definition: "The boundary drawn in 1947 to divide British India into India and Pakistan, including the partition of Bengal." },
    "representation": { term: "Representation", definition: "Participation of people or groups in political decision-making through recognized institutions." },
    "ryot": { term: "Ryot", definition: "A cultivating peasant or tenant in South Asian agrarian revenue systems." },
    "sena-dynasty": { term: "Sena Dynasty", definition: "A Hindu dynasty that ruled parts of Bengal after the Palas and before the early thirteenth-century political transition." },
    "separate-electorates": { term: "Separate Electorates", definition: "An electoral system in which voters from particular religious or communal groups elected representatives from their own group." },
    "six-points": { term: "Six Points", definition: "Sheikh Mujibur Rahman's 1966 programme demanding extensive autonomy for East Pakistan." },
    "sovereignty": { term: "Sovereignty", definition: "Supreme political authority over a territory and its governance." },
    "swadeshi": { term: "Swadeshi", definition: "A political and economic movement promoting indigenous goods, boycott, and nationalist mobilization." },
    "zamindar": { term: "Zamindar", definition: "A landholder or revenue intermediary responsible for collecting land revenue from cultivators." },
  },
  bn: {
    "autonomy": { term: "স্বায়ত্তশাসন", definition: "বৃহত্তর রাষ্ট্র কাঠামোর ভেতরে নিজস্ব বিষয় পরিচালনার রাজনৈতিক সক্ষমতা।" },
    "baksal": { term: "বাকশাল", definition: "বাংলাদেশ কৃষক শ্রমিক আওয়ামী লীগ, ১৯৭৫ সালে বাংলাদেশে চালু করা একদলীয় রাজনৈতিক ব্যবস্থা।" },
    "bengal-sultanate": { term: "বাংলা সালতানাত", definition: "বাংলায় মুসলিম শাসিত রাষ্ট্রসমূহ, বিশেষত চতুর্দশ শতক থেকে গড়ে ওঠা স্বাধীন সালতানি রাষ্ট্র।" },
    "caretaker-government": { term: "তত্ত্বাবধায়ক সরকার", definition: "রাজনৈতিক অন্তর্বর্তী সময়ে নির্বাচন পরিচালনার জন্য বাংলাদেশে ব্যবহৃত নির্দলীয় অস্থায়ী সরকারব্যবস্থা।" },
    "colonial-rule": { term: "ঔপনিবেশিক শাসন", definition: "একটি বহিরাগত শক্তি রাজনৈতিক ও অর্থনৈতিক নিয়ন্ত্রণের জন্য যে শাসনব্যবস্থা চালায়।" },
    "digital-security-act": { term: "ডিজিটাল নিরাপত্তা আইন", definition: "ডিজিটাল নিরাপত্তা ও অনলাইন অপরাধ নিয়ন্ত্রণের জন্য ২০১৮ সালে প্রণীত বাংলাদেশের একটি আইন।" },
    "direct-action-day": { term: "ডাইরেক্ট অ্যাকশন ডে", definition: "১৬ আগস্ট ১৯৪৬ সালের মুসলিম লীগের রাজনৈতিক কর্মসূচি, যা কলকাতায় ব্যাপক সাম্প্রদায়িক সহিংসতার সঙ্গে যুক্ত হয়ে যায়।" },
    "diwani": { term: "দেওয়ানি", definition: "কোনো প্রদেশে রাজস্ব আদায় ও দেওয়ানি অর্থপ্রশাসন পরিচালনার অধিকার।" },
    "east-pakistan": { term: "পূর্ব পাকিস্তান", definition: "১৯৫৫ থেকে ১৯৭১ সাল পর্যন্ত পাকিস্তানের পূর্বাংশ, যা মোটামুটি বর্তমান বাংলাদেশের ভূখণ্ডের সঙ্গে মিলে যায়।" },
    "fakir-sannyasi-resistance": { term: "ফকির-সন্ন্যাসী প্রতিরোধ", definition: "অষ্টাদশ শতকের শেষভাগে বাংলায় ধর্মীয় ভিক্ষুজীবী গোষ্ঠী, গ্রামীণ সমাজ এবং কোম্পানি-বিরোধী অস্থিরতার সঙ্গে যুক্ত প্রতিরোধধারা।" },
    "gauda": { term: "গৌড়", definition: "প্রাচীন ও মধ্যযুগীয় বাংলার একটি অঞ্চল, রাজ্য এবং রাজনৈতিক কেন্দ্রের সঙ্গে যুক্ত ঐতিহাসিক নাম।" },
    "indigo-revolt": { term: "নীল বিদ্রোহ", definition: "১৮৫৯-১৮৬০ সালে জোরপূর্বক নীলচাষের বিরুদ্ধে বাংলার একটি বড় কৃষক প্রতিরোধ আন্দোলন।" },
    "lahore-resolution": { term: "লাহোর প্রস্তাব", definition: "১৯৪০ সালের মুসলিম লীগ প্রস্তাব, যেখানে ব্রিটিশ ভারতের মুসলিম সংখ্যাগরিষ্ঠ অঞ্চলে স্বাধীন রাষ্ট্রসমূহের দাবি তোলা হয়।" },
    "language-movement": { term: "ভাষা আন্দোলন", definition: "বাংলাকে পাকিস্তানের রাষ্ট্রভাষা হিসেবে স্বীকৃতির দাবিতে বাঙালির আন্দোলন, যা ১৯৫২ সালের শহীদ দিবসে চূড়ান্ত তাৎপর্য পায়।" },
    "liberation-war": { term: "মুক্তিযুদ্ধ", definition: "জাতীয় স্বাধীনতার জন্য সশস্ত্র ও রাজনৈতিক সংগ্রাম।" },
    "mahavihara": { term: "মহাবিহার", definition: "বৌদ্ধ শিক্ষা, সাধনা, তীর্থযাত্রা এবং রাজকীয় পৃষ্ঠপোষকতার সঙ্গে যুক্ত বৃহৎ মঠ ও শিক্ষাকেন্দ্র।" },
    "martial-law": { term: "সামরিক শাসন", definition: "সামরিক কর্তৃপক্ষের সরাসরি শাসন, যেখানে স্বাভাবিক সাংবিধানিক শাসন সীমিত বা স্থগিত থাকে।" },
    "mughal-subah": { term: "মুঘল সুবা", definition: "মুঘল সাম্রাজ্যের একটি প্রদেশ, যা সাম্রাজ্যিক প্রশাসন ও রাজস্ব কাঠামোর মাধ্যমে পরিচালিত হতো।" },
    "mujibnagar-government": { term: "মুজিবনগর সরকার", definition: "মুক্তিযুদ্ধের সময় ১৯৭১ সালের এপ্রিলে গঠিত বাংলাদেশের অস্থায়ী সরকার।" },
    "nawab": { term: "নবাব", definition: "মুঘল ও উত্তর-মুঘল বাংলায় প্রাদেশিক শাসক বা উচ্চপদস্থ কর্মকর্তার উপাধি।" },
    "operation-searchlight": { term: "অপারেশন সার্চলাইট", definition: "২৫ মার্চ ১৯৭১ থেকে পূর্ব পাকিস্তানে পাকিস্তান সেনাবাহিনীর সামরিক দমন অভিযান।" },
    "pala-dynasty": { term: "পাল রাজবংশ", definition: "অষ্টম থেকে দ্বাদশ শতক পর্যন্ত বাংলা ও পূর্ব ভারতের বড় অংশে শাসনকারী একটি প্রধান বৌদ্ধ রাজবংশ।" },
    "partition": { term: "দেশভাগ", definition: "কোনো ভূখণ্ডকে রাজনৈতিকভাবে পৃথক রাষ্ট্র বা প্রশাসনিক এককে ভাগ করা।" },
    "permanent-settlement": { term: "চিরস্থায়ী বন্দোবস্ত", definition: "১৭৯৩ সালের ব্রিটিশ রাজস্ব ব্যবস্থা, যেখানে ভূমি রাজস্ব স্থির করা হয় এবং জমিদারদের রাজস্ব-মধ্যস্থতাকারী হিসেবে স্বীকৃতি দেওয়া হয়।" },
    "quota-system": { term: "কোটা ব্যবস্থা", definition: "নির্দিষ্ট গোষ্ঠীর জন্য সুযোগের একটি অংশ সংরক্ষণের নীতিগত পদ্ধতি।" },
    "radcliffe-line": { term: "র‌্যাডক্লিফ রেখা", definition: "১৯৪৭ সালে ব্রিটিশ ভারতকে ভারত ও পাকিস্তানে ভাগ করার জন্য আঁকা সীমানা, যার মধ্যে বাংলার দেশভাগও অন্তর্ভুক্ত।" },
    "representation": { term: "প্রতিনিধিত্ব", definition: "স্বীকৃত রাজনৈতিক প্রতিষ্ঠানের মাধ্যমে জনগণ বা গোষ্ঠীর সিদ্ধান্ত প্রক্রিয়ায় অংশগ্রহণ।" },
    "ryot": { term: "রায়ত", definition: "দক্ষিণ এশীয় কৃষি-রাজস্ব ব্যবস্থায় চাষি কৃষক বা প্রজাস্বত্বধারী।" },
    "sena-dynasty": { term: "সেন রাজবংশ", definition: "পালদের পর এবং ত্রয়োদশ শতকের রাজনৈতিক রূপান্তরের আগে বাংলার অংশবিশেষে শাসনকারী একটি হিন্দু রাজবংশ।" },
    "separate-electorates": { term: "পৃথক নির্বাচনব্যবস্থা", definition: "এমন নির্বাচনব্যবস্থা যেখানে নির্দিষ্ট ধর্মীয় বা সাম্প্রদায়িক গোষ্ঠীর ভোটাররা নিজেদের গোষ্ঠী থেকে প্রতিনিধি নির্বাচন করতেন।" },
    "six-points": { term: "ছয় দফা", definition: "পূর্ব পাকিস্তানের ব্যাপক স্বায়ত্তশাসনের দাবিতে শেখ মুজিবুর রহমানের ১৯৬৬ সালের কর্মসূচি।" },
    "sovereignty": { term: "সার্বভৌমত্ব", definition: "একটি ভূখণ্ড ও তার শাসনের উপর সর্বোচ্চ রাজনৈতিক কর্তৃত্ব।" },
    "swadeshi": { term: "স্বদেশী", definition: "দেশীয় পণ্য ব্যবহার, বর্জননীতি এবং জাতীয়তাবাদী সংগঠনকে উৎসাহিত করা রাজনৈতিক ও অর্থনৈতিক আন্দোলন।" },
    "zamindar": { term: "জমিদার", definition: "ভূমির মালিক বা রাজস্ব-মধ্যস্থতাকারী, যিনি কৃষকদের কাছ থেকে ভূমি রাজস্ব আদায়ের দায়িত্ব পালন করতেন।" },
  },
};

const TERM_PATTERNS: Record<Locale, TermPattern[]> = {
  en: [
    { phrase: "Operation Searchlight", termId: "operation-searchlight" },
    { phrase: "Mujibnagar Government", termId: "mujibnagar-government" },
    { phrase: "Permanent Settlement", termId: "permanent-settlement" },
    { phrase: "separate electorates", termId: "separate-electorates" },
    { phrase: "Digital Security Act", termId: "digital-security-act" },
    { phrase: "caretaker government", termId: "caretaker-government" },
    { phrase: "Fakir-Sannyasi resistance", termId: "fakir-sannyasi-resistance" },
    { phrase: "Direct Action Day", termId: "direct-action-day" },
    { phrase: "Lahore Resolution", termId: "lahore-resolution" },
    { phrase: "Bengal Sultanate", termId: "bengal-sultanate" },
    { phrase: "Language Movement", termId: "language-movement" },
    { phrase: "Radcliffe Line", termId: "radcliffe-line" },
    { phrase: "East Pakistan", termId: "east-pakistan" },
    { phrase: "Pala Dynasty", termId: "pala-dynasty" },
    { phrase: "Sena Dynasty", termId: "sena-dynasty" },
    { phrase: "Mughal Subah", termId: "mughal-subah" },
    { phrase: "Indigo Revolt", termId: "indigo-revolt" },
    { phrase: "Mahavihara", termId: "mahavihara" },
    { phrase: "Six Points", termId: "six-points" },
    { phrase: "colonial rule", termId: "colonial-rule" },
    { phrase: "martial law", termId: "martial-law" },
    { phrase: "autonomy", termId: "autonomy" },
    { phrase: "representation", termId: "representation" },
    { phrase: "partition", termId: "partition" },
    { phrase: "quota system", termId: "quota-system" },
    { phrase: "sovereignty", termId: "sovereignty" },
    { phrase: "liberation war", termId: "liberation-war" },
    { phrase: "Swadeshi", termId: "swadeshi" },
    { phrase: "Diwani", termId: "diwani" },
    { phrase: "Nawab", termId: "nawab" },
    { phrase: "Zamindar", termId: "zamindar" },
    { phrase: "Ryot", termId: "ryot" },
    { phrase: "BAKSAL", termId: "baksal" },
    { phrase: "Gauda", termId: "gauda" },
  ],
  bn: [
    { phrase: "অপারেশন সার্চলাইট", termId: "operation-searchlight" },
    { phrase: "মুজিবনগর সরকার", termId: "mujibnagar-government" },
    { phrase: "চিরস্থায়ী বন্দোবস্ত", termId: "permanent-settlement" },
    { phrase: "পৃথক নির্বাচনব্যবস্থা", termId: "separate-electorates" },
    { phrase: "ডিজিটাল নিরাপত্তা আইন", termId: "digital-security-act" },
    { phrase: "তত্ত্বাবধায়ক সরকার", termId: "caretaker-government" },
    { phrase: "ফকির-সন্ন্যাসী প্রতিরোধ", termId: "fakir-sannyasi-resistance" },
    { phrase: "ডাইরেক্ট অ্যাকশন ডে", termId: "direct-action-day" },
    { phrase: "লাহোর প্রস্তাব", termId: "lahore-resolution" },
    { phrase: "বাংলা সালতানাত", termId: "bengal-sultanate" },
    { phrase: "ভাষা আন্দোলন", termId: "language-movement" },
    { phrase: "র‌্যাডক্লিফ রেখা", termId: "radcliffe-line" },
    { phrase: "পূর্ব পাকিস্তান", termId: "east-pakistan" },
    { phrase: "পাল রাজবংশ", termId: "pala-dynasty" },
    { phrase: "সেন রাজবংশ", termId: "sena-dynasty" },
    { phrase: "মুঘল সুবা", termId: "mughal-subah" },
    { phrase: "নীল বিদ্রোহ", termId: "indigo-revolt" },
    { phrase: "মহাবিহার", termId: "mahavihara" },
    { phrase: "ছয় দফা", termId: "six-points" },
    { phrase: "ঔপনিবেশিক শাসন", termId: "colonial-rule" },
    { phrase: "সামরিক শাসন", termId: "martial-law" },
    { phrase: "স্বায়ত্তশাসন", termId: "autonomy" },
    { phrase: "প্রতিনিধিত্ব", termId: "representation" },
    { phrase: "দেশভাগ", termId: "partition" },
    { phrase: "কোটা ব্যবস্থা", termId: "quota-system" },
    { phrase: "সার্বভৌমত্ব", termId: "sovereignty" },
    { phrase: "মুক্তিযুদ্ধ", termId: "liberation-war" },
    { phrase: "স্বদেশী", termId: "swadeshi" },
    { phrase: "দেওয়ানি", termId: "diwani" },
    { phrase: "নবাব", termId: "nawab" },
    { phrase: "জমিদার", termId: "zamindar" },
    { phrase: "রায়ত", termId: "ryot" },
    { phrase: "বাকশাল", termId: "baksal" },
    { phrase: "গৌড়", termId: "gauda" },
  ],
};

function GlossaryTermLink({
  children,
  locale,
  termId,
}: {
  children: string;
  locale: Locale;
  termId: string;
}) {
  const tooltipId = useId();
  const preview = GLOSSARY_PREVIEWS[locale][termId];
  if (!preview) {
    return (
      <Link href={`/${locale}/glossary/${termId}`} className="underline decoration-amber-500/70 underline-offset-2 hover:text-amber-300">
        {children}
      </Link>
    );
  }

  const ariaLabel = locale === "bn"
    ? `${preview.term}: ${preview.definition}`
    : `${preview.term}: ${preview.definition}`;

  return (
    <Link
      href={`/${locale}/glossary/${termId}`}
      className="glossary-term-link"
      aria-describedby={tooltipId}
      aria-label={ariaLabel}
      title={preview.definition}
    >
      <span aria-hidden="true">{children}</span>
      <span id={tooltipId} role="tooltip" className="glossary-term-tooltip">
        <span className="glossary-term-tooltip-title">{preview.term}</span>
        <span className="glossary-term-tooltip-definition">{preview.definition}</span>
      </span>
    </Link>
  );
}

export function renderGlossaryLinkedText(text: string, locale: Locale) {
  const patterns = TERM_PATTERNS[locale];
  const nodes: ReactNode[] = [];
  const comparableText = locale === "en" ? text.toLowerCase() : text;
  let cursor = 0;
  let plainTextStart = 0;

  while (cursor < text.length) {
    const pattern = patterns.find((candidate) => {
      const phrase = locale === "en" ? candidate.phrase.toLowerCase() : candidate.phrase;
      return comparableText.startsWith(phrase, cursor);
    });

    if (!pattern) {
      cursor += 1;
      continue;
    }

    const matched = text.slice(cursor, cursor + pattern.phrase.length);
    if (plainTextStart < cursor) nodes.push(text.slice(plainTextStart, cursor));
    cursor += pattern.phrase.length;
    nodes.push(
      <GlossaryTermLink key={`${pattern.termId}-${cursor}`} locale={locale} termId={pattern.termId}>
        {matched}
      </GlossaryTermLink>,
    );
    plainTextStart = cursor;
  }

  if (nodes.length === 0) return text;
  if (plainTextStart < text.length) nodes.push(text.slice(plainTextStart));

  return <>{nodes}</>;
}
