"use client";

import { Card, CardContent } from "./ui/card";
import CalendarView from "./calendar-view.tsx";

function Plann8r({ dummyCalendarEvents }) {

  return (
    <div className="plann8r w-full">
      <Card className="w-full p-0 ring-0 md:ring-1 rounded-none md:rounded-sm :radius-sm">
        <CardContent className="p-0 md:p-0">
          {/* begin calendar  */}
          <CalendarView dummyCalendarEvents={dummyCalendarEvents} />
        </CardContent>
      </Card>
    </div>
  );
}

export default Plann8r;
