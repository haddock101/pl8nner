import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { CalendarIcon } from "lucide-react";
import type { CalendarEvent } from "../lib/my-utils.ts";

function HoverInfo({ day, event }: { day: Date; event: CalendarEvent; }) {
return (
<HoverCard>
  <HoverCardTrigger className="opacity-0 size-3 absolute w-full"><CalendarIcon className="size-3 absolute"></CalendarIcon></HoverCardTrigger>
  <HoverCardContent className="" side="right">
      timedate:{day.toISOString()}<br />
      event.id: {event.id}<br />
      event.title: {event.title}<br />
      event.description: {event.description}<br />
      event.fromDate: {event.startDate.toLocaleString()}<br />
      event.toDate: {event.endDate.toLocaleString()}<br />
  </HoverCardContent>
</HoverCard>
)


}

export default HoverInfo;
