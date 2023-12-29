"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import React, { useEffect, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  title: string;
  cssKey: string;
  normalMode?: boolean;
  handleStatus:()=>void
}

const CustomColorPicker = ({
  title,
  cssKey,
  normalMode = false,
  handleStatus
}: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Check if we are on the client side
    if (typeof document !== "undefined") {
      setLoading(false);
    }
  }, [loading]);

  return (
    <div className="w-full my-3">
      {loading ? (
        <div className="flex items-center space-x-4">
          <Skeleton className="w-[2rem] bg-slate-400 h-[2rem] mr-1 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4  bg-slate-400 w-[100px]" />
          </div>
        </div>
      ) : (
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
            className="border-none max-w-max w-full h-full text-sm bg-white"
            side="left"
          >
            {normalMode ? (
              <HexColorPicker color={"#ff"} onChange={() => {}} />
            ) : (
              <div id="colorPickerContainer">
                <ColorPicker
                  hidePresets
                  hideInputs
                  value={document.documentElement.style.getPropertyValue(
                    cssKey
                  )}
                  onChange={(value: any) => {
                    document.documentElement.style.setProperty(cssKey, value);
                    console.log("object",handleStatus);
                    handleStatus()
                  }}
                  className=""
                />
              </div>
            )}
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  );
};

export default CustomColorPicker;
