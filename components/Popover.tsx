import React from "react";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";

export default function PopoverComponent() {
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button size="sm" color="warning">! Warning ¡</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-tiny text-black">Esta página aún se encuentra en desarrollo</div>
        </div>
      </PopoverContent>
    </Popover>
  );
}