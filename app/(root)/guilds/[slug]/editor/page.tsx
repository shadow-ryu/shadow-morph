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
import { Clock, Heart, MessageSquare, Share2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import Profile from "@/components/custom-ui/page-component/profile";
import useStore from "@/store";
import { saveOrUpdatePreset } from "@/lib/actions/guild.actions";
import { useUploadThing } from "@/lib/uploadthing";
interface PageProps {
  params: {
    slug: string;
  };
}
const Page = ({ params }: PageProps) => {
  const [preset, setPreset] = useState("profile");
  const [screenType, setScreenType] = useState<string>("desktop");

  const { startUpload } = useUploadThing("media");

  const { appCustomizeSetting } = useStore();
  let Schema = {
    ProfileSchema: {
      colorSchema: [
        {
          key: "bannerColor",
          cssVariable: "--gradient-banner-background-color",
          type: "ColorPicker",
          label: "Banner Color",
        },
        {
          key: "bannerBorder",
          type: "ColorPicker",
          cssVariable: "--gradient-banner-border-color",
          label: "Banner Border Color",
        },
        {
          key: "background",
          cssVariable: "--gradient-background-color",

          type: "ColorPicker",
          label: "Background Color",
        },
        {
          key: "textColor",
          cssVariable: "--text-color",
          type: "ColorPicker",
          label: "Text Color",
        },
        {
          key: "userTitleColor",
          type: "ColorPicker",
          cssVariable: "--header-color",
          label: "User Title Color",
        },
      ],
      customSchema: [
        {
          key: "bannerImage",
          type: "Image",
          label: "Banner Image",
        },
      ],
    },
    PostSchema: {
      colorSchema: [
        {
          key: "background",
          type: "ColorPicker",
          cssVariable: "--gradient-post-background-color",

          label: "Background Color",
        },
        {
          key: "textColor",
          type: "ColorPicker",
          cssVariable: "--text-color",

          label: "Text Color",
        },
        {
          key: "userTitleColor",
          type: "ColorPicker",
          cssVariable: "--post-header-color",
          label: "User Title Color",
        },
      ],
      customSchema: [
        // {
        //   key: "bgImage",
        //   type: "Image",
        //   label: "background Image",
        // },
        {
          key: "likeIcon",
          type: "Image",
          label: "Like Icon",
          icon: <Heart />,
        },
        {
          key: "shareIcon",
          type: "Image",
          label: "share Icon",
          icon: <Share2 />,
        },
        {
          key: "commentIcon",
          type: "Image",
          label: "Comment Icon",
          icon: <MessageSquare />,
        },
      ],
    },
  };

  let presets = {
    profile: {
      key: "profile",
      title: "Profile Page",
      schema: "ProfileSchema",
    },
    post: {
      key: "post",
      title: "Post (home page)",
      schema: "PostSchema",
    },
    post_detail: {
      key: "post_detail",
      title: "Post Detail Page",
      schema: "PostSchema",
    },
  };
  const applyPresets = async (schema, presets, appCustomizeSetting) => {
    const result = { ...appCustomizeSetting };

    for (const presetKey in presets) {
      const preset = presets[presetKey];
      const schemaKey = preset.schema;
      const categorySettings = result[presetKey];

      if (schemaKey && schema[schemaKey]) {
        for (const prop of schema[schemaKey].colorSchema) {
          const { key, type, cssVariable } = prop;

          if (type === "ColorPicker") {
            const value = document.documentElement.style.getPropertyValue(
              cssVariable
            );
            categorySettings[key] = value;
          }
        }

        for (const prop of schema[schemaKey].customSchema) {
          const { key, type } = prop;

          if (
            type === "Image" &&
            presetKey in appCustomizeSetting &&
            appCustomizeSetting[presetKey][key]
          ) {
            const imgRes = await startUpload(
              appCustomizeSetting[presetKey][key]
            );
            if (imgRes && imgRes[0].url) {
              console.log(imgRes)
              categorySettings[key] = imgRes[0]?.url;
            }
          }
        }
      }
    }

    return result;
  };

  const onSave = async () => {
    const result = applyPresets(Schema, presets, appCustomizeSetting);
    // const data = await saveOrUpdatePreset({
    //   guild_id: params.slug,
    //   type: "guild",
    //   // id,
    //   customizeSetting: result,
    // });
    console.log(result)
    console.log("object");
    // console.log(data);
  };

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
            <Button onClick={onSave}> Save</Button>
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
                  bannerImage={""}
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
                // @ts-ignore
                <Profile {...appCustomizeSetting.profile} />
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
