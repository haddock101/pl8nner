import { addDays } from "date-fns";
import type { DaysArray } from "../lib/my-utils.ts";

export function getDaysArray(fromDate: Date) {
  const daysArray: DaysArray = [];
  [...Array(35)].map((_, day) => {
    daysArray.push(addDays(new Date(fromDate), day));
  });
  return daysArray;
}
export default getDaysArray;
