"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Monitor, Smartphone, TabletSmartphone } from "lucide-react";
import React, { useState } from "react";

const ScreenPreviewSelector = ({
  current,
  setScreenType,
}: {
  current?: string;
  setScreenType: any;
}) => {
  const handleScreenSelection = (type: string) => {
    if (!type) return;
    setScreenType(type);
  };
  return (
    <div className="items-center justify-center rounded bg-slate-900 hidden col-span-1 space-x-2 sm:flex">
      {/* Toggle Full View */}
      <Button
        data-tooltip-target="full-screen-tooltip"
        onClick={() => {
          handleScreenSelection("desktop");
        }}
        className="flex items-center justify-center w-12 h-12 text-xs font-medium text-gray-100 rounded-lg toggle-full-view hover:bg-gray-800 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <span className="sr-only">Toggle full view</span>
        <Monitor height={12} />
      </Button>
    
      {/* @ts-ignore */}
      <Separator aria-orientation="vertical" className="bg-gray-200"orientation="vertical"
      />
      <Button
        data-tooltip-target="mobile-screen-tooltip"
        onClick={() => {
          handleScreenSelection("mobile");
        }}
        className="flex items-center justify-center w-12 h-12  text-xs font-medium text-gray-100 rounded-lg toggle-full-view hover:bg-gray-800 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-500 dark:bg-gray-800 focus:outline-none dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
      >
        <span className="sr-only">Toggle mobile view</span>
        <Smartphone height={12} />
      </Button>
      {/* Repeat the above structure for Toggle Tablet View and Toggle Mobile View */}
    </div>
  );
};

export default ScreenPreviewSelector;
