import { type DaysArray, type CalendarEvents, type CalendarEvent } from "../lib/calendar.ts";
export function eventsForDay(gridIndex: number, daysArray: DaysArray, calendarEvents: CalendarEvents) {
  const thisDay = daysArray[gridIndex];
  const thisDayTime = new Date(thisDay).getTime();

  return calendarEvents.filter((event: CalendarEvent) => {
    const startTime = new Date(event.startDate).getTime();
    const endTime = new Date(event.endDate).getTime();
    return startTime <= thisDayTime && thisDayTime <= endTime;
  });

}
