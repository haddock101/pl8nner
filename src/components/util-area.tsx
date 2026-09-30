import { useMemo, useState, useEffect } from "react";
import { useRef } from "react";
import Draggable from "react-draggable";
import { GripVertical } from "lucide-react";
/* import { DraggableCore } from "react-draggable"; */
import TodoList from "./todo-list.tsx";
// import { Toggle } from "./ui/toggle";
// import { Button } from "./ui/button";
// import {
//   ArrowUpIcon,
//   BadgeCheckIcon,
//   PlayingCardsFan,
//   ChevronRightIcon,
// } from "lucide-react";
// import {
//   Item,
//   ItemActions,
//   ItemContent,
//   ItemDescription,
//   ItemMedia,
//   ItemTitle,
// } from "./ui/item";

function UtilArea() {
  const nodeRef = useRef(null);
  const [defaultPosition, setDefaultPosition] = useState();
  // const [position, setPosition] = useState();
  //props.value = useStickyState('ads', 'util-area-value');

  useMemo(() => {
    const defaultPosition = JSON.parse(
      localStorage.getItem("storedDefaultPosition"),
    );
    if (defaultPosition) {
      // eslint-disable-next-line react-hooks/set-state-in-render
      setDefaultPosition(defaultPosition);
    } else {
      // setPosition({ x: 0, y: 0 });
      // setDefaultPosition({ x: 0, y: 0 });
    }
  }, []);

  return (
    <section id="util-box" className="justify-end">
      <Draggable
        handle="strong"
        nodeRef={nodeRef}
        onStop={(_e, data) => {
          localStorage.setItem(
            "storedDefaultPosition",
            JSON.stringify({ x: data.x, y: data.y }),
          );
        }}
        defaultPosition={defaultPosition}
      >
        <div
          ref={nodeRef}
          className="max-w-sm items-end justify-end rounded-sm bg-white shadow-lg outline outline-black/5 dark:bg-primary-foreground dark:shadow-none dark:-outline-offset-1 dark:outline-white/10"
        >
          <strong className="cursor">
            <div className="handle">
              <GripVertical className="inline" />
              <label>Util area</label>
            </div>
          </strong>
          <TodoList />
        </div>
      </Draggable>
    </section>
  );
}
/*
function slask () {
  <div className="flex w-full max-w-md flex-col gap-2">
    <Item variant="outline">
      <ItemContent>
        <ItemTitle>Basic Item</ItemTitle>
        <ItemDescription>
          A simple item with title and description.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="outline" size="sm">
          Action
        </Button>
      </ItemActions>
    </Item>
    <Item
      variant="outline"
      size="sm"
      render={
        <a href="#">
          <ItemMedia>
            <BadgeCheckIcon className="size-5" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Your profile has been verified.</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRightIcon className="size-4" />
          </ItemActions>
        </a>
      }
    />
    <Toggle aria-label="Toggle bookmark">Fooo</Toggle>
    <Toggle variant="outline">Booo</Toggle>
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Button</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
    </div>
    <Toggle aria-label="Toggle bookmark" variant="outline">
      Bookmark
    </Toggle>
    <PlayingCardsFan />
    <Toggle aria-label="Toggle bookmark" variant="outline">
      <BadgeCheckIcon className="group-aria-pressed/toggle:fill-foreground" />
      Bookmark
    </Toggle>
  </div>
}
*/

export default UtilArea;
