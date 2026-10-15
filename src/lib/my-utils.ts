export function getWeek(d: Date) {
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return weekNumber;
}

type LeadingZero = `0${number}`;
export type FormatDateString = `${number}-${MM}-${DD}`;
type MM = LeadingZero | 10 | 11 | 12;
type DD = LeadingZero | `${1 | 2}${number}` | 30 | 31;
export type MonthsCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type DateAny = Date | number | FormatDateString | 'today';
export type DatesArr = Array<Date | number | string>;
export type WeekDayID = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type WeekDays<T> = [...T[]];
export type LocaleStated = {
  months: {
    long: string[];
    short: string[];
  };
  weekdays: {
    long: string[];
    short: string[];
  };
};
export type Locale = string | LocaleStated;

export type DaysArray = Array<Date>;

export interface CalendarView {
  firstOfCurrentMonth: Date,
  startOfMonthViewDate: Date,
  month: number, // Intl.DateTimeFormat("en", { month: "long" }).format()
  year: number, // Intl.DateTimeFormat("en", { year: "numeric" }).format(now),
  day: number, // Intl.DateTimeFormat("en", { day: "numeric" }).format(now),
  week: number
}

export type CalendarEvent = {
  id: string,
  title: string,
  description: string,
  location: string,
  status: string,
  allDay: boolean,
  transparency: string,
  timezone: string,
  organizer: string,
  recurrence: string,
  createdOn: Date | string,
  updatedOn: Date | string,
  startDate: Date | string,
  endDate: Date | string,
  createdBy: number | string,
  flair: string,

  attendees: string | string[]
}

export type CalendarEvents = Array<CalendarEvent>;


export default getWeek
