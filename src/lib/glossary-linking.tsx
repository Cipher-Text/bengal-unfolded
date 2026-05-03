import Link from "next/link";
import type { Locale } from "@/types/content";

type TermPattern = {
  phrase: string;
  termId: string;
};

const TERM_PATTERNS: Record<Locale, TermPattern[]> = {
  en: [
    { phrase: "colonial rule", termId: "colonial-rule" },
    { phrase: "martial law", termId: "martial-law" },
    { phrase: "autonomy", termId: "autonomy" },
    { phrase: "representation", termId: "representation" },
    { phrase: "partition", termId: "partition" },
    { phrase: "quota system", termId: "quota-system" },
    { phrase: "sovereignty", termId: "sovereignty" },
    { phrase: "liberation war", termId: "liberation-war" },
  ],
  bn: [
    { phrase: "ঔপনিবেশিক শাসন", termId: "colonial-rule" },
    { phrase: "সামরিক শাসন", termId: "martial-law" },
    { phrase: "স্বায়ত্তশাসন", termId: "autonomy" },
    { phrase: "প্রতিনিধিত্ব", termId: "representation" },
    { phrase: "দেশভাগ", termId: "partition" },
    { phrase: "কোটা ব্যবস্থা", termId: "quota-system" },
    { phrase: "সার্বভৌমত্ব", termId: "sovereignty" },
    { phrase: "মুক্তিযুদ্ধ", termId: "liberation-war" },
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
