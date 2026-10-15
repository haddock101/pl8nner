import { useState } from "react";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { type DateRange } from "react-day-picker";

import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { withTime } from "../lib/calendar.ts";

type DateRangePickerWithTimeProps = {
  start: Date;
  end: Date;
  onChange: (start: Date, end: Date) => void;
};

/** Controlled date range + time picker. Times are kept when the days change. */
const DateRangePickerWithTime = ({ start, end, onChange }: DateRangePickerWithTimeProps) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>({ from: start, to: end });

  const startTime = format(start, "HH:mm");
  const endTime = format(end, "HH:mm");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id="date-range"
            variant="outline"
            className="w-full justify-start text-left font-normal mr-2 h-11 transition-all hover:bg-muted/50 focus:ring-0 ring-0 focus:ring-primary/20 cursor-pointer rounded-sm text-xs"
          >
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            {`${format(start, "PP")} ${startTime} – ${format(end, "PP")} ${endTime}`}
            <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        }
      />
      <PopoverContent className="w-auto flex-row items-start gap-0 p-0">
        <Calendar
          showWeekNumber
          mode="range"
          weekStartsOn={1}
          defaultMonth={start}
          selected={range}
          onSelect={(selected: DateRange | undefined) => {
            setRange(selected);
            if (selected?.from) {
              onChange(
                withTime(selected.from, startTime),
                withTime(selected.to ?? selected.from, endTime),
              );
            }
          }}
          numberOfMonths={1}
        />
        <div className="flex-col items-start justify-between p-0 pr-2">
          <div className="flex-col items-start p-0 py-2">
            <input
              type="time"
              aria-label="Start time"
              value={startTime}
              onChange={(e) => onChange(withTime(start, e.target.value), end)}
              className="px-2 py-1 text-sm border rounded bg-background"
            />
          </div>
          <div className="flex items-start p-0 pb-2">
            <input
              type="time"
              aria-label="End time"
              value={endTime}
              onChange={(e) => onChange(start, withTime(end, e.target.value))}
              className="px-2 py-1 text-sm border rounded bg-background"
            />
          </div>
          <div className="flex items-end p-0 pb-2">
            <Button
              variant="outline"
              className="w-full rounded-sm cursor-pointer"
              onClick={() => setOpen(false)}
            >
              Done
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default DateRangePickerWithTime;
