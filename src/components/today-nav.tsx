import { addMonths, format, getISOWeek, setMonth, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const MONTHS = Array.from({ length: 12 }, (_, value) => ({
  value,
  label: format(new Date(2000, value, 1), "LLLL"),
}));

type TodayNavProps = {
  viewMonth: Date;
  setViewMonth: (month: Date) => void;
  onToday: () => void;
};

function TodayNav({ viewMonth, setViewMonth, onToday }: TodayNavProps) {
  const goPrevious = () => setViewMonth(subMonths(viewMonth, 1));
  const goNext = () => setViewMonth(addMonths(viewMonth, 1));

  return (
    <>
      <div className="flex p-2 items-end justify-end">
        <div className="w-2/3">
          <h2 className="mb-0">
            <strong>{format(viewMonth, "LLLL")}</strong> {format(viewMonth, "yyyy")}
          </h2>
        </div>
        <div className="w-1/3 flex items-end justify-end">
          <ButtonGroup>
            <Button variant="ghost" size="lg" aria-label="Previous month" onClick={goPrevious}>
              <ChevronLeft />
            </Button>
            <Button variant="ghost" size="lg" onClick={onToday}>
              Today
            </Button>
            <Button variant="ghost" size="lg" aria-label="Next month" onClick={goNext}>
              <ChevronRight />
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className="p-0 md:p-2">
        <div className="mb-2 hidden md:block">
          <ButtonGroup className="w-full justify-between">
            <ButtonGroup>
              <Button variant="outline" aria-label="Previous month" size="icon" onClick={goPrevious}>
                <ChevronLeft />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline">{viewMonth.getFullYear()}</Button>
              <Select
                items={MONTHS}
                value={viewMonth.getMonth()}
                onValueChange={(month) => {
                  if (typeof month === "number") setViewMonth(setMonth(viewMonth, month));
                }}
              >
                <SelectTrigger className="w-35">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {MONTHS.map((month) => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button variant="outline">W{getISOWeek(viewMonth)}</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline" aria-label="Next month" size="icon" onClick={goNext}>
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
