import {
  addHours,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  endOfWeek,
  setHours,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import type { CalendarEvent } from "../types";

export const WEEK_OPTIONS = { weekStartsOn: 1 } as const;

/**
 * All days shown in the month view: from the Monday on or before the 1st
 * to the Sunday on or after the last day. Gives 4–6 full weeks.
 */
export function getMonthGrid(month: Date): Date[] {
  return eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), WEEK_OPTIONS),
    end: endOfWeek(endOfMonth(month), WEEK_OPTIONS),
  });
}

/** Splits a list of days into rows of seven. */
export function toWeeks(days: Date[]): Date[][] {
  const weeks: Date[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  return weeks;
}

/**
 * Events that overlap any part of `day`. An event ending exactly at
 * midnight does not spill into the next day.
 */
export function eventsForDay(day: Date, events: CalendarEvent[]): CalendarEvent[] {
  const dayStart = startOfDay(day).getTime();
  const dayEnd = endOfDay(day).getTime();
  return events.filter((event) => {
    const start = new Date(event.startDate).getTime();
    const end = new Date(event.endDate).getTime();
    if (Number.isNaN(start) || Number.isNaN(end) || end < start) return false;
    const isInstant = start === end;
    return start <= dayEnd && (isInstant ? start >= dayStart : end > dayStart);
  });
}

/**
 * crypto.randomUUID only exists in secure contexts (https or localhost),
 * so fall back when the dev server is opened over plain http on the LAN.
 */
function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `event-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** A blank one-hour event at 09:00 on `day`. */
export function createEvent(day: Date): CalendarEvent {
  const start = setHours(startOfDay(day), 9);
  return {
    id: newId(),
    title: "",
    description: "",
    location: "",
    startDate: start.toISOString(),
    endDate: addHours(start, 1).toISOString(),
    allDay: false,
    attendees: [],
  };
}

/** Returns `date` with its time set from an "HH:mm" string. */
export function withTime(date: Date, time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const result = new Date(date);
  result.setHours(hours || 0, minutes || 0, 0, 0);
  return result;
}
