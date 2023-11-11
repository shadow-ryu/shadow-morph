"use client";

import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import { Input } from "../../ui/input";
interface ColorPickerProps {
  defaultColor: string;
  title: string;
  setColor: any;
}
const ColorPicker = ({ defaultColor, title, setColor }: ColorPickerProps) => {
  const handleColorChange = (e: any) => {
    console.log();
    setColor(e.target.value);
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex-col justify-center items-center">
      {/* <h4>{title}:-\</h4> */}

      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <div className="flex justify-start items-center ">
              <div
                className="w-[50px] h-[40px] mr-1 border rounded"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                style={{
                  backgroundColor: defaultColor,
                }}
              ></div>
              <div>
                <Input
                  value={defaultColor || "#0000"}
                  width={30}
                  className="ml-1 w-full  min-w-[51%] h-[5%] focus:border-none border-gray-100"
                  onChange={(e) => handleColorChange(e)}
                />
              </div>
            </div>
          </span>
        </HoverCardTrigger>
        <HoverCardContent
          className=" border-none max-w-max  border text-sm bg-transparent"
          side="left"
        >
          <HexColorPicker
            color={defaultColor || "#0000"}
            onChange={setColor}
            className="w-[400px] h-[200px] "
          />
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default ColorPicker;
