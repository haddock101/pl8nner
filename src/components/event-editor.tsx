"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import DateRangePickerWithTime from "./date-range-picker-with-time.tsx";
import { eventsForDay } from "./events-for-day.tsx";

function EventEditor({
  editorMode,
  gridViewIndex,
  daysArray,
  calendarEvents,
  setCalendarEvents,
  setDialogOpen,
  activeEventId,
  setActiveEventId,
}: {
  editorMode: string;
  gridViewIndex: number;
  daysArray: object;
  calendarEvents: object;
  setCalendarEvents: Function;
  setDialogOpen: boolean;
  activeEventId: string;
  setActiveEventId: Function;
}) {
  let dayEvents = [];

  if (editorMode === "new") {


  } else {

    dayEvents[0] =
      calendarEvents[
        calendarEvents.findIndex((event) => event.id === activeEventId)
      ];
  }

  console.log(dayEvents);
  // if (activeEventId === "") activeEventId = dayEvents[0].id;

  const [title, setTitle] = useState(dayEvents[0].title);
  const [description, setDescription] = useState(dayEvents[0].description);
  const [location, setLocation] = useState(dayEvents[0].location);

  const [date, setDate] = useState<DateRange | undefined>({
    from: dayEvents[0].startDate,
    to: dayEvents[0].endDate,
  });

  const [startDate, setStartDate] = useState(dayEvents[0].startDate);
  const [endDate, setEndDate] = useState(dayEvents[0].endDate);

  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("22:00");
  const [attendees, setAttendees] = useState(dayEvents[0].attendees);
  const [flair, setFlair] = useState(dayEvents[0].flair);
  const [allDay, setAllDay] = useState(dayEvents[0].all_day);

  const handleSaveEvent = (e: SubmitEvent) => {
    e.preventDefault();
    const targetIndex = calendarEvents.findIndex((e) => e.id === activeEventId);

    let nextEvent = calendarEvents[targetIndex];

    setCalendarEvents(
      calendarEvents.map((event) => {
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
      <form onSubmit={(e) => handleSaveEvent(e)}>
        <div className="debug">id:{activeEventId}</div>
        <Field className="gap-0">
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input
            type="text"
            id="title"
            className="rounded-sm bg-input"
            name="title"
            autoComplete="off"
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
              variant="primary"
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
                let nextCalendarEvents = calendarEvents.filter(
                  (e) => e.id !== activeEventId,
                );
                setActiveEventId(calendarEvents[0].id);
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
