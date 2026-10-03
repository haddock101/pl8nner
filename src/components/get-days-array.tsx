import { addDays } from "date-fns";

export function getDaysArray(fromDate) {
  let daysArray = [];
  [...Array(35)].map((_, day) => {
    daysArray.push(addDays(new Date(fromDate), day));
  });
  return daysArray;
}
export default getDaysArray;
