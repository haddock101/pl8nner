"use client";

import { useState } from "react";
import HoverInfo from "./hover-info.tsx";
import { eventsForDay } from "./events-for-day.tsx";

function CalendarDay({ daysArray, week, day, calendarEvents, openEditor, selectedDay, setSelectedDay, setSelectedDate }) {
  const selectDay = (viewIndex, e) => {
    console.log(e.target);
    if (viewIndex === selectedDay) {
      openEditor("new", viewIndex, "");
    } else {
      setSelectedDay(viewIndex);
      setSelectedDate(daysArray[viewIndex]);
    }
    // alert(viewIndex);
    //
  };
  return (
    <div
      className={"p8-calendar-cell p8-flex-1-0-0 p8-calendar-day p8-ltr p8-calendar-day-labels p8-calendar-day-outer hover:bg-gray-50 " + ((week*7+day === selectedDay)? 'selected' : '')}
    >
      <div
        className="p8-calendar-cell-inner p8-calendar-day-inner "
        onClick={(e) => selectDay(week * 7 + day, e)}
      >
        <div className="p8-calendar-cell-text p8-calendar-day-text ">
          <HoverInfo day={daysArray[week * 7 + day]}></HoverInfo>
          {daysArray[week * 7 + day].getDate()}
        </div>
        <div className="debug">
          {daysArray[week * 7 + day].toISOString()}
          <br />
          gridIndex: {week * 7 + day}
        </div>
        <div className="event-wrapper">
          {eventsForDay(week * 7 + day, daysArray, calendarEvents).map(
            (event, i) => (
              <div
                key={event.id}
                className={`p8-calendar-description ${event?.flair}`}
                onClick={(e) =>
                  e.stopPropagation() ||
                  openEditor("edit", week * 7 + day, `${event.id}`)
                }
              >
                {event?.title.substring(0, 32)}{" "}
                {event?.title.length >= 32 && "..."}
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
