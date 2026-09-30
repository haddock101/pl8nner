"use client";
import * as React from "react";
import { useState } from "react";
import { format, lastDayOfMonth, startOfWeek, addDays } from "date-fns";

import { type DateRange } from "react-day-picker";

import { Dialog, DialogContent } from "./ui/dialog";
import { Item, ItemContent, ItemDescription, ItemTitle } from "./ui/item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import EventEditor from "./event-editor.tsx";
import { eventsForDay } from "./events-for-day.tsx";

function CalendarView({ dummyCalendarEvents }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [gridViewIndex, setGridViewIndex] = useState();
  const [subIndex, setSubIndex] = useState(0);
  let [eventId, setEventId] = useState('');

  const config = {
    weekdays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  };

  const today = new Date(format(new Date(), "yyyy-MM-01") + "T23:59:00");

  const startOfMonthViewDate = startOfWeek(
    new Date(today.getFullYear(), today.getMonth(), 1, 1, 1),
    { weekStartsOn: 1 },
  );

  // console.log(startOfMonthViewDate);
  const firstDateOfMonth = format(today, "yyyy-MM-01");
  const lastDateOfMonth = format(lastDayOfMonth(today), "yyyy-MM-dd");

  const [range, setRange] = React.useState<DateRange | undefined>({
    from: startOfMonthViewDate,
    to: addDays(startOfMonthViewDate, 35),
  });
  // console.log(range);
  const daysArray = [];
  [...Array(35)].map((_, day) => {
    daysArray.push(addDays(new Date(startOfMonthViewDate), day));
  });

  const openEditor = (gridViewIndex, subIndex, eventId = '') => {
    setSubIndex(subIndex);
    if (gridViewIndex !== null) {
      setGridViewIndex(gridViewIndex);
      setDialogOpen(true);
    } else {
      setEventId(eventId);
      setDialogOpen(true);
    }
  };

  const [selectedEvents, setSelectedEvents] = useState();

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="bg-mist-50 dark:bg-accent"
          showCloseButton={false}
        >
          <EventEditor
            gridViewIndex={gridViewIndex}
            daysArray={daysArray}
            dummyCalendarEvents={dummyCalendarEvents}
            setDialogOpen={setDialogOpen}
            subIndex={subIndex}
            eventId={eventId}
          />
        </DialogContent>
      </Dialog>

      <div className="p8-calendar-view p8-flex-col p8-flex-1-1">
        <div className="p8-calendar-week-days p8-flex">
          {config.weekdays.map((weekday, index) => (
            <div key={index} className="p8-calendar-week-day p8-flex-1-0-0">
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
              <div
                key={"grid-day" + week * 7 + day}
                className="p8-calendar-cell p8-flex-1-0-0 p8-calendar-day p8-ltr p8-calendar-day-labels p8-calendar-day-outer"
              >
                <div
                  className="p8-calendar-cell-inner p8-calendar-day-inner "
                  onClick={(e) =>
                    openEditor(week * 7 + day, -1) || e.stopPropagation()
                  }
                >
                  <div className="p8-calendar-cell-text p8-calendar-day-text ">
                    {daysArray[week * 7 + day].getDate()}
                  </div>
                  <div className="debug">
                    {daysArray[week * 7 + day].toISOString()}
                    <br />
                    gridIndex: {week * 7 + day}
                  </div>
                  <div className="event-wrapper">
                  {eventsForDay(
                    week * 7 + day,
                    daysArray,
                    dummyCalendarEvents,
                  ).map((event, i) => (
                    <div
                      key={event.id}
                      className={`p8-calendar-description ${event?.flair}`}
                      onClick={(e) =>
                        openEditor(week * 7 + day, i) || e.stopPropagation()
                      }
                    >
                      {event?.title.substring(0, 32)}{" "}
                      {event?.title.length >= 32 && "..."}
                      <div className="debug">
                        start: {event.startDate}
                        <br />
                        end: {event.endDate}
                        <br />
                        {event.id}
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
                <div>
                  <div className="p8-calendar-text p8-calendar-text-placeholder"></div>
                </div>
              </div>
            ))}
          </div>
        ))}

        <Tabs
          defaultValue="alla"
          className="w-fit mt-4 min-h-80 max-w-full overflow-hidden"
        >
          <TabsList variant="line">
            <TabsTrigger value="alla">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="day">Today</TabsTrigger>
            <TabsTrigger value="week">Current Week</TabsTrigger>
          </TabsList>
          <TabsContent value="alla" className="p-2">
            <h2>All</h2>
            <div className="flex w-full flex-col gap-6 p-0 m-0">
              {dummyCalendarEvents.map(
                (event, key) =>
                  event.title && (
                    <Item variant="outline" key={key} className="p-2">
                      <ItemContent
                        className="flex-row"
                        onClick={() => openEditor(null, 0,`${event.id}`)}
                      >
                        <div className="flex-col border-t-cyan-100 p-2 bg-gray-100 dark:bg-background rounded-sm">
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
                        <div className="flex-col ml-2">
                          <ItemTitle className="text-left">
                            {event.id}
                            {event.title ? event.title : "No title"}
                          </ItemTitle>
                          <ItemDescription>{event.description}</ItemDescription>
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
    </>
  );
}
export default CalendarView;
