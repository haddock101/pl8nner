"use client";
import { format, lastDayOfMonth, startOfWeek, addDays } from "date-fns";

export function eventsForDay(gridIndex, daysArray, calendarEvents) {
  const thisDay = daysArray[gridIndex];
  const thisDayTime = new Date(thisDay).getTime();

  return calendarEvents.filter((event: object) => {
    let startTime = new Date(event.startDate).getTime();
    let endTime = new Date(event.endDate).getTime();
    return startTime <= thisDayTime && thisDayTime <= endTime;
  });

  // return events;
}
