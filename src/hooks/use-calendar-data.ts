import { useCallback, useEffect, useState } from "react";
import { addDays } from "date-fns";
import * as api from "../lib/shse-api";
import { getMonthGrid } from "../lib/calendar";
import type { ApiCalendar, CalendarEvent } from "../types";

/**
 * Loads the signed-in user's calendars once, and the events shown in the month grid
 * whenever `viewMonth` changes. Saves and deletes reload the grid so
 * repeating events stay correct.
 */
export function useCalendarData(viewMonth: Date) {
  const [calendars, setCalendars] = useState<ApiCalendar[] | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  // Which request the current events came from; loading until it matches
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  // Bumped to refetch after a write
  const [version, setVersion] = useState(0);

  const grid = getMonthGrid(viewMonth);
  const from = grid[0];
  const to = addDays(grid[grid.length - 1], 1);
  const fromTime = from.getTime();
  const toTime = to.getTime();
  const requestKey = `${fromTime}-${toTime}-${version}`;
  const loading = loadedKey !== requestKey;

  useEffect(() => {
    const controller = new AbortController();
    api
      .listCalendars(controller.signal)
      .then(setCalendars)
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      });
    return () => controller.abort();
  }, [version]);

  useEffect(() => {
    const controller = new AbortController();
    const key = `${fromTime}-${toTime}-${version}`;
    api
      .listEvents(new Date(fromTime), new Date(toTime), controller.signal)
      .then((events) => {
        setEvents(events);
        setError(null);
      })
      .catch((e) => {
        if (!controller.signal.aborted) setError(e.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoadedKey(key);
      });
    return () => controller.abort();
  }, [fromTime, toTime, version]);

  const reload = useCallback(() => setVersion((v) => v + 1), []);

  const saveEvent = useCallback(
    async (event: CalendarEvent) => {
      const calendar = calendars?.find((c) => c.id === event.calendarId);
      if (!calendar) throw new Error("Pick a calendar for the event");
      await api.saveEvent(event, calendar);
      reload();
    },
    [calendars, reload],
  );

  const deleteEvent = useCallback(
    async (event: CalendarEvent) => {
      await api.deleteEvent(event);
      reload();
    },
    [reload],
  );

  return { calendars, events, loading, error, reload, saveEvent, deleteEvent };
}
