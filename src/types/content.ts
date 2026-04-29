export const SUPPORTED_LOCALES = ["en", "bn"] as const;
export const SUPPORTED_EVENT_SLUGS = ["1947", "1952", "1971", "1990", "2024"] as const;
export const SUPPORTED_HERO_IDS = [
  "sheikh-mujibur-rahman",
  "syed-nazrul-islam",
  "tajuddin-ahmad",
  "mansur-ali",
  "ahm-qamaruzzaman",
  "mag-osmani",
  "ziaur-rahman",
  "khaled-mosharraf",
  "km-shafiullah",
  "asm-abdur-rab",
  "abu-taher",
  "cr-dutta",
  "mir-shawkat-ali",
  "nazmul-huq",
  "kazi-nuruzzaman",
  "ruhul-amin",
  "mostafa-kamal",
  "munshi-abdur-rouf",
  "matiur-rahman",
  "hamidur-rahman",
  "noor-mohammad-sheikh",
  "munir-ahmed",
  "abu-osman-chowdhury",
  "shafi-imam-rumi",
  "badiul-alam",
  "shaheed-azad",
  "jahangir-alam",
  "mofazzal-hossain-chowdhury-maya",
  "abdul-halim-chowdhury",
  "govinda-chandra-dev",
  "atm-haider",
  "shamsul-alam",
  "major-jalil",
  "major-zafar-imam",
  "abdul-jabbar",
  "shahnaz-rahmatullah",
  "swadhin-bangla-betar-artists",
  "munier-chowdhury",
  "fazle-rabbi",
  "alim-chowdhury",
  "anwar-pasha",
  "hafizuddin-ahmed",
  "kader-siddique",
  "abu-sayeed-chowdhury",
  "kamruzzaman-tuku",
  "abdul-mannan",
  "shamsuzzoha",
  "kamal-lohani",
  "key-figure-1",
  "key-figure-2",
  "nahid-islam",
  "asif-mahmud",
  "sarjis-alam",
  "hasnat-abdullah",
  "abu-baker-majumder",
  "abdul-hannan-masud",
  "umama-fatema",
  "arif-sohel",
  "mahin-sarkar",
  "rifat-rashid",
  "nusrat-tabassum",
  "lutfun-nahar-luma",
  "hasib-al-islam",
  "nasiruddin-patwary",
  "akhter-hossen",
  "tariqul-islam",
  "mehedi-hasan",
  "sinthia-jaheen-ayesha",
  "rashidul-islam-rifat",
  "md-enamul-hasan",
  "abdullah-al-amin",
  "shadik-kayem",
  "tahmid-al-mudabbir",
  "barkat-hossain",
  "zaber-ahmed",
  "abu-sayed-2024",
  "mir-mahfuzur-rahman-mugdho",
  "farhan-faiyaaz",
  "wasim-akram-2024",
  "faisal-ahmed-shanto",
  "yamin-mist",
  "riya-gope",
  "shaheed-rudro",
  "tahmid-abdullah",
  "zahid-hossain",
  "muhammad-yunus",
  "manzur-al-matin",
  "asif-nazrul",
  "pinaki-bhattacharya",
  "zafar-sobhan",
  "shahidul-alam",
  "syeda-rizwana-hasan",
  "adilur-rahman-khan",
  "farhad-mazhar",
  "anu-muhammad",
  "tasneem-khalil",
  "zulkarnain-saer",
  "fahim-ahmed",
  "saima-ahmed",
  "unknown-protester",
  "ak-fazlul-huq",
  "huseyn-shaheed-suhrawardy",
  "khwaja-nazimuddin",
  "muhammad-ali-jinnah",
  "abul-hashim",
  "sarat-chandra-bose",
  "kiran-shankar-roy",
  "satya-ranjan-bakshi",
  "jogendranath-mandal",
  "cyril-radcliffe",
  "lord-louis-mountbatten",
  "jawaharlal-nehru",
  "vallabhbhai-patel",
  "mahatma-gandhi",
  "liaquat-ali-khan",
  "syama-prasad-mukherjee",
  "bidhan-chandra-roy",
  "prafulla-chandra-ghosh",
  "nurul-amin",
  "tamizuddin-khan",
  "dhirendranath-datta",
  "abdul-hamid-khan-bhashani",
  "shamsul-huq",
  "oli-ahad",
  "abdul-matin",
  "kazi-golam-mahbub",
  "abdul-malek-ukil",
  "mohammad-toaha",
  "muhammad-shahidullah",
  "sufia-kamal",
  "gaziul-huq",
  "abul-mansur-ahmad",
  "ataur-rahman-khan",
  "abul-kasem",
  "kazi-motahar-hossain",
  "ila-mitra",
  "maulana-akram-khan",
  "manik-mia",
  "abdur-rashid-tarkabagish",
  "khwaja-shahabuddin",
  "humayun-kabir",
  "muzaffar-ahmad",
  "somnath-lahiri",
  "jasimuddin",
  "abdul-karim-sahitya-bisharad",
  "abu-saleh-mohammad-akram",
  "bijan-kumar-mukherjea",
  "sa-rahman",
  "cc-biswas",
  "abul-barkat-1952",
  "rafiq-uddin-ahmed-1952",
  "abdus-salam-1952",
  "abdul-jabbar-1952",
  "shafiur-rahman-1952",
  "ohiullah-1952",
  "mahbub-ul-alam-chowdhury",
  "abdul-gaffar-choudhury",
  "altaf-mahmud",
  "hamidur-rahman-artist",
  "novera-ahmed",
  "abul-kalam-shamsuddin",
  "ahmed-rafiq",
  "abdul-wahed-language",
  "amanul-huq",
  "alauddin-al-azad",
  "shahid-saber",
  "tamaddun-majlish",
  "all-party-state-language-action-committee",
  "dhaka-university-students",
  "dhaka-medical-college-students",
  "east-pakistan-muslim-chhatra-league",
  "chittagong-rashtrabhasha-sangram-parishad",
] as const;
export const SUPPORTED_BOOK_IDS = ["research-volume", "archive-collection"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];
export type EventSlug = (typeof SUPPORTED_EVENT_SLUGS)[number];
export type HeroId = (typeof SUPPORTED_HERO_IDS)[number];
export type BookId = (typeof SUPPORTED_BOOK_IDS)[number];
export type ResourceId = string;

export type EventMeta = {
  slug: EventSlug;
  year: string;
  title: string;
  subtitle: string;
  summary: string;
  themeColor: string;
  ctaLabel: string;
  heroTagline: string;
  whyItMatters: string;
};

export type TimelineType =
  | "judicial_event"
  | "protest_start"
  | "movement_escalation"
  | "nationwide_movement"
  | "violence"
  | "state_crackdown"
  | "peak_conflict"
  | "policy_change"
  | "policy_implementation"
  | "movement_shift"
  | "political_crisis";

export type TimelineItem = {
  year: string;
  title: string;
  detail: string;
  type?: TimelineType;
  href?: string;
  ctaLabel?: string;
  phaseLabel?: string;
  themeColor?: string;
  emphasis?: "normal" | "peak";
};

export type Hero = {
  id: HeroId;
  name: string;
  name_en?: string;
  role: string;
  group: "leader" | "coordinator" | "martyr" | "organization" | "collective";
  contribution: string;
  context: string;
  impact: string;
  highlight?: string;
  tags?: string[];
  image?: string;
};

export type Book = {
  id: BookId;
  title: string;
  author: string;
  type: "book" | "article" | "archive";
  note: string;
};

export type ResourceCategory = "read" | "watch" | "explore" | "understand";

export type EventResource = {
  id: ResourceId;
  title: string;
  author: string;
  note: string;
  category: ResourceCategory;
  subcategory:
    | "historical-literature"
    | "novel"
    | "memoir"
    | "movie"
    | "documentary"
    | "drama"
    | "archive"
    | "documents"
    | "photos"
    | "research"
    | "papers";
  href?: string;
};

export type Quote = {
  text: string;
  source: string;
};

export type EventContent = {
  meta: EventMeta;
  timeline: TimelineItem[];
  heroes: Hero[];
  resources: EventResource[];
  quotes: Quote[];
};

export type HomeContent = {
  title: string;
  tagline: string;
  intro: string;
  timelineHeading: string;
  timelineSubheading: string;
  whyJourneyMattersHeading: string;
  whyJourneyMattersBody: string;
};
