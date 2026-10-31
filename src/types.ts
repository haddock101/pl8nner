export type CalendarEvent = {
  /** Unique key in the UI (occurrences of a repeating event share an API id) */
  id: string;
  /** API id; undefined until the event is saved */
  apiId?: number;
  calendarId?: number;
  /** Set on occurrences of a repeating event: the series id and the occurrence's original start */
  seriesId?: number;
  originalStart?: string;
  title: string;
  description: string;
  location: string;
  /** ISO 8601 timestamp */
  startDate: string;
  /** ISO 8601 timestamp */
  endDate: string;
  allDay: boolean;
  /** Attendee emails */
  attendees: string[];
  flair?: string;
};

export type ApiUser = { id: number; email: string; timezone: string };

export type ApiCalendar = {
  id: number;
  owner_id: number;
  name: string;
  color: string;
  is_default: boolean;
};
