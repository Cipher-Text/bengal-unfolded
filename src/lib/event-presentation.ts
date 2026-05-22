import type { EventSlug, Locale, TimelineTheme } from "@/types/content";

export const EVENT_THEME_BY_SLUG: Partial<Record<EventSlug, TimelineTheme[]>> = {
  "1757-battle-of-plassey": ["war", "economy"],
  "1765-east-india-company-gets-diwani-rights-in-bengal": ["economy", "democracy"],
  "1793-permanent-settlement-in-bengal": ["economy", "democracy"],
  "1857-sipahi-revolt": ["war", "democracy"],
  "1906-all-india-muslim-league-founded-in-dhaka": ["democracy", "culture"],
  "1911-annulment-of-bengal-partition": ["democracy", "culture"],
  "1943-bengal-famine": ["economy", "war"],
  "1947-partition-and-eastern-bengal": ["war", "democracy"],
  "1952-language-movement": ["language", "culture", "democracy"],
  "1954-united-front-election-victory-in-east-bengal": ["democracy"],
  "1958-martial-law-in-pakistan": ["democracy"],
  "1966-six-point-programme-announced": ["democracy", "economy"],
  "1969-mass-uprising": ["democracy"],
  "1971-liberation-war": ["war", "democracy"],
  "1975-baksal-formation-and-collapse": ["democracy"],
  "1990-mass-uprising": ["democracy"],
  "2006-caretaker-crisis-and-emergency-rule": ["democracy"],
  "2013-shahbag-movement": ["democracy"],
  "2024-anti-discrimination-movement": ["democracy", "economy"],
};

const PHASE_LABELS_EN: Partial<Record<EventSlug, string>> = {
  "1757-battle-of-plassey": "Plassey",
  "1765-east-india-company-gets-diwani-rights-in-bengal": "Diwani",
  "1793-permanent-settlement-in-bengal": "Settlement",
  "1857-sipahi-revolt": "Revolt",
  "1947-partition-and-eastern-bengal": "Partition",
  "1952-language-movement": "Language",
  "1969-mass-uprising": "Uprising",
  "1971-liberation-war": "Liberation",
  "1975-baksal-formation-and-collapse": "BAKSAL",
  "1990-mass-uprising": "Democracy",
  "2006-caretaker-crisis-and-emergency-rule": "Caretaker Crisis",
  "2024-anti-discrimination-movement": "Justice",
};

const PHASE_LABELS_BN: Partial<Record<EventSlug, string>> = {
  "1757-battle-of-plassey": "পলাশী",
  "1765-east-india-company-gets-diwani-rights-in-bengal": "দেওয়ানি",
  "1793-permanent-settlement-in-bengal": "বন্দোবস্ত",
  "1857-sipahi-revolt": "বিদ্রোহ",
  "1947-partition-and-eastern-bengal": "বিভাজন",
  "1952-language-movement": "ভাষা",
  "1969-mass-uprising": "অভ্যুত্থান",
  "1971-liberation-war": "স্বাধীনতা",
  "1975-baksal-formation-and-collapse": "বাকশাল",
  "1990-mass-uprising": "গণতন্ত্র",
  "2006-caretaker-crisis-and-emergency-rule": "তত্ত্বাবধায়ক সংকট",
  "2024-anti-discrimination-movement": "ন্যায্যতা",
};

export function getPhaseLabel(locale: Locale, slug: EventSlug): string | undefined {
  return locale === "bn" ? PHASE_LABELS_BN[slug] : PHASE_LABELS_EN[slug];
}
