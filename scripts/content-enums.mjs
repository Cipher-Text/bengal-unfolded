/**
 * Plain-JS mirror of src/constants/enums.ts for use by validate-content.mjs.
 * The validator cannot import TypeScript directly, so this file maintains
 * equivalent Sets. When adding or removing enum values, update both files.
 *
 * Also contains SUPPORTED_PERIOD_IDS_SET, SUPPORTED_MOVEMENT_IDS_SET, and
 * SUPPORTED_PLACE_IDS_SET — mirrors of the SUPPORTED_* constants in
 * src/types/content.ts. Keep these in sync when entity IDs change.
 */

// --- Enum Sets (mirrors of src/constants/enums.ts) ---

export const FIGURE_GROUPS_SET = new Set([
  "leader", "coordinator", "martyr", "organization",
  "collective", "intellectual", "revolutionary",
]);

export const SOURCE_QUALITIES_SET = new Set([
  "primary", "secondary", "archive", "editorial",
]);

export const RESOURCE_SOURCE_QUALITIES_SET = new Set([
  "primary", "secondary", "archive", "academic", "editorial", "reference", "unknown",
]);

export const EVIDENCE_LEVELS_SET = new Set(["high", "medium", "low"]);

export const TIMELINE_THEMES_SET = new Set([
  "language", "democracy", "war", "culture", "economy",
]);

export const EVENT_IMPORTANCE_VALUES_SET = new Set([
  "landmark", "major", "high", "medium", "reference",
]);

export const EVENT_RELATION_TYPES_SET = new Set([
  "cause", "effect", "background", "parallel", "legacy", "contrast",
]);

export const EVENT_CLAIM_SECTIONS_SET = new Set([
  "summary", "whyItMatters", "longTermLegacy", "culturalImpact", "identityMemoryNotes",
]);

export const EVENT_MAP_POINT_ROLES_SET = new Set([
  "battlefield", "capital", "route", "birthplace", "deathplace",
  "treaty-place", "movement-center", "administrative-center", "other",
]);

export const RESOURCE_CATEGORIES_SET = new Set([
  "primary-sources", "academic-books", "reference-sources",
  "research-articles-and-papers", "memoirs-and-eyewitness-accounts",
  "maps-and-visual-sources", "documentary-and-video",
  "cultural-and-literary-resources", "news-and-contemporary-reports",
  "further-reading",
]);

export const PLACE_TYPES_SET = new Set([
  "region", "city", "capital", "district", "division", "river", "port",
  "battlefield", "religious-site", "educational-site", "archaeological-site",
  "frontier", "route", "other",
]);

export const COORDINATE_CONFIDENCES_SET = new Set([
  "exact", "approximate", "representative", "unknown",
]);

export const LEARNING_PATH_ITEM_TYPES_SET = new Set([
  "event", "figure", "resource", "place", "period", "topic",
]);

export const NAME_HISTORY_LANGUAGES_SET = new Set([
  "bn", "en", "fa", "ar", "sa", "pt", "other",
]);

// --- Entity ID Sets (mirrors of SUPPORTED_* in src/types/content.ts) ---

export const SUPPORTED_PERIOD_IDS_SET = new Set([
  "ancient-and-pre-sultanate-bengal",
  "transition-to-sultanate-formation",
  "independent-bengal-sultanate-era",
  "mughal-incorporation-and-consolidation",
  "colonial-rule-and-resistance",
  "partition-and-late-colonial-politics",
  "pakistan-period-and-national-awakening",
  "post-liberation-state-and-democracy",
  "contemporary-memory-and-civic-protest",
]);

export const SUPPORTED_MOVEMENT_IDS_SET = new Set([
  "colonial-capture-and-resistance",
  "partition-and-political-representation",
  "language-autonomy-and-liberation",
  "state-power-and-democratic-transition",
  "memory-justice-and-civic-dissent",
]);

export const SUPPORTED_PLACE_IDS_SET = new Set([
  "bengal-region", "bangladesh", "east-bengal", "east-pakistan", "west-bengal",
  "mahasthangarh", "somapura-mahavihara", "gaur-lakhnauti", "nadia-nabadwip",
  "sonargaon", "sylhet", "dhaka-jahangirnagar", "murshidabad",
  "chittagong-chattogram", "rajmahal", "hooghly", "calcutta-kolkata",
  "palashi-plassey", "buxar", "faridpur", "barasat-narkelberia", "noakhali",
  "dhaka-university", "dhaka-medical-college", "central-shaheed-minar",
  "racecourse-suhrawardy-udyan", "old-dhaka", "jinjira-keraniganj",
  "dhanmondi-32", "dhaka-central-jail", "gulshan-holey-artisan", "mujibnagar",
  "farakka", "shahbag-dhaka", "pilkhana-dhaka", "chittagong-hill-tracts",
  "satgaon", "gauda-rajmahal-corridor", "bhati-region", "paharpur",
  "rangpur", "savar-rana-plaza", "bhola", "ramu", "naxalbari", "agartala",
  "padua-pyrdiwah-boraibari", "hazratbal-srinagar", "lahore", "delhi",
  "krishnanagar", "barisal-bakerganj", "comilla-tripura-frontier",
  "jessore-khulna-corridor", "hilli", "garibpur", "kamalpur", "kushtia",
  "chuknagar", "bihar-borderland",
]);
