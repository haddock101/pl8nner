import type { CalendarEvent } from "../types";

// Sample data until the json-server backend is wired up.
export default function getEvents(): CalendarEvent[] {
  return [
    {
      id: "event-2",
      title: "Bandy",
      description: "Weekly progress update and planning.",
      location: "Konsum",
      startDate: "2026-09-04T00:00:00+02:00",
      endDate: "2026-09-16T09:00:00+02:00",
      allDay: false,
      attendees: ["alice@example.com", "bob@example.com"],
    },
    {
      id: "event-3",
      title: "Piingis",
      flair: "maybe",
      description: "Weekly progress update and planning.",
      location: "Konsum",
      startDate: "2026-09-04T00:00:00+02:00",
      endDate: "2026-09-16T09:00:00+02:00",
      allDay: false,
      attendees: ["alice@example.com", "bob@example.com"],
    },
    {
      id: "event-4",
      title: "Stryk",
      flair: "important",
      description: "Weekly progress update and planning.",
      location: "Konsum",
      startDate: "2026-09-04T00:00:00+02:00",
      endDate: "2026-09-05T10:00:00+02:00",
      allDay: false,
      attendees: ["alice@example.com", "bob@example.com"],
    },
    {
      id: "event-6",
      title: "❤️ Stryk",
      flair: "today",
      description: "Weekly progress update and planning.",
      location: "Konsum",
      startDate: "2026-10-03T09:00:00Z",
      endDate: "2026-10-04T10:00:00Z",
      allDay: false,
      attendees: ["alice@example.com", "bob@example.com"],
    },
  ];
}
