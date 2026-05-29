import Link from "next/link";
import type { Locale } from "@/types/content";

type TermPattern = {
  phrase: string;
  termId: string;
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

export function renderGlossaryLinkedText(text: string, locale: Locale) {
  const patterns = TERM_PATTERNS[locale];
  for (const pattern of patterns) {
    const idx = locale === "en"
      ? text.toLowerCase().indexOf(pattern.phrase.toLowerCase())
      : text.indexOf(pattern.phrase);
    if (idx === -1) continue;
    const matched = text.slice(idx, idx + pattern.phrase.length);
    return (
      <>
        {text.slice(0, idx)}
        <Link href={`/${locale}/glossary/${pattern.termId}`} className="underline decoration-amber-500/70 underline-offset-2 hover:text-amber-300">
          {matched}
        </Link>
        {text.slice(idx + pattern.phrase.length)}
      </>
    );
  }
  return text;
}
