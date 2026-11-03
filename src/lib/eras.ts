import type { EventMeta, Period } from "@/types/content";

// Period ids stored on events are not always consistent with their dates (e.g. some medieval chapters carry a
// modern period id). Group by date for display and keep the stored id only when it agrees with the event's date.

/** Start year from the leading digits of an event slug ("0400bce-…" -> -400, "1757-…" -> 1757). */
export function eventStartYear(slug: string): number | null {
  const match = /^(\d+)(bce)?/.exec(slug);
  if (!match) return null;
  const year = Number(match[1]);
  return match[2] ? -year : year;
}

/** Year bounds for a period from its startYear/endYear strings ("c. 4th century BCE", "1757"). */
function periodBound(text: string, fallback: number): number {
  if (/bce/i.test(text)) {
    const century = /(\d+)(?:st|nd|rd|th)\s+century/i.exec(text);
    return century ? -Number(century[1]) * 100 : fallback;
  }
  const year = /\d{3,4}/.exec(text);
  return year ? Number(year[0]) : fallback;
}

export function resolveEraId(event: Pick<EventMeta, "slug" | "periodId">, periods: Period[]): string | undefined {
  const year = eventStartYear(event.slug);
  if (year === null) return event.periodId;
  const ranged = periods
    .map((period) => ({ id: period.id as string, start: periodBound(period.startYear, -Infinity), end: periodBound(period.endYear, Infinity) }))
    .sort((a, b) => a.start - b.start);
  const stored = ranged.find((period) => period.id === event.periodId);
  if (stored && year >= stored.start && year <= stored.end) return stored.id;
  // Earlier than the first era (e.g. 600 BCE) belongs to the first; later than the last belongs to the last.
  const derived = year < (ranged[0]?.start ?? -Infinity) ? ranged[0] : (ranged.find((period) => year >= period.start && year < period.end) ?? ranged[ranged.length - 1]);
  return derived?.id ?? event.periodId;
}

export function sortPeriodsChronologically<T extends Pick<Period, "startYear">>(periods: T[]): T[] {
  return [...periods].sort((a, b) => periodBound(a.startYear, -Infinity) - periodBound(b.startYear, -Infinity));
}
