import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import type { CalendarEvent } from "../types.ts";

function HoverInfo({ day, event }: { day: Date; event: CalendarEvent }) {
  return (
    <HoverCard>
      <HoverCardTrigger className="opacity-0 size-3 absolute w-full">
        <CalendarIcon className="size-3 absolute" />
      </HoverCardTrigger>
      <HoverCardContent side="right">
        <div className="font-semibold">{event.title || "No title"}</div>
        <div>{format(day, "PPPP")}</div>
        <div>
          {format(new Date(event.startDate), "PP p")} – {format(new Date(event.endDate), "PP p")}
        </div>
        {event.location && <div>{event.location}</div>}
        {event.description && <div>{event.description}</div>}
      </HoverCardContent>
    </HoverCard>
  );
}

export default HoverInfo;
