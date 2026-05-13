import type { EventMeta, Locale } from "@/types/content";
import { EventCard } from "@/components/EventCard";

export function EventGrid({ events, locale }: { events: EventMeta[]; locale: Locale }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event, index) => (
        <EventCard key={event.slug} event={event} locale={locale} index={index} />
      ))}
    </div>
  );
}
