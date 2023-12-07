"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  title: string;
  cssKey:string;
  normalMode?: boolean;
}
const CustomColorPicker = ({
  title,
  cssKey,
  normalMode = false,
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full my-3">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            <div className="flex justify-start gap-3 items-center ">
              <div
                className="w-[2rem] h-[2rem] mr-1 rounded-xl"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
                style={{
                  background: `var(${cssKey})`,
                }}
              ></div>
              <div>
                <p>{title}</p>
              </div>
            </div>
          </span>
        </HoverCardTrigger>
        <HoverCardContent
          className=" border-none max-w-max  w-full  h-full text-sm bg-white"
          side="left"
        >
          {normalMode ? (
            <HexColorPicker color={"#ff"} onChange={()=>{}} />
          ) : (
            <ColorPicker
              hidePresets
              hideInputs
              value={ document.documentElement.style.getPropertyValue(cssKey)}
              onChange={(value:any)=>{
                document.documentElement.style.setProperty(cssKey, value);
              }}
              className=""
            />
          )}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default CustomColorPicker;
