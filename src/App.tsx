"use client";

import { useState } from "react";
import { format, lastDayOfMonth, startOfWeek, addDays } from "date-fns";
import shseLogo from "./assets/shse-alt.svg";
import CalendarView from "./components/calendar-view";
import { ThemeToggleAnimated } from "./components/theme-toggle-animated.tsx";
import {
  Settings,
  CircleArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { ButtonGroup } from "./components/ui/button-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import "./App.css";

// AIzaSyCfPTJZCZeRkIx5BT8K_0dE_6i75ndzMKc

import getEvents from "./api/events.tsx";
import getMonths from "./api/months.tsx";



function getWeek(d) {
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return weekNumber;
}

function App() {
  const today = new Date(format(new Date(), "yyyy-MM-01") + "T23:59:00");

  const startOfMonthViewDate = startOfWeek(
    new Date(today.getFullYear(), today.getMonth(), 1, 1, 1),
    { weekStartsOn: 1 },
  );

  const daysArray = [];
  [...Array(35)].map((_, day) => {
    daysArray.push(addDays(new Date(startOfMonthViewDate), day));
  });

  const [selectedDay, setSelectedDay] = useState(0);

  const [selectedDate, setSelectedDate] = useState(daysArray[selectedDay]);

  const goPrevious = () => {
    alert("goprevious");
  }

  const goNext = () => {
    alert("gonext");
  }

  const goToday = () => {
    alert("gotoday");
  }

  const now = new Date();
  let initialEvents = getEvents();
  const [calendarEvents, setCalendarEvents] = useState(initialEvents);
  const [calendarView, setCalendarView] = useState({
    month: Intl.DateTimeFormat("en", { month: "long" }).format(now),
    year: Intl.DateTimeFormat("en", { year: "numeric" }).format(now),
    day: Intl.DateTimeFormat("en", { day: "numeric" }).format(now),
    week: getWeek(now)
  });
  const [activeEventId, setActiveEventId] = useState(calendarEvents[0].id);
  const [months, setMonths] = useState(getMonths());

  return (
    <>
      <div className="hero">
        <img className="shse-logo" src={shseLogo} alt="" />
      </div>
      <section id="center" className="justify-center md:mt-4 md:mb-20">
        <div className="flex p-2 items-end justify-end">
          <div className="w-2/3">
            <h2 className="mb-0">
              <strong>{calendarView.month}</strong> {calendarView.year}{" "}
            </h2>
          </div>
          <div className="w-1/3 flex items-end justify-end">
            <ButtonGroup>
              <Button variant="ghost" size="lg" className="color-blue-500" onClick={goPrevious}>
                <ChevronLeft></ChevronLeft>
              </Button>
              <Button variant="ghost" size="lg" className="color-blue-500" onClick={goToday}>
                Today
              </Button>
              <Button variant="ghost" size="lg" className="color-blue-500" onClick={goNext}>
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
                <Button variant="outline" aria-label="2024" size="icon" onClick={goPrevious}>
                  <ChevronLeft />
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="outline">{calendarView.year}</Button>
                <Select
                  items={months}
                  defaultValue={calendarView.month.toLowerCase()}
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

          <CalendarView
            calendarEvents={calendarEvents}
            setCalendarEvents={setCalendarEvents}
            calendarView={calendarView}
            setCalendarView={setCalendarView}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            daysArray={daysArray}
            />

          {/* screenmode and settings nav */}
          <div className="flex items-center justify-center mt-2 mb-20">
            <ButtonGroup>
              <Button>
                <CircleArrowLeft></CircleArrowLeft>
              </Button>
              <ThemeToggleAnimated></ThemeToggleAnimated>
              <Button>
                <Settings></Settings>
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </section>
      {/* <UtilArea /> */}
    </>
  );
}

export default App;
