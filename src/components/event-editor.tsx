"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Field, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { type DateRange } from "react-day-picker";
import DateRangePickerWithTime from "./date-range-picker-with-time.tsx";
import { eventsForDay } from "./events-for-day.tsx";

function EventEditor({
  gridViewIndex,
  daysArray,
  dummyCalendarEvents,
  setDialogOpen,
  subIndex,
  eventId,
}: {
  gridViewIndex: number;
  daysArray: object;
  dummyCalendarEvents: object;
  setDialogOpen: boolean;
  subIndex: number;
}) {
  let dayEvents = [];

  if (subIndex === -1) {
    dayEvents[0] = {
      id: "event-",
      title: "New Event",
      description: "",
      location: "",
      status: "active",
      all_day: false,
      transparency: "opaque",
      timezone: "Europe/Stockholm",
      organizer: "",
      recurrence: "",
      created_at: "",
      updated_at: "",
      startDate: "2026-09-11T09:00:00Z",
      endDate: "2026-09-21T09:00:00Z",
    };
    subIndex = 0;
  } else if (eventId !== "") {
    dayEvents[0] =
      dummyCalendarEvents[
        dummyCalendarEvents.findIndex((e) => e.id === eventId)
      ];
  } else {
    dayEvents = eventsForDay(gridViewIndex, daysArray, dummyCalendarEvents);
  }

  const handleSaveEvent = (e: React.SubmitEvent) => {
    e.preventDefault();

    const targetIndex = dummyCalendarEvents.findIndex((e) => e.id === eventId);
    dummyCalendarEvents[targetIndex] = {
      id: eventId,
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

    setDialogOpen(false);
    return false;
  };

  // console.log(dayEvents);
  if (eventId === "") eventId = dayEvents[subIndex].id;
  const [title, setTitle] = useState(dayEvents[subIndex].title);
  const [description, setDescription] = useState(
    dayEvents[subIndex].description,
  );
  const [location, setLocation] = useState(dayEvents[subIndex].location);
  /* const [date, setDate] = useState<DateRange | undefined>({
    from: dayEvents[subIndex].startDate,
    to: dayEvents[subIndex].endDate,
  }); */
  const [startDate, setStartDate] = useState(dayEvents[subIndex].startDate);
  const [endDate, setEndDate] = useState(dayEvents[subIndex].endDate);

  const [startTime, setStartTime] = useState("06:00");
  const [endTime, setEndTime] = useState("22:00");
  const [attendees, setAttendees] = useState(dayEvents[subIndex].attendees);
  const [flair, setFlair] = useState(dayEvents[subIndex].flair);
  const [allDay, setAllDay] = useState(dayEvents[subIndex].all_day);

  return (
    <div id="event-editor">
      <form onSubmit={(e) => handleSaveEvent(e)}>
        id:{eventId}
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
              endDate={endDate}
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

          <Button
            variant="primary"
            size="lg"
            className="hover:cursor-pointer hover:bg-pink-500 w-full mt-4 text-fuchsia-50 font-extrabold rounded-sm bg-pink-300"
            type="submit"
          >
            Save
          </Button>
        </Field>
      </form>
    </div>
  );
}

export default EventEditor;
