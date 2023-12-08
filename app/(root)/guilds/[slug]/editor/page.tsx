"use client";
import CustomizeSetting from "@/components/custom-ui/personalize/CustomizerSetting";
import CustomColorPicker from "@/components/custom-ui/personalize/Colorpicker";
import { PresetSelector } from "@/components/custom-ui/personalize/PresetSelector";
import ScreenPreviewSelector from "@/components/custom-ui/personalize/ScreenPreviewSelector";
import DesktopScreen from "@/components/custom-ui/personalize/screens/DesktopScreen";
import MobileScreen from "@/components/custom-ui/personalize/screens/MobileScreen";

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
import { Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import Profile from "@/components/custom-ui/page-component/profile";

const Page = () => {
  const [preset, setPreset] = useState("post");
  const [screenType, setScreenType] = useState<string>("desktop");
  useEffect(() => {
    console.log("pfirst");

    return () => {
      console.log("psec");
    };
  }, []);

  return (
    <div className=" h-full w-full flex-col md:flex">
      <div className="p-3 bg-black text-white flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 ">
        <h2 className="font-serif  text-heading4-medium">Editor</h2>
        <div className="ml-auto flex w-full space-x-2 sm:justify-end">
          <div className="hidden space-x-2 md:flex">
            <ScreenPreviewSelector
              current={screenType}
              setScreenType={setScreenType}
            />
            <PresetSelector
              selectedPreset={preset}
              setSelectedPreset={setPreset}
            />
            <Button> Save</Button>
          </div>
        </div>
      </div>
      <Separator />
      <div className=" h-full w-full px-16 py-6  grid grid-cols-5 justify-center gap-4">
        <div className="min-h-[400px] col-span-4 flex-1 p-4 md:min-h-[700px] lg:min-h-[700px] bg-white rounded ">
          {/* <MobileScreen/> */}
          {screenType === "mobile" ? (
            <MobileScreen>
              {preset === "profile" ? (
                <Profile
                  bannerImag={""}
                  postLikeIcon={""}
                  postShareIcon={""}
                  postCommentIcon={undefined}
                />
              ) : (
                "tests"
              )}
            </MobileScreen>
          ) : (
            <DesktopScreen>
              {preset === "profile" ? (
                <Profile
                  bannerImag={""}
                  postLikeIcon={""}
                  postShareIcon={""}
                  postCommentIcon={undefined}
                />
              ) : (
                "tests"
              )}
            </DesktopScreen>
          )}
        </div>
        <div className="hidden flex-col col-span-1 min-w-[20rem] bg-gray-200 space-y-4 sm:flex md:order-2 h-full min-h-[40rem]  rounded p-2 ">
          <div className="">
            <CustomizeSetting preset={preset} initialState={undefined} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
