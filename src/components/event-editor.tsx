import { useEffect, useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import DateRangePickerWithTime from "./date-range-picker-with-time.tsx";
import { getAttendees } from "../lib/shse-api.ts";
import type { ApiCalendar, CalendarEvent } from "../types.ts";
import EmojiPicker from "emoji-picker-react";

import { FaceSlightlySmilingPlusIcon } from "lucide-react";
import {
  Map,
  type MapViewport,
  /* @ts-expect-error: Fix later */
} from "@/components/ui/map";
import { InputGroup } from "./ui/input-group.tsx";

type EventEditorProps = {
  mode: "new" | "edit";
  event: CalendarEvent;
  calendars: ApiCalendar[];
  onSave: (event: CalendarEvent) => Promise<void>;
  onDelete: (event: CalendarEvent) => Promise<void>;
  onCancel: () => void;
};

/**
 * Edits a copy of `event`; nothing reaches the calendar until Save.
 * Render with `key={event.id}` so the form resets when the event changes.
 */
function EventEditor({ mode, event, calendars, onSave, onDelete, onCancel }: EventEditorProps) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [calendarId, setCalendarId] = useState(event.calendarId);
  const [start, setStart] = useState(() => new Date(event.startDate));
  const [end, setEnd] = useState(() => new Date(event.endDate));
  // null while attendees load from the API
  const [attendees, setAttendees] = useState<string | null>(
    event.apiId === undefined ? event.attendees.join(", ") : null,
  );
  const [flair, setFlair] = useState(event.flair ?? "");
  const [showPicker, setShowPicker] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isValidRange = end.getTime() >= start.getTime();
  // An occurrence of a repeating event stays in its series' calendar
  const isOccurrence = event.seriesId !== undefined;

  useEffect(() => {
    if (event.apiId === undefined) return;
    let ignore = false;
    getAttendees(event)
      .then((emails) => !ignore && setAttendees(emails.join(", ")))
      .catch((err) => {
        if (ignore) return;
        setAttendees("");
        setError(`Could not load attendees: ${err.message}`);
      });
    return () => {
      ignore = true;
    };
  }, [event]);

  const run = async (action: () => Promise<void>) => {
    setBusy(true);
    setError(null);
    try {
      await action();
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidRange || attendees === null) return;
    void run(() =>
      onSave({
        ...event,
        calendarId,
        title: title.trim() || "New Event",
        description,
        location,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        attendees: attendees
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        flair: flair.trim() || undefined,
      }),
    );
  };

  const [viewport, setViewport] = useState<MapViewport>({
    center: [18.052318, 59.301757],
    zoom: 15,
    bearing: 0,
    pitch: 0,
  });

  return (
    <div id="event-editor">
      <form onSubmit={handleSubmit}>
        <Field className="gap-0">
          <InputGroup className="rounded-sm bg-input">
            <Input
              type="text"
              id="title"
              className="bg-input focus-visible:ring-0 focus-visible:border-ring-none rounded-l-sm rounded-r-none border-l-0 ring-0"
              name="title"
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Button
              className="w-10 rounded-r-sm rounded-l-none border-l-0 border-r-0 ring-0 hover:bg-sidebar-accent-foreground bg-accent text-input"
              onClick={(e) => {
                console.log(e);
                setShowPicker(!showPicker);
              }}
            >
              <FaceSlightlySmilingPlusIcon />
            </Button>
          </InputGroup>
          <EmojiPicker
            lazyLoadEmojis
            open={showPicker}
            autoFocusSearch={false}
            skinTonesDisabled
            searchDisabled
            /* @ts-expect-error: Fix later */
            suggestedEmojisMode={"recent"}
            /* @ts-expect-error: Fix later */
            emojiStyle={"native"}
            width="100%"
            previewConfig={{ showPreview: false }}
            className="max-w-full rounded-sm m-t-2 top-2 text-xs"
            onEmojiClick={(emojiData) => setTitle(title + emojiData.emoji)}
          />
        </Field>
        <Field className="gap-0 mt-2">
          <FieldLabel htmlFor="calendar">Calendar</FieldLabel>
          <select
            id="calendar"
            name="calendar"
            required
            disabled={isOccurrence}
            className="h-8 rounded-sm border border-input bg-input px-2 text-sm disabled:opacity-60"
            value={calendarId ?? ""}
            onChange={(e) => setCalendarId(Number(e.target.value))}
          >
            <option value="" disabled>
              Pick a calendar
            </option>
            {calendars.map((calendar) => (
              <option key={calendar.id} value={calendar.id}>
                {calendar.name}
              </option>
            ))}
          </select>
        </Field>
        <Field className="gap-0 mt-2">
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Input
            type="text"
            id="description"
            className="rounded-sm bg-input dark:bg-input"
            name="description"
            autoComplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Field>
        <div className="relative h-42 mt-2 rounded border w-full">
          <Map viewport={viewport} onViewportChange={setViewport} />
          <div className="debug bg-background/80 absolute top-2 left-2 z-10 flex flex-wrap gap-x-3 gap-y-1 rounded border px-2 mr-2 py-1.5 font-mono text-xs">
            <span>
              <span className="text-muted-foreground text-xs">lng:</span>{" "}
              {viewport.center[0].toFixed(3)}
            </span>
            <span>
              <span className="text-muted-foreground">lat:</span>{" "}
              {viewport.center[1].toFixed(3)}
            </span>
            <span>
              <span className="text-muted-foreground">zoom:</span>{" "}
              {viewport.zoom.toFixed(1)}
            </span>
            <span>
              <span className="text-muted-foreground">bearing:</span>{" "}
              {viewport.bearing.toFixed(1)}°
            </span>
            <span>
              <span className="text-muted-foreground">pitch:</span>{" "}
              {viewport.pitch.toFixed(1)}°
            </span>
          </div>
        </div>
        <Field className="gap-0 mt-2">
          <FieldLabel htmlFor="location">Location</FieldLabel>
          <Input
            type="text"
            id="location"
            className="rounded-sm bg-input"
            name="location"
            autoComplete="off"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Field>
        <Field className="gap-0 mt-2">
          <FieldLabel htmlFor="date-range">Select duration</FieldLabel>
          <DateRangePickerWithTime
            start={start}
            end={end}
            onChange={(nextStart, nextEnd) => {
              setStart(nextStart);
              setEnd(nextEnd);
            }}
          />
          {!isValidRange && (
            <p className="text-destructive text-xs mt-1">The end must be after the start.</p>
          )}
        </Field>
        <Field className="gap-0 mt-2">
          <FieldLabel htmlFor="attendees">Attendees (comma-separated)</FieldLabel>
          <Input
            type="text"
            id="attendees"
            className="rounded-sm bg-input"
            name="attendees"
            autoCapitalize="off"
            autoComplete="off"
            placeholder={attendees === null ? "Loading…" : "name@example.com"}
            disabled={attendees === null}
            value={attendees ?? ""}
            onChange={(e) => setAttendees(e.target.value)}
          />
        </Field>
        <Field className="gap-0 mt-2">
          <FieldLabel htmlFor="flair">Flair</FieldLabel>
          <Input
            type="text"
            id="flair"
            className="rounded-sm bg-input"
            name="flair"
            autoCapitalize="off"
            autoComplete="off"
            value={flair}
            onChange={(e) => setFlair(e.target.value)}
          />
        </Field>
        {error && <p className="text-destructive text-xs mt-2">{error}</p>}
        <div className="flex-row">
          <Button
            size="lg"
            className="hover:cursor-pointer hover:bg-pink-500 w-full mt-4 text-fuchsia-50 font-extrabold rounded-sm bg-pink-300"
            type="submit"
            disabled={!isValidRange || busy || attendees === null || calendarId === undefined}
          >
            {busy ? "Saving…" : "Save"}
          </Button>
          {mode === "edit" ? (
            <Button
              variant="destructive"
              size="lg"
              className="hover:cursor-pointer w-20 mt-4 font-extrabold rounded-sm"
              type="button"
              disabled={busy}
              onClick={() => void run(() => onDelete(event))}
            >
              Delete
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="lg"
              className="hover:cursor-pointer w-20 mt-4 font-extrabold rounded-sm"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EventEditor;
