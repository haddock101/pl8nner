import { useState, useSyncExternalStore } from "react";
import { startOfDay, startOfMonth } from "date-fns";
import { Settings, CircleArrowLeft, LogOut } from "lucide-react";
import shseLogo from "./assets/shse-alt.svg";
import CalendarView from "./components/calendar-view.tsx";
import LoginForm from "./components/login-form.tsx";
import ResetPasswordForm from "./components/reset-password-form.tsx";
import { ThemeToggleAnimated } from "./components/theme-toggle-animated.tsx";
import { Button } from "./components/ui/button";
import { ButtonGroup } from "./components/ui/button-group";
import { useCalendarData } from "./hooks/use-calendar-data.ts";
import {
  clearResetTokenFromUrl,
  logout,
  resetTokenFromUrl,
  subscribeToken,
  tokenSnapshot,
} from "./lib/shse-api.ts";
import "./App.css";

function App() {
  // Without a token the API refuses everything, so ask the user to sign in.
  // The token is dropped automatically when the API says it has expired.
  const token = useSyncExternalStore(subscribeToken, tokenSnapshot);
  // Set when the page was opened from an emailed password reset link
  const [resetToken, setResetToken] = useState(resetTokenFromUrl);
  const finishReset = () => {
    clearResetTokenFromUrl();
    setResetToken(null);
  };

  return (
    <>
      <div className="hero">
        <img className="shse-logo" src={shseLogo} alt="" />
      </div>
      {resetToken ? (
        <section id="center" className="justify-center md:mt-4 md:mb-20">
          <ResetPasswordForm token={resetToken} onDone={finishReset} />
        </section>
      ) : token ? (
        // key remounts the calendar (and refetches) for each new session
        <SignedInCalendar key={token} />
      ) : (
        <section id="center" className="justify-center md:mt-4 md:mb-20">
          <LoginForm />
        </section>
      )}

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
          {token && (
            <Button aria-label="Sign out" title="Sign out" onClick={() => void logout()}>
              <LogOut />
            </Button>
          )}
        </ButtonGroup>
      </div>
    </>
  );
}

function SignedInCalendar() {
  // The visible month and the selected day are the only view state;
  // everything else (grid, week number, labels) is derived from them.
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState(() => startOfDay(new Date()));
  const { calendars, events, loading, error, reload, saveEvent, deleteEvent } =
    useCalendarData(viewMonth);

  return (
    <>
      {error && (
        <p className="text-destructive text-sm text-center mt-2">
          Could not reach the calendar API: {error}{" "}
          <button className="underline cursor-pointer" onClick={reload}>
            Retry
          </button>
        </p>
      )}
      <section id="center" className="justify-center md:mt-4 md:mb-20">
        <CalendarView
          calendarEvents={events}
          calendars={calendars ?? []}
          loading={loading}
          onSaveEvent={saveEvent}
          onDeleteEvent={deleteEvent}
          viewMonth={viewMonth}
          setViewMonth={setViewMonth}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </section>
    </>
  );
}

export default App;
