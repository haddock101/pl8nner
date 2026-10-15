import HoverInfo from "./hover-info.tsx";
import { cn } from "../lib/utils";
import type { CalendarEvent } from "../types.ts";

const MAX_TITLE_LENGTH = 32;

type CalendarDayProps = {
  day: Date;
  inMonth: boolean;
  isSelected: boolean;
  events: CalendarEvent[];
  onSelect: () => void;
  onOpenEvent: (id: string) => void;
};

function CalendarDay({ day, inMonth, isSelected, events, onSelect, onOpenEvent }: CalendarDayProps) {
  return (
    <div
      className={cn(
        "p8-calendar-cell p8-flex-1-0-0 p8-calendar-day p8-ltr p8-calendar-day-labels p8-calendar-day-outer hover:bg-gray-50",
        isSelected && "selected",
        !inMonth && "outside-month",
      )}
    >
      <div className="p8-calendar-cell-inner p8-calendar-day-inner" onClick={onSelect}>
        <div className="p8-calendar-cell-text p8-calendar-day-text">{day.getDate()}</div>
        <div className="event-wrapper">
          {events.map((event) => (
            <div
              key={event.id}
              className={cn("p8-calendar-description", event.flair)}
              onClick={(e) => {
                e.stopPropagation();
                onOpenEvent(event.id);
              }}
            >
              <HoverInfo day={day} event={event} />
              {event.title.length > MAX_TITLE_LENGTH
                ? `${event.title.substring(0, MAX_TITLE_LENGTH)}…`
                : event.title}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="p8-calendar-text p8-calendar-text-placeholder"></div>
      </div>
    </div>
  );
}
export default CalendarDay;
