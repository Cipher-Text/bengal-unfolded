import type { PlaceType } from "@/types/content";

/** Most place records still carry a template description; callers should not present it as content. */
export function isTemplatePlaceDescription(text: string): boolean {
  return /place (timeline )?node/i.test(text);
}

export type PlaceGroupId = "cities" | "battlefields" | "heritage" | "regions" | "other";

const GROUP_BY_TYPE: Partial<Record<PlaceType, PlaceGroupId>> = {
  capital: "cities",
  city: "cities",
  port: "cities",
  battlefield: "battlefields",
  frontier: "battlefields",
  route: "battlefields",
  "archaeological-site": "heritage",
  "educational-site": "heritage",
  "religious-site": "heritage",
  region: "regions",
  district: "regions",
  river: "regions",
};

export function placeGroup(type: PlaceType | undefined): PlaceGroupId {
  return (type && GROUP_BY_TYPE[type]) || "other";
}

export const PLACE_GROUPS: Array<{ id: PlaceGroupId; en: string; bn: string; enNote: string; bnNote: string }> = [
  { id: "cities", en: "Cities, capitals and ports", bn: "নগর, রাজধানী ও বন্দর", enNote: "Seats of power and centres of trade.", bnNote: "ক্ষমতা ও বাণিজ্যের কেন্দ্র।" },
  { id: "battlefields", en: "Battlefields, frontiers and routes", bn: "রণক্ষেত্র, সীমান্ত ও পথ", enNote: "Where armies met and borders were drawn.", bnNote: "যেখানে সেনারা মুখোমুখি হয়েছে, সীমানা এঁকেছে।" },
  { id: "heritage", en: "Sites of learning, faith and heritage", bn: "শিক্ষা, বিশ্বাস ও ঐতিহ্যের স্থান", enNote: "Monasteries, universities and archaeological sites.", bnNote: "বিহার, বিশ্ববিদ্যালয় ও প্রত্নস্থান।" },
  { id: "regions", en: "Regions, districts and rivers", bn: "অঞ্চল, জেলা ও নদী", enNote: "Wider areas that many chapters share.", bnNote: "যে বৃহত্তর অঞ্চলে বহু অধ্যায় ঘটেছে।" },
  { id: "other", en: "Other sites", bn: "অন্যান্য স্থান", enNote: "Individual locations tied to a single event.", bnNote: "একটি ঘটনার সঙ্গে যুক্ত নির্দিষ্ট স্থান।" },
];

export const PLACE_TYPE_LABELS: Record<"en" | "bn", Record<string, string>> = {
  en: { capital: "Capital", city: "City", port: "Port", battlefield: "Battlefield", frontier: "Frontier", route: "Route", "archaeological-site": "Archaeological site", "educational-site": "Educational site", "religious-site": "Religious site", region: "Region", district: "District", river: "River", other: "Site" },
  bn: { capital: "রাজধানী", city: "নগর", port: "বন্দর", battlefield: "রণক্ষেত্র", frontier: "সীমান্ত", route: "পথ", "archaeological-site": "প্রত্নস্থান", "educational-site": "শিক্ষাপ্রতিষ্ঠান", "religious-site": "ধর্মীয় স্থান", region: "অঞ্চল", district: "জেলা", river: "নদী", other: "স্থান" },
};
