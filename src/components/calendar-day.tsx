"use client";

import HoverInfo from "./hover-info.tsx";
import { eventsForDay } from "./events-for-day.tsx";
import type { CalendarEvent, CalendarEvents, DaysArray } from "#lib/my-utils";

function CalendarDay({
  daysArray,
  week,
  day,
  /* @ts-ignore */
  calendarView,
  calendarEvents,
  /* @ts-ignore */
  openEditor,
  /* @ts-ignore */
  selectedDay,
  /* @ts-ignore */
  setSelectedDay,
  /* @ts-ignore */
  setSelectedDate,
}: {
  daysArray: DaysArray;
  week: number;
  day: number;
  calendarEvents: CalendarEvents;
}) {


  console.log(calendarView.firstOfCurrentMonth.getDate(), daysArray[week * 7 + day].getDate());


/* @ts-ignore */
  const selectDay = (viewIndex, e) => {
    // console.log(e.target);
    // console.log(selectedDay, viewIndex, daysArray[viewIndex]);
    if (viewIndex === selectedDay) {
      openEditor("new", viewIndex, "");
    } else {
      setSelectedDay(viewIndex);
      setSelectedDate(daysArray[viewIndex]);
    }
  };
  const isFirst = (calendarView.firstOfCurrentMonth.getDate() === daysArray[week * 7 + day].getDate())? " is-first ": "";
  return (
    <div
      className={
        "p8-calendar-cell p8-flex-1-0-0 p8-calendar-day p8-ltr p8-calendar-day-labels p8-calendar-day-outer hover:bg-gray-50 " +
        (week * 7 + day === selectedDay ? "selected" : "") + isFirst
      }
    >
      <div
        className="p8-calendar-cell-inner p8-calendar-day-inner "
        onClick={(e) => selectDay(week * 7 + day, e)}
      >
        <div className="p8-calendar-cell-text p8-calendar-day-text bg-none sm:bg-accent">
          {daysArray[week * 7 + day].getDate()}
        </div>
        <div className="debug">
          {daysArray[week * 7 + day].toISOString()}
          <br />
          gridIndex: {week * 7 + day}
        </div>
        <div className="event-wrapper text-xs sm:text-sm">
          {eventsForDay(week * 7 + day, daysArray, calendarEvents).map(
            (event: CalendarEvent, i) => (
              <div
                key={event.id}
                className={`p8-calendar-description ${event?.flair}`}
                onClick={(e) => {
                  e.stopPropagation();
                  openEditor("edit", week * 7 + day, `${event.id}`, i);
                }}
              >
                <HoverInfo
                  day={daysArray[week * 7 + day]}
                  event={event}
                ></HoverInfo>
                {event?.title.substring(0, 12)}
                {event?.title.length >= 12 && "..."}
              </div>
            ),
          )}
        </div>
      </div>
      <div>
        <div className="p8-calendar-text p8-calendar-text-placeholder"></div>
      </div>
    </div>
  );
}
export default CalendarDay;
