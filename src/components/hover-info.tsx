import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { CalendarIcon } from "lucide-react";

function HoverInfo({day}) {
return (
<HoverCard>
  <HoverCardTrigger><CalendarIcon className="opacity-0 size-3 absolute"></CalendarIcon></HoverCardTrigger>
  <HoverCardContent className="text-amber-500">
    {day.toISOString()}
  </HoverCardContent>
</HoverCard>
)


}

export default HoverInfo;
