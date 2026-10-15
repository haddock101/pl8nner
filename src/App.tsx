import { useState } from "react";
import { startOfDay, startOfMonth } from "date-fns";
import { Settings, CircleArrowLeft } from "lucide-react";
import shseLogo from "./assets/shse-alt.svg";
import CalendarView from "./components/calendar-view";
import { ThemeToggleAnimated } from "./components/theme-toggle-animated.tsx";
import { Button } from "./components/ui/button";
import { ButtonGroup } from "./components/ui/button-group";
import getEvents from "./api/events.ts";
import type { CalendarEvent } from "./types.ts";
import "./App.css";

function App() {
  // The visible month and the selected day are the only view state;
  // everything else (grid, week number, labels) is derived from them.
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState(() => startOfDay(new Date()));
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(getEvents);

  return (
    <>
      <div className="hero">
        <img className="shse-logo" src={shseLogo} alt="" />
      </div>
      <section id="center" className="justify-center md:mt-4 md:mb-20">
        <CalendarView
          calendarEvents={calendarEvents}
          setCalendarEvents={setCalendarEvents}
          viewMonth={viewMonth}
          setViewMonth={setViewMonth}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </section>

      {/* screenmode and settings nav */}
      <div className="flex items-center justify-center mt-2 mb-20">
        <ButtonGroup>
          <Button aria-label="Back">
            <CircleArrowLeft />
          </Button>
          <ThemeToggleAnimated />
          <Button aria-label="Settings">
            <Settings />
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
}

export default App;
