import type { Locale, ResourceCategory, SourceQuality } from "@/types/content";

export const RESOURCE_CATEGORIES: ResourceCategory[] = ["primary-sources", "academic-books", "research-articles-and-papers", "reference-sources", "memoirs-and-eyewitness-accounts", "maps-and-visual-sources", "documentary-and-video", "news-and-contemporary-reports", "cultural-and-literary-resources", "further-reading"];
export const SOURCE_QUALITIES: SourceQuality[] = ["primary", "secondary", "archive", "editorial"];

export const CATEGORY_LABELS: Record<Locale, Record<ResourceCategory, string>> = {
  en: { "primary-sources": "Documents and records", "academic-books": "Academic books", "research-articles-and-papers": "Research articles", "reference-sources": "Reference works", "memoirs-and-eyewitness-accounts": "Memoirs and eyewitness accounts", "maps-and-visual-sources": "Maps and visual sources", "documentary-and-video": "Documentary and video", "news-and-contemporary-reports": "News and contemporary reports", "cultural-and-literary-resources": "Cultural and literary works", "further-reading": "Further reading" },
  bn: { "primary-sources": "নথি ও রেকর্ড", "academic-books": "অ্যাকাডেমিক বই", "research-articles-and-papers": "গবেষণা প্রবন্ধ", "reference-sources": "রেফারেন্স গ্রন্থ", "memoirs-and-eyewitness-accounts": "স্মৃতিকথা ও প্রত্যক্ষদর্শীর বর্ণনা", "maps-and-visual-sources": "মানচিত্র ও ভিজ্যুয়াল সূত্র", "documentary-and-video": "ডকুমেন্টারি ও ভিডিও", "news-and-contemporary-reports": "সংবাদ ও সমসাময়িক প্রতিবেদন", "cultural-and-literary-resources": "সাংস্কৃতিক ও সাহিত্যিক রচনা", "further-reading": "আরও পড়ুন" },
};

export const QUALITY_LABELS: Record<Locale, Record<SourceQuality, string>> = {
  en: { primary: "Primary", secondary: "Secondary", archive: "Archive", editorial: "Editorial" },
  bn: { primary: "প্রাথমিক", secondary: "গৌণ", archive: "আর্কাইভ", editorial: "সম্পাদকীয়" },
};

// Short readings of the source-quality rubric in docs/EDITORIAL_GUIDELINES.md.
export const QUALITY_HELP: Record<Locale, Record<SourceQuality, string>> = {
  en: { primary: "First-hand or official records", secondary: "Scholarly analysis and explainers", archive: "Curated collections of records", editorial: "Essays, films and commentary" },
  bn: { primary: "প্রত্যক্ষ বা সরকারি নথি", secondary: "গবেষণা-বিশ্লেষণ ও ব্যাখ্যা", archive: "নথির বাছাই সংগ্রহ", editorial: "প্রবন্ধ, চলচ্চিত্র ও মন্তব্য" },
};

export const EVIDENCE_LABELS: Record<Locale, Record<"high" | "medium" | "low", string>> = {
  en: { high: "High", medium: "Medium", low: "Low" },
  bn: { high: "উচ্চ", medium: "মাঝারি", low: "নিম্ন" },
};
