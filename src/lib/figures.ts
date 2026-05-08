import type { Figure } from "@/types/content";

export type FigureEntityType = "person" | "party" | "organization";

export function inferFigureEntityType(figure: Figure): FigureEntityType {
  const name = figure.name.toLowerCase();
  const role = figure.role.toLowerCase();
  const tags = (figure.tags ?? []).join(" ").toLowerCase();
  const text = `${name} ${role} ${tags}`;

  if (
    text.includes("party") ||
    text.includes("alliance") ||
    text.includes("league") ||
    text.includes("দল") ||
    text.includes("জোট")
  ) {
    return "party";
  }

  if (figure.group === "organization" || figure.group === "collective") {
    return "organization";
  }

  return "person";
}
