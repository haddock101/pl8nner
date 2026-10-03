"use client";

import { useState } from "react";
import { format, startOfWeek } from "date-fns";
import getWeek from "./lib/my-utils.ts";
import shseLogo from "./assets/shse-alt.svg";
import CalendarView from "./components/calendar-view";
import { ThemeToggleAnimated } from "./components/theme-toggle-animated.tsx";
import {
  Settings,
  CircleArrowLeft,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { ButtonGroup } from "./components/ui/button-group";
import getEvents from "./api/events.tsx";
import "./App.css";
import getDaysArray from "./components/get-days-array";

// AIzaSyCfPTJZCZeRkIx5BT8K_0dE_6i75ndzMKc



function App() {
  const firstOfCurrentMonth = new Date(format(new Date(), "yyyy-MM-01") + "T23:59:00");

  const startOfMonthViewDate = startOfWeek(
    new Date(firstOfCurrentMonth.getFullYear(), firstOfCurrentMonth.getMonth(), 1, 1, 1),
    { weekStartsOn: 1 },
  );

  const [daysArray, setDaysArray] = useState(getDaysArray(startOfMonthViewDate));

  const [selectedDay, setSelectedDay] = useState(0);

  const [selectedDate, setSelectedDate] = useState(daysArray[selectedDay]);

  const now = new Date(firstOfCurrentMonth);

  let initialEvents = getEvents();

  const [calendarEvents, setCalendarEvents] = useState(initialEvents);
  const [calendarView, setCalendarView] = useState({
    firstOfCurrentMonth: firstOfCurrentMonth,
    startOfMonthViewDate: now,
    month: now.getMonth(), // Intl.DateTimeFormat("en", { month: "long" }).format()
    year: now.getFullYear(), // Intl.DateTimeFormat("en", { year: "numeric" }).format(now),
    day: now.getDay(), // Intl.DateTimeFormat("en", { day: "numeric" }).format(now),
    week: getWeek(now)
  });
  const [activeEventId, setActiveEventId] = useState(calendarEvents[0].id);


  return (
    <>
      <div className="hero">
        <img className="shse-logo" src={shseLogo} alt="" />
      </div>
      <section id="center" className="justify-center md:mt-4 md:mb-20">
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
          setDaysArray={setDaysArray}
            />
      </section>

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
    </>
  );
}

export default App;
