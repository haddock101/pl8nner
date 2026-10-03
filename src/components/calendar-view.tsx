"use client";

import { useState } from "react";
import { format, lastDayOfMonth, startOfWeek, addDays } from "date-fns";

import { type DateRange } from "react-day-picker";
import { Card, CardContent } from "./ui/card";
import { Dialog, DialogContent } from "./ui/dialog";
import { Item, ItemContent, ItemDescription, ItemTitle } from "./ui/item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import CalendarDay from "./calendar-day.tsx";
import TodayNav from "./today-nav.tsx";
import EventEditor from "./event-editor.tsx";

function CalendarView({
  calendarEvents,
  setCalendarEvents,
  calendarView,
  setCalendarView,
  selectedDay,
  setSelectedDay,
  selectedDate,
  setSelectedDate,
  daysArray,
  setDaysArray
}) {
  const getFirstEventId = () => {
    let temp = calendarEvents[0].id;
    return temp;
  }
  const [dialogOpen, setDialogOpen] = useState(false);
  const [gridViewIndex, setGridViewIndex] = useState();
  const [activeEventId, setActiveEventId] = useState(getFirstEventId());

  const config = {
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  };

  const [editorMode, setEditorMode] = useState("edit");

  const openEditor = (editorMode, gridViewIndex, activeEventId) => {
    if (editorMode === "new") {
      let newEventId = "event-" + (Math.random() + 1).toString(36).substring(7);
      setCalendarEvents([
        ...calendarEvents,
        {
          id: newEventId,
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
          startDate: new Date(selectedDate),
          endDate: addDays(selectedDate, 0.5),
        },
      ]);
      activeEventId = newEventId;
      setActiveEventId(newEventId);
      console.log("new,", calendarEvents);
    }
    // setActiveEventId(activeEventId);

    if (editorMode === "edit") {
      console.log("EDIT", activeEventId);
    }

    if (gridViewIndex !== null) {
      setGridViewIndex(gridViewIndex);
      setDialogOpen(true);
    } else {
      console.log("setting", activeEventId);
      setActiveEventId(activeEventId);
      setDialogOpen(true);
    }
  };

  return (
    <>
      <TodayNav
        calendarView={calendarView}
        setCalendarView={setCalendarView}
        daysArray={daysArray}
        setDaysArray={setDaysArray}
      />
      <div className="plann8r w-full md:p-2 sm:p-0">
        <Card className="w-full p-0 ring-0 md:ring-1 sm:ring-0 rounded-none md:rounded-sm :radius-sm">
          <CardContent className="p-0 md:p-0 sm:p-0">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen} className="">
              <DialogContent
                className="bg-mist-50 dark:bg-accent rounded-sm ring-0 p-3 sm:p-4"
                showCloseButton={false}
              >
                <EventEditor
                  editorMode={editorMode}
                  gridViewIndex={gridViewIndex}
                  daysArray={daysArray}
                  calendarEvents={calendarEvents}
                  setCalendarEvents={setCalendarEvents}
                  setDialogOpen={setDialogOpen}
                  activeEventId={activeEventId}
                  setActiveEventId={setActiveEventId}
                />
              </DialogContent>
            </Dialog>

            <div className="p8-calendar-view p8-flex-col p8-flex-1-1">
              {/* weekday header */}
              <div className="p8-calendar-week-days p8-flex">
                {config.weekdays.map((weekday, index) => (
                  <div
                    key={index}
                    className="p8-calendar-week-day p8-flex-1-0-0"
                  >
                    {weekday}
                  </div>
                ))}
              </div>
              {[...Array(5)].map((_, week) => (
                <div
                  key={"week" + week * 7}
                  className="p8-calendar-row p8-flex p8-flex-1-0"
                >
                  {[...Array(7)].map((_, day) => (
                    <CalendarDay
                      key={"grid-day" + week * 7 + day}
                      daysArray={daysArray}
                      week={week}
                      day={day}
                      calendarEvents={calendarEvents}
                      openEditor={openEditor}
                      selectedDay={selectedDay}
                      setSelectedDay={setSelectedDay}
                      setSelectedDate={setSelectedDate}
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
                    {calendarEvents.map(
                      (event, key) =>
                        event.title && (
                          <Item
                            variant="outline"
                            key={key}
                            className="p-0 md:p-2 rounded-none md:rounded-sm"
                          >
                            <ItemContent
                              className="flex-row"
                              onClick={(e) =>
                                openEditor("edit", null, `${event.id}`) &&
                                e.stopPropagation()
                              }
                            >
                              <div className="flex-col border-t-cyan-100 p-2 bg-gray-100 dark:bg-background rounded-none md:rounded-sm">
                                <div className="event-date lg w-15 text-right">
                                  {new Date(event.startDate).getDate()}
                                </div>
                                <div className="event-weekday w-15 text-right bg-pink-500 px-1 ">
                                  {event.startDate
                                    ? [
                                        "Sunday",
                                        "Monday",
                                        "Tuesday",
                                        "Wednesday",
                                        "Thursday",
                                        "Friday",
                                        "Saturday",
                                      ][new Date(event.startDate).getDay()]
                                    : "No date"}
                                </div>
                              </div>
                              <div className="flex-col w-full ml-2 mt-2">
                                <ItemTitle className="text-left">
                                  {event.title ? event.title : "No title"}
                                </ItemTitle>
                                <ItemDescription>
                                  {event.description}
                                </ItemDescription>
                              </div>
                            </ItemContent>
                          </Item>
                        ),
                    )}
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
