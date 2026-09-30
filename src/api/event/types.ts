// types.ts

export type GetEventInput = { id: string }

export type CreateEventInput = {
  title: string,
  description: string;
  startDate: string;
}

export type Event = {
  id: "event-0",
  title: "a",
  description: "",
  location: "",
  status: "active",
  allDay: false,
  transparency: "opaque",
  timezone: "Europe/Stockholm",
  organizer: "",
  recurrence: "",
  createdOn: "",
  updatedOn: "",
  startDate: "2026-09-07T08:00:00Z",
  endDate: "2026-09-07T10:00:00Z",
  createdBy: string
}
