import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import DateRangePickerWithTime from "./date-range-picker-with-time.tsx";
import type { CalendarEvent } from "../types.ts";

type EventEditorProps = {
  mode: "new" | "edit";
  event: CalendarEvent;
  onSave: (event: CalendarEvent) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
};

/**
 * Edits a copy of `event`; nothing reaches the calendar until Save.
 * Render with `key={event.id}` so the form resets when the event changes.
 */
function EventEditor({ mode, event, onSave, onDelete, onCancel }: EventEditorProps) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [location, setLocation] = useState(event.location);
  const [start, setStart] = useState(() => new Date(event.startDate));
  const [end, setEnd] = useState(() => new Date(event.endDate));
  const [attendees, setAttendees] = useState(event.attendees.join(", "));
  const [flair, setFlair] = useState(event.flair ?? "");

  const isValidRange = end.getTime() >= start.getTime();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidRange) return;
    onSave({
      ...event,
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
    });
  };

  return (
    <div id="event-editor">
      <form onSubmit={handleSubmit}>
        <Field className="gap-0">
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            type="text"
            id="title"
            className="rounded-sm bg-input"
            name="title"
            autoComplete="off"
            autoFocus={mode === "new"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
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
            value={attendees}
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
        <div className="flex-row">
          <Button
            size="lg"
            className="hover:cursor-pointer hover:bg-pink-500 w-full mt-4 text-fuchsia-50 font-extrabold rounded-sm bg-pink-300"
            type="submit"
            disabled={!isValidRange}
          >
            Save
          </Button>
          {mode === "edit" ? (
            <Button
              variant="destructive"
              size="lg"
              className="hover:cursor-pointer w-20 mt-4 font-extrabold rounded-sm"
              type="button"
              onClick={() => onDelete(event.id)}
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
