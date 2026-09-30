import { useState } from "react";
import shseLogo from "./assets/shse-alt.svg";
import Plann8r from "./components/plann8r.tsx";
import { ThemeToggleAnimated } from "./components/theme-toggle-animated.tsx";
import {
  Settings,
  CircleArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { ButtonGroup } from "./components/ui/button-group";
import "./App.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

import getEvents from "./api/events.tsx";

function App() {
  const [dummyCalendarEvents] = useState(getEvents());
  const months = [
    { label: "January", value: "january" },
    { label: "February", value: "february" },
    { label: "March", value: "march" },
    { label: "April", value: "april" },
    { label: "May", value: "may" },
    { label: "June", value: "june" },
    { label: "July", value: "july" },
    { label: "August", value: "august" },
    { label: "September", value: "september" },
    { label: "October", value: "october" },
    { label: "November", value: "november" },
    { label: "December", value: "december" },
  ];

  return (
    <>
      <div className="hero">
        <img className="shse-logo" src={shseLogo} alt="" />
      </div>
      <section id="center" className="justify-center md:mt-4 md:mb-20">
        <div className="flex p-2 items-end justify-end">
          <div className="w-2/3">
            <h2 className="mb-0">
              <strong>September</strong> 2026
            </h2>
          </div>
          <div className="w-1/3 flex items-end justify-end">
            <ButtonGroup>
              <Button variant="ghost" size="lg" className="color-blue-500">
                <ChevronLeft></ChevronLeft>
              </Button>
              <Button variant="ghost" size="lg" className="color-blue-500">
                Today
              </Button>
              <Button variant="ghost" size="lg" className="color-blue-500">
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
                <Button variant="outline" aria-label="2024" size="icon">
                  <ChevronLeft />
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="outline">2025</Button>
                <Select items={months} defaultValue="september">
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
                <Button variant="outline">24</Button>
                <Button variant="outline">V39</Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="outline" size="icon">
                  <ChevronRight />
                </Button>
              </ButtonGroup>
            </ButtonGroup>
          </div>
          <Plann8r dummyCalendarEvents={dummyCalendarEvents}></Plann8r>
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
