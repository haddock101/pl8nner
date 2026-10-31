import type { ApiCalendar, ApiUser, CalendarEvent } from "../types";

// Client for the calipa calendar API. All times go over the wire as UTC ISO 8601.
const API_URL = (import.meta.env.VITE_API_URL ?? "https://api.shse.se").replace(/\/$/, "");

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// --- Auth token ---
// Kept in localStorage so the session survives reloads. Listeners hear about
// sign-in and sign-out, including when the API rejects an expired token.

const TOKEN_KEY = "plann8r.token";
const tokenListeners = new Set<() => void>();

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function setToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Storage unavailable: the session lasts until the page reloads
  }
  memoryToken = token;
  tokenListeners.forEach((listener) => listener());
}

let memoryToken = getToken();

export function subscribeToken(listener: () => void) {
  tokenListeners.add(listener);
  return () => tokenListeners.delete(listener);
}

/** Current token, for useSyncExternalStore. */
export function tokenSnapshot() {
  return memoryToken;
}

async function request<T>(method: string, path: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (memoryToken) headers.Authorization = `Bearer ${memoryToken}`;
  const response = await fetch(`${API_URL}${path}`, {
    method,
    signal,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    // Token missing, expired or revoked: drop it so the login form shows
    if (response.status === 401 && !path.startsWith("/auth/login")) setToken(null);
    throw new ApiError(response.status, data?.error ?? `Request failed (${response.status})`);
  }
  return data as T;
}

type Session = { token: string; expires_at: string; user: ApiUser };

export async function login(email: string, password: string): Promise<ApiUser> {
  const session = await request<Session>("POST", "/auth/login", { email, password });
  setToken(session.token);
  return session.user;
}

/** Creates an account (the API gives it a default calendar) and signs in. */
export async function register(email: string, password: string): Promise<ApiUser> {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const session = await request<Session>("POST", "/auth/register", { email, password, timezone });
  setToken(session.token);
  return session.user;
}

export async function logout(): Promise<void> {
  try {
    await request("POST", "/auth/logout");
  } finally {
    setToken(null);
  }
}

export function getMe(signal?: AbortSignal) {
  return request<ApiUser>("GET", "/auth/me", undefined, signal);
}

// --- Wire formats ---

type ApiEvent = {
  id: number;
  calendar_id: number;
  creator_id: number;
  title: string;
  description: string | null;
  location: string | null;
  start_at: string;
  end_at: string;
  all_day: boolean;
  /** Set on occurrences of a repeating event */
  recurring_event_id: number | null;
  original_start: string | null;
};

type ApiAttendee = { user_id: number; email: string; rsvp: string };

// Flair has no column in the API, so it is kept per browser.
const FLAIR_KEY = "plann8r.flair";

function readFlairs(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(FLAIR_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function writeFlair(key: string, flair: string | undefined) {
  try {
    const flairs = readFlairs();
    if (flair) flairs[key] = flair;
    else delete flairs[key];
    localStorage.setItem(FLAIR_KEY, JSON.stringify(flairs));
  } catch {
    // Storage unavailable: flair just isn't remembered
  }
}

/** Occurrences of a repeating event share the series id, so key them by series + original start. */
function eventKey(event: ApiEvent): string {
  return event.recurring_event_id !== null
    ? `${event.recurring_event_id}@${event.original_start}`
    : String(event.id);
}

function fromApi(event: ApiEvent, flairs: Record<string, string>): CalendarEvent {
  const id = eventKey(event);
  return {
    id,
    apiId: event.id,
    calendarId: event.calendar_id,
    seriesId: event.recurring_event_id ?? undefined,
    originalStart: event.original_start ?? undefined,
    title: event.title,
    description: event.description ?? "",
    location: event.location ?? "",
    startDate: event.start_at,
    endDate: event.end_at,
    allDay: event.all_day,
    attendees: [],
    flair: flairs[id],
  };
}

// --- Reads ---

export function listCalendars(signal?: AbortSignal) {
  return request<ApiCalendar[]>("GET", "/calendars", undefined, signal);
}

/** Events overlapping [from, to), with repeating events expanded. */
export async function listEvents(from: Date, to: Date, signal?: AbortSignal): Promise<CalendarEvent[]> {
  const query = new URLSearchParams({ from: from.toISOString(), to: to.toISOString() });
  const events = await request<ApiEvent[]>("GET", `/events?${query}`, undefined, signal);
  const flairs = readFlairs();
  return events.map((event) => fromApi(event, flairs));
}

/** Attendee emails. Attendees belong to the series for repeating events. */
export async function getAttendees(event: CalendarEvent): Promise<string[]> {
  const id = event.seriesId ?? event.apiId;
  if (id === undefined) return [];
  const attendees = await request<ApiAttendee[]>("GET", `/events/${id}/attendees`);
  return attendees.map((a) => a.email);
}

// --- Writes ---

/** The user with this email. Only people with an account can be invited. */
async function findUser(email: string): Promise<ApiUser> {
  const [user] = await request<ApiUser[]>("GET", `/users?${new URLSearchParams({ email: email.trim() })}`);
  if (!user) throw new ApiError(404, `${email.trim()} has no account, so they can't be invited`);
  return user;
}

function occurrencePath(event: CalendarEvent) {
  return `/events/${event.seriesId}/occurrences/${encodeURIComponent(event.originalStart ?? "")}`;
}

/**
 * Creates or updates the event, then syncs its attendees.
 * Editing an occurrence of a repeating event only changes that occurrence.
 */
export async function saveEvent(event: CalendarEvent, calendar: ApiCalendar): Promise<void> {
  // The API sets the creator from the signed-in user
  const fields = {
    title: event.title,
    description: event.description,
    location: event.location,
    start_at: event.startDate,
    end_at: event.endDate,
    all_day: event.allDay,
  };

  let saved: ApiEvent;
  if (event.seriesId !== undefined) {
    // The API refuses calendar_id on a single occurrence
    saved = await request<ApiEvent>("PATCH", occurrencePath(event), fields);
  } else if (event.apiId !== undefined) {
    saved = await request<ApiEvent>("PATCH", `/events/${event.apiId}`, { ...fields, calendar_id: calendar.id });
  } else {
    saved = await request<ApiEvent>("POST", "/events", { ...fields, calendar_id: calendar.id });
  }

  writeFlair(eventKey(saved), event.flair);
  await syncAttendees(saved.recurring_event_id ?? saved.id, event.attendees);
}

async function syncAttendees(eventId: number, emails: string[]) {
  const current = await request<ApiAttendee[]>("GET", `/events/${eventId}/attendees`);
  const known = new Map(current.map((a) => [a.email.toLowerCase(), a.user_id]));
  const wanted = await Promise.all(
    emails.map((email) => {
      const id = known.get(email.trim().toLowerCase());
      return id !== undefined ? { id } : findUser(email);
    }),
  );
  const wantedIds = new Set(wanted.map((u) => u.id));
  const currentIds = new Set(current.map((a) => a.user_id));

  await Promise.all([
    ...wanted
      .filter((u) => !currentIds.has(u.id))
      .map((u) => request("POST", `/events/${eventId}/attendees`, { user_id: u.id })),
    ...current
      .filter((a) => !wantedIds.has(a.user_id))
      .map((a) => request("DELETE", `/events/${eventId}/attendees/${a.user_id}`)),
  ]);
}

/** Deletes the event, or just this occurrence of a repeating event. */
export async function deleteEvent(event: CalendarEvent): Promise<void> {
  if (event.seriesId !== undefined) {
    await request("DELETE", occurrencePath(event));
  } else if (event.apiId !== undefined) {
    await request("DELETE", `/events/${event.apiId}`);
  }
  writeFlair(event.id, undefined);
}
