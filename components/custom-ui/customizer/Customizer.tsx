"use client";
import Image from "next/image";
// import { CounterClockwiseClockIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

import {
  Check,
  ChevronsUpDown,
  Command,
  Eye,
  LogOut,
  Monitor,
  StickyNote,
  TabletSmartphone,
  UserCog,
} from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ColorPicker from "./Colorpicker";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import ProfileGhost from "./ProfileGhost";
import { userAgent } from "next/server";
import RightSidebar from "./page/RSidebar";
import BottomNav from "./page/BottomNav";
import LeftSidebar from "./page/LSideBar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Navbar from "./page/Navbar";

const layouts = [
  {
    value: "profile",
    label: <div> </div>,
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];
export default function PlaygroundPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("profile");
  const [layout, setLayout] = useState("mobile");
  const [backgroundC, setBackground] = useState("#ffff");
  const [userTextColor, setUserTextColor] = useState("#261313");
  const [bodyTextColor, setBodyTextColor] = useState("#261313");
  return (
    <div className="h-screen  w-screen flex-col md:flex">
      <div className="px-2 flex w-full  items-center justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
        <h2 className="text-lg font-semibold">Playground</h2>
        {/* <PresetSelector presets={presets} /> */}
        {/* <PresetSave /> */}
        <div className="flex justify-center border rounded items-center">
          <Button
            variant={`${layout === "desktop" ? "secondary" : "ghost"}`}
            onClick={() => setLayout("desktop")}
          >
            <Monitor />
          </Button>
          <Separator orientation="vertical" />
          <Button
            variant={`${layout === "mobile" ? "secondary" : "ghost"}`}
            onClick={() => setLayout("mobile")}
          >
            <TabletSmartphone />
          </Button>
        </div>
        <div className=" ml-2 space-x-2 md:flex">
          <Button
            variant="secondary"
            className="flex space-x-2  justify-center items-center"
          >
            {" "}
            <Eye />
            <p className="ml-2 space-x-2 "> Preview</p>
          </Button>
          <Button variant={"ghost"}>
            <LogOut />
          </Button>
        </div>
        {/* <PresetActions /> */}
      </div>
      <Separator />
      <div className="grid grid-cols-[45fr_15fr]">
        <div className=" w-full mt-3 min-w-[45rem] min-h-[400px] h-screen flex rounded bg-slate-300  justify-center items-center  flex-1 p-4 md:min-h-[700px] lg:min-h-[700px] order-1">
          {/* <div className="minature-screen"> */}
          {layout === "desktop" ? (
            <div
              className="flex w-full  min-w-[100vh] "
              style={{ background: backgroundC }}
            >
              <LeftSidebar />
              <div className="min-w-[40vh] w-full h-full m-3">
                <ProfileGhost
                  bodyText={bodyTextColor}
                  userText={userTextColor}
                />
              </div>
              <RightSidebar />
            </div>
          ) : (
            <div
              className="w-[450px] grid grid-cols-1 h-[700px]  rounded border border-black "
              style={{ background: backgroundC }}
            >
              {/* Content for the mobile screen */}
              {/* <LeftSidebar /> */}
              <Navbar />
              <div className="h-[600px] my-3 mx-4">
                <ProfileGhost
                  bodyText={bodyTextColor}
                  userText={userTextColor}
                />
              </div>
              <div className="bg-black">
                <BottomNav mobile={true} />
              </div>
            </div>
          )}
          {/* </div> */}
        </div>
        <div className="flex-col space-y-4 min-w-[40vh] w-full sm:flex md:order-2">
          {/* modes */}
          <div className="grid gap-1 p-1  text-center items-center w-full justify-center">
            <HoverCard openDelay={200}>
              <HoverCardTrigger asChild>
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Mode
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-[320px] text-sm" side="left">
                Choose the interface that you want to customize. You can select:
                profile interface or post interface.
              </HoverCardContent>
            </HoverCard>
            <div className="my-1" />
            <div className="flex justify-between items-center rounder w-[40vh] h-full">
              <Button
                variant={"ghost"}
                className="flex justify-center items-center text-center w-[20vh]"
              >
                <UserCog /> <p className="ml-2">Profile</p>
              </Button>
              <Separator orientation="vertical" />
              <Button
                variant={"ghost"}
                className="flex justify-center items-center text-center w-[20vh]"
              >
                <StickyNote />
                <p className="ml-2"> Post</p>
              </Button>
            </div>
          </div>
          <Separator className="w-full" />
          {/* settings */}
          <div className="grid grid-cols-1 justify-center">
            <div className="">
              <div className="flex flex-col items-center justify-between space-4 ">
                <h4 className="text-sm font-semibold">Background Color</h4>
                <br />
                <div className="">
                  <ColorPicker
                    defaultColor={backgroundC}
                    title={""}
                    setColor={setBackground}
                  />
                </div>
              </div>
              <br />
            </div>
            <Separator />
          </div>
          <div className="grid grid-cols-1 justify-center">
            <div className="">
              <div className="flex flex-col items-center justify-between space-4 ">
                <h4 className="text-sm font-semibold">Username text Color</h4>
                <br />
                <div className="">
                  <ColorPicker
                    defaultColor={userTextColor}
                    title={""}
                    setColor={setUserTextColor}
                  />
                </div>
              </div>
              <br />
            </div>
            <Separator />
          </div>
          <div className="grid grid-cols-1 justify-center">
            <div className="">
              <div className="flex flex-col items-center justify-between space-4 ">
                <h4 className="text-sm font-semibold">Text Color</h4>
                <br />
                <div className="">
                  <ColorPicker
                    defaultColor={bodyTextColor}
                    title={""}
                    setColor={setBodyTextColor}
                  />
                </div>
              </div>
              <br />
            </div>
            <Separator />
          </div>
        </div>
      </div>
    </div>
  );
}
