"use client";

import { useState } from "react";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { type DateRange } from "react-day-picker";

import { cn } from "../lib/utils";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const DateRangePickerWithTime = ({ startDate, setStartDate, endDate, setEndDate }) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(startDate),
    to: new Date(endDate),
  });
  const [startTime, setStartTime] = useState("07:00");
  const [endTime, setEndTime] = useState("23:00");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            id="date-range"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal h-11 transition-all hover:bg-muted/50 focus:ring-2 focus:ring-primary/20 cursor-pointer",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
            {date?.from ? (
              date.to ? (
                `${format(date.from, "PP")} ${startTime} - ${format(date.to, "PP")} ${endTime}`
              ) : (
                `${format(date.from, "PP")} ${startTime}`
              )
            ) : (
              <span>Pick a date range and time</span>
            )}
            <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        }
      ></PopoverTrigger>
      <PopoverContent className="w-auto flex-row items-start gap-0 p-0">
        <Calendar
          initialFocus
          showWeekNumber
          mode="range"
          weekStartsOn={1}
          defaultMonth={date?.from}
          selected={date}
          onSelect={(d) => {
            setStartDate(d.from);
            setEndDate(d.to);
            setDate(d);
          }}
          numberOfMonths={1}
        />
        <div className="flex-col items-start justify-between p-0 pr-2 ">
          <div className="flex-col items-start p-0 py-2">
            <label className="text-xs font-medium"></label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="px-2 py-1 text-sm border rounded bg-background"
            />
          </div>
          <div className="flex items-start p-0 pb-2">
            <label className="text-xs font-medium"></label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="px-2 py-1 text-sm border rounded bg-background"
            />
          </div>
          <div className="flex items-end p-0 pb-2">
            <Button
              id="date-range"
              variant={"outline"}
              className="w-full rounded-sm cursor-pointer"
              onClick={(e) => {
                setDate(date);
                setOpen(false);
              }}
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
