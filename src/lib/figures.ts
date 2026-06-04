import type { Figure } from "@/types/content";

export type FigureEntityType = "person" | "party" | "alliance" | "organization";

const PARTY_FIGURE_IDS = new Set<Figure["id"]>([
  "awami-league",
  "bangladesh-nationalist-party",
  "communist-party-of-bangladesh",
  "jamaat-e-islami-bangladesh",
  "all-india-muslim-league",
  "indian-national-congress",
  "krishak-praja-party",
  "nizam-e-islam-party",
  "ganatantri-dal",
  "krishak-sramik-party",
  "national-awami-party",
  "baksal",
  "communist-party-of-india",
  "hindu-mahasabha",
  "forward-bloc",
  "jatiya-party",
  "ab-party",
  "national-citizen-party",
  "bangladesh-jatiya-party",
  "islami-andolan-bangladesh",
  "gono-forum",
  "jamiat-e-ulema-e-islam-bangladesh",
  "pakistan-peoples-party",
  "jatiya-samajtantrik-dal",
  "workers-party-of-bangladesh",
]);

const ALLIANCE_FIGURE_IDS = new Set<Figure["id"]>([
  "all-party-state-language-action-committee",
  "united-front-1954",
  "eight-party-alliance",
  "five-party-alliance",
  "seven-party-alliance",
  "sarbadaliya-chhatra-oikya-parishad",
  "student-unity-twenty-two-organisations",
]);

export function inferFigureEntityType(figure: Figure): FigureEntityType {
  if (PARTY_FIGURE_IDS.has(figure.id)) {
    return "party";
  }

  if (ALLIANCE_FIGURE_IDS.has(figure.id)) {
    return "alliance";
  }

  if (figure.group === "organization" || figure.group === "collective") {
    return "organization";
  }

  return "person";
}
