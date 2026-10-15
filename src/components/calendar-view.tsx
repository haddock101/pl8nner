import { useState, type Dispatch, type SetStateAction } from "react";
import { format, isSameDay, isSameMonth, startOfDay, startOfMonth } from "date-fns";

import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent } from "./ui/dialog";
import { Item, ItemContent, ItemDescription, ItemTitle } from "./ui/item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import CalendarDay from "./calendar-day.tsx";
import TodayNav from "./today-nav.tsx";
import EventEditor from "./event-editor.tsx";
import { createEvent, eventsForDay, getMonthGrid, toWeeks } from "../lib/calendar.ts";
import type { CalendarEvent } from "../types.ts";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type EditorState = { mode: "new" | "edit"; event: CalendarEvent } | null;

type CalendarViewProps = {
  calendarEvents: CalendarEvent[];
  setCalendarEvents: Dispatch<SetStateAction<CalendarEvent[]>>;
  viewMonth: Date;
  setViewMonth: (month: Date) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

function CalendarView({
  calendarEvents,
  setCalendarEvents,
  viewMonth,
  setViewMonth,
  selectedDate,
  setSelectedDate,
}: CalendarViewProps) {
  const [editor, setEditor] = useState<EditorState>(null);

  const weeks = toWeeks(getMonthGrid(viewMonth));

  const sortedEvents = [...calendarEvents].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );

  // Clicking a day selects it; clicking the selected day again starts a new event.
  const handleDayClick = (day: Date) => {
    if (isSameDay(day, selectedDate)) {
      setEditor({ mode: "new", event: createEvent(day) });
    } else {
      setSelectedDate(day);
    }
  };

  const openEvent = (id: string) => {
    const event = calendarEvents.find((e) => e.id === id);
    if (event) setEditor({ mode: "edit", event });
  };

  const goToday = () => {
    const today = new Date();
    setViewMonth(startOfMonth(today));
    setSelectedDate(startOfDay(today));
  };

  // A new event is only added to the list when it is saved, so cancelling
  // the dialog leaves nothing behind.
  const saveEvent = (saved: CalendarEvent) => {
    setCalendarEvents((events) =>
      events.some((e) => e.id === saved.id)
        ? events.map((e) => (e.id === saved.id ? saved : e))
        : [...events, saved],
    );
    setEditor(null);
  };

  const deleteEvent = (id: string) => {
    setCalendarEvents((events) => events.filter((e) => e.id !== id));
    setEditor(null);
  };

  return (
    <>
      <TodayNav viewMonth={viewMonth} setViewMonth={setViewMonth} onToday={goToday} />
      <div className="plann8r w-full md:p-2 sm:p-0">
        <Card className="w-full p-0 ring-0 md:ring-1 sm:ring-0 rounded-none md:rounded-sm">
          <CardContent className="p-0 md:p-0 sm:p-0">
            <Dialog
              open={editor !== null}
              onOpenChange={(open) => {
                if (!open) setEditor(null);
              }}
            >
              <DialogContent
                className="bg-mist-50 dark:bg-accent rounded-sm ring-0 p-3 sm:p-4"
                showCloseButton={false}
              >
                {editor && (
                  // key resets the form state whenever a different event opens
                  <EventEditor
                    key={editor.event.id}
                    mode={editor.mode}
                    event={editor.event}
                    onSave={saveEvent}
                    onDelete={deleteEvent}
                    onCancel={() => setEditor(null)}
                  />
                )}
              </DialogContent>
            </Dialog>

            <div className="p8-calendar-view p8-flex-col p8-flex-1-1">
              <div className="p8-calendar-week-days p8-flex">
                {WEEKDAYS.map((weekday) => (
                  <div key={weekday} className="p8-calendar-week-day p8-flex-1-0-0">
                    {weekday}
                  </div>
                ))}
              </div>
              {weeks.map((week) => (
                <div
                  key={week[0].toISOString()}
                  className="p8-calendar-row p8-flex p8-flex-1-0"
                >
                  {week.map((day) => (
                    <CalendarDay
                      key={day.toISOString()}
                      day={day}
                      inMonth={isSameMonth(day, viewMonth)}
                      isSelected={isSameDay(day, selectedDate)}
                      events={eventsForDay(day, calendarEvents)}
                      onSelect={() => handleDayClick(day)}
                      onOpenEvent={openEvent}
                    />
                  ))}
                </div>
              ))}

              <Tabs
                defaultValue="alla"
                className="w-full mt-4 min-h-80 max-w-full overflow-hidden"
              >
                <TabsList variant="line" className="ml-2">
                  <TabsTrigger value="alla">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="day">Today</TabsTrigger>
                  <TabsTrigger value="week">Current Week</TabsTrigger>
                </TabsList>
                <TabsContent value="alla" className="p-0 md:p-2">
                  <div className="flex w-full flex-col gap-2 p-0 m-0">
                    {sortedEvents.map((event) => (
                      <Item
                        variant="outline"
                        key={event.id}
                        className="p-0 md:p-2 rounded-none md:rounded-sm"
                      >
                        <ItemContent
                          className="flex-row cursor-pointer"
                          onClick={() => openEvent(event.id)}
                        >
                          <div className="flex-col border-t-cyan-100 p-2 bg-gray-100 dark:bg-background rounded-none md:rounded-sm">
                            <div className="event-date lg w-15 text-right">
                              {format(new Date(event.startDate), "d")}
                            </div>
                            <div className="event-weekday w-15 text-right bg-pink-500 px-1 ">
                              {format(new Date(event.startDate), "EEEE")}
                            </div>
                          </div>
                          <div className="flex-col w-full ml-2 mt-2">
                            <ItemTitle className="text-left">
                              {event.title || "No title"}
                            </ItemTitle>
                            <ItemDescription>{event.description}</ItemDescription>
                          </div>
                        </ItemContent>
                      </Item>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="active" className="p-2">
                  <h2>Active</h2>
                </TabsContent>
                <TabsContent value="day" className="p-2">
                  <h2>Today</h2>
                </TabsContent>
                <TabsContent value="week" className="p-2">
                  <h2>Current Week</h2>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
export default CalendarView;
