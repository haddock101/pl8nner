export type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  location: string;
  /** ISO 8601 timestamp */
  startDate: string;
  /** ISO 8601 timestamp */
  endDate: string;
  allDay: boolean;
  attendees: string[];
  flair?: string;
};
