"use client";

import { useState } from "react";
import { format, lastDayOfMonth, startOfWeek, subMonths, addMonths, addDays } from "date-fns";
import getWeek from "../lib/my-utils.ts";
import getDaysArray from "./get-days-array.tsx";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import getMonths from "../api/months.tsx";

function TodayNav({
  daysArray,
  setDaysArray,
  week,
  day,
  calendarView,
  setCalendarView,
  calendarEvents,
  openEditor,
  selectedDay,
  setSelectedDay,
  setSelectedDate,
}) {
  const [months, setMonths] = useState(getMonths());

  const firstOfCurrentMonth = new Date(
    format(new Date(), "yyyy-MM-01") + "T23:59:00",
  );

  const goPrevious = () => {
    console.log(calendarView.firstOfCurrentMonth);
    let thisMonth = new Date(calendarView.firstOfCurrentMonth);
    let nextMonth = subMonths(thisMonth, 1);
    console.log(nextMonth);
    let nextStartOfMonthViewDate = startOfWeek(
      new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1, 1, 1),
      { weekStartsOn: 1 },
    );
    console.log(nextStartOfMonthViewDate);
    setDaysArray(getDaysArray(nextStartOfMonthViewDate));

    setCalendarView({
      firstOfCurrentMonth: nextMonth,
      startOfMonthViewDate: nextStartOfMonthViewDate,
      month: nextStartOfMonthViewDate.getMonth(),
      year: nextStartOfMonthViewDate.getFullYear(),
      day: nextStartOfMonthViewDate.getDay(),
      week: getWeek(nextStartOfMonthViewDate),
    });
  };

  const goNext = () => {
    console.log(calendarView.firstOfCurrentMonth);
    let thisMonth = new Date(calendarView.firstOfCurrentMonth);
    let nextMonth = addMonths(thisMonth, 1);
    console.log(nextMonth);
    let nextStartOfMonthViewDate = startOfWeek(
      new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1, 1, 1),
      { weekStartsOn: 1 },
    );
    console.log(nextStartOfMonthViewDate);

    setCalendarView({
      firstOfCurrentMonth: nextMonth,
      startOfMonthViewDate: nextStartOfMonthViewDate,
      month: nextStartOfMonthViewDate.getMonth(),
      year: nextStartOfMonthViewDate.getFullYear(),
      day: nextStartOfMonthViewDate.getDay(),
      week: getWeek(nextStartOfMonthViewDate),
    });

    setDaysArray(getDaysArray(nextStartOfMonthViewDate));
  };

  const setMonthInView = (month) => {
    const thisNow = new Date(calendarView.startOfMonthViewDate);
    const nextStartOfMonthViewDate = startOfWeek(
      new Date(thisNow.getFullYear(), month, 1, 1, 1),
      { weekStartsOn: 1 },
    );
    setCalendarView({
      firstOfCurrentMonth: nextMonth,
      startOfMonthViewDate: nextStartOfMonthViewDate,
      month: nextStartOfMonthViewDate.getMonth(),
      year: nextStartOfMonthViewDate.getFullYear(),
      day: nextStartOfMonthViewDate.getDay(),
      week: getWeek(nextStartOfMonthViewDate),
    });

    setDaysArray(getDaysArray(nextStartOfMonthViewDate));
  };


  const goToday = () => {
    alert("gotoday");
  };

  return (
    <>
      <div className="flex p-2 items-end justify-end">
        <div className="w-2/3">
          <h2 className="mb-0">
            <strong>
              {Intl.DateTimeFormat("en", { month: "long" }).format(
                calendarView.firstOfCurrentMonth
              )}
            </strong>{" "}
            {Intl.DateTimeFormat("en", { year: "numeric" }).format(
              calendarView.firstOfCurrentMonth
            )}{" "}
          </h2>
        </div>
        <div className="w-1/3 flex items-end justify-end">
          <ButtonGroup>
            <Button
              variant="ghost"
              size="lg"
              className="color-blue-500"
              onClick={goPrevious}
            >
              <ChevronLeft></ChevronLeft>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="color-blue-500"
              onClick={goToday}
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="color-blue-500"
              onClick={goNext}
            >
              <ChevronRight></ChevronRight>
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className="p-0 md:p-2">
        <div className="mb-2 hidden md:block">
          <ButtonGroup
            aria-labelledby="timeline-label"
            className="w-full justify-between"
          >
            <ButtonGroup>
              <Button
                variant="outline"
                aria-label="2024"
                size="icon"
                onClick={goPrevious}
              >
                <ChevronLeft />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">{calendarView.year}</Button>
              <Select
                items={months}
                value={calendarView.month}
                defaultValue={calendarView.month}
              >
                <SelectTrigger className="w-35">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {months.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button variant="outline">{calendarView.day}</Button>
              <Button variant="outline">W{calendarView.week}</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline" size="icon" onClick={goNext}>
                <ChevronRight />
              </Button>
            </ButtonGroup>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
}
export default TodayNav;
