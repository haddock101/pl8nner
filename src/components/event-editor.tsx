"use client";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { FaceSlightlySmilingPlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import DateRangePickerWithTime from "./date-range-picker-with-time.tsx";
import { type CalendarEvents, type CalendarEvent } from "../lib/my-utils.ts";
import {
  Map,
  type MapViewport,
  // @ts-ignore
} from "@/components/ui/map";
import { InputGroup } from "./ui/input-group.tsx";
// import { eventsForDay } from "./events-for-day.tsx";

function EventEditor({
  // editorMode,
  // gridViewIndex,
  // daysArray,
  calendarEvents,
  setCalendarEvents,
  setDialogOpen,
  activeEventId,
  setActiveEventId,
}: {
  editorMode: string;
  gridViewIndex: number;
  daysArray: object;
  calendarEvents: CalendarEvents;
  /* @ts-ignore */
  setCalendarEvents: Function;
  setDialogOpen: Function;
  activeEventId: string;
  // @ts-ignore
  setActiveEventId: ActiveEventId;
}) {
  const [viewport, setViewport] = useState<MapViewport>({
    center: [18.052318, 59.301757],
    zoom: 15,
    bearing: 0,
    pitch: 0,
  });

  const currentEvent: CalendarEvent =
    calendarEvents[
      calendarEvents.findIndex((event) => event.id === activeEventId)
    ];

  console.log(currentEvent);
  // if (activeEventId === "") activeEventId = dayEvents[0].id;

  const [title, setTitle] = useState(currentEvent.title);
  const [description, setDescription] = useState(currentEvent.description);
  const [location, setLocation] = useState(currentEvent.location);

  const [startDate, setStartDate] = useState(currentEvent.startDate);
  const [endDate, setEndDate] = useState(currentEvent.endDate);
  const [showPicker, setShowPicker] = useState(false);
  // const [startTime, setStartTime] = useState("06:00");
  // const [endTime, setEndTime] = useState("22:00");
  const [attendees, setAttendees] = useState(currentEvent.attendees);
  const [flair, setFlair] = useState(currentEvent.flair);
  // const [allDay, setAllDay] = useState(currentEvent.all_day);

  const handleSaveEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //    const targetIndex = calendarEvents.findIndex((e) => e.id === activeEventId);
    //    const nextEvent = calendarEvents[targetIndex];
    // @ts-ignore
    setCalendarEvents<CalendarEvents>(
      calendarEvents.map((event: CalendarEvent) => {
        if (event.id === activeEventId) {
          // Create a *new* object with changes
          return {
            ...event,
            id: activeEventId,
            title: title,
            description: description,
            location: location,
            flair: flair,
            status: "active",
            all_day: false,
            transparency: "opaque",
            timezone: "Europe/Stockholm",
            organizer: "",
            recurrence: "",
            created_at: "",
            updated_at: "",
            startDate: startDate,
            endDate: endDate,
            allDay: false,
            attendees: attendees,
          };
        } else {
          // No changes
          return event;
        }
      }),
    );

    setDialogOpen(false);
    return false;
  };

  return (
    <div id="event-editor">
      { /* @ts-ignore */
      } <form onSubmit={(e: SubmitEvent) => handleSaveEvent(e)}>
        <div className="debug">id:{activeEventId}</div>
        <Field className="gap-0">
          <FieldLabel htmlFor="title">Title</FieldLabel>
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
            // @ts-ignore
            suggestedEmojisMode={"recent"}
            // @ts-ignore
            emojiStyle={"native"}
            width="100%"
            previewConfig={{ showPreview: false }}
            className="max-w-full rounded-sm m-t-2 top-2 text-xs"
            onEmojiClick={(emojiData) => setTitle(title + emojiData.emoji)}
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
          <Field className="gap-0 mt-2">
            <FieldLabel htmlFor="location">Select duration</FieldLabel>
            <DateRangePickerWithTime
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}

              setEndDate={setEndDate}
            />
          </Field>

          <Field className="gap-0 mt-2">
            <FieldLabel htmlFor="attendees">Attendees</FieldLabel>
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
              variant="default"
              size="lg"
              className="hover:cursor-pointer hover:bg-pink-500 w-full mt-4 text-fuchsia-50 font-extrabold rounded-sm bg-pink-300"
              type="submit"
            >
              Save
            </Button>
            <Button
              variant="destructive"
              size="lg"
              className="hover:cursor-pointer w-20 mt-4 font-extrabold rounded-sm"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                console.log("DELETE" + activeEventId);
                const nextCalendarEvents = calendarEvents.filter(
                  (e) => e.id !== activeEventId,
                );
                setActiveEventId(calendarEvents[0].id);
                // @ts-ignore
                setCalendarEvents(nextCalendarEvents);

                setDialogOpen(false);
              }}
            >
              Delete
            </Button>
          </div>
        </Field>
      </form>
    </div>
  );
}

export default EventEditor;
