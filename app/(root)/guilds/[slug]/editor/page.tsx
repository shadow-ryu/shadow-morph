"use client";
import CustomizeSetting from "@/components/custom-ui/personalize/CustomizerSetting";
import CustomColorPicker from "@/components/custom-ui/personalize/Colorpicker";
import { PresetSelector } from "@/components/custom-ui/personalize/PresetSelector";
import ScreenPreviewSelector from "@/components/custom-ui/personalize/ScreenPreviewSelector";
import DesktopScreen from "@/components/custom-ui/personalize/screens/DesktopScreen";
import MobileScreen from "@/components/custom-ui/personalize/screens/MobileScreen";
import loadDash from "lodash";
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
import { Clock, CloudFog, Heart, MessageSquare, Share2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ColorPicker from "react-best-gradient-color-picker";
import Profile from "@/components/custom-ui/page-component/profile";
import useStore from "@/store";
import { saveOrUpdatePreset } from "@/lib/actions/guild.actions";
import { useUploadThing } from "@/lib/uploadthing";
import { AppCustomizeSetting } from "@/types/types";
import AlertPopup from "@/components/common/AlertPopup";
import { presetFormSchema } from "@/constants/uiSchema";
import { Icons } from "@/components/ui/shacdnUiIcons";
import { toast, useToast } from "@/hooks/use-toast";
import { upperCaseFirstChar } from "@/lib/utils";
interface PageProps {
  params: {
    slug: string;
  };
}
const initialState = {
  status: "pending",
  presetType: "profile",

  bannerBorder: "#000",
  background: "#000",
  textColor: "fff",
  userTitleColor: "",
  borderColor: "",
  customSetting: [],
};
const Page = ({ params }: PageProps) => {
  const [preset, setPreset] = useState("profile");
  const [screenType, setScreenType] = useState<string>("desktop");
  const [appCustomizeSetting, setAppCustomizeSetting] = useState<
    AppCustomizeSetting
  >(initialState);
  // const {toasts} =useToast;
  const [isUploading, setUploading] = useState(false);
  const { startUpload } = useUploadThing("media");
  const handleStatus = (status = "draft", clear = false) => {
    if (appCustomizeSetting.status === "draft" && !clear) return;
    setAppCustomizeSetting((prevPersonalization) => ({
      ...prevPersonalization,

      status: status,
    }));
  };
  const handleCustomization = ({
    value,
    key,
    isNested = false,
    parentKey,
    destroy = false,
  }: any) => {
    let newValue = destroy ? undefined : value;
    if (isNested) {
      setAppCustomizeSetting((prevPersonalization) => ({
        ...prevPersonalization,
        [parentKey]: {
          // @ts-ignore
          ...prevPersonalization[parentKey],
          [key]: newValue,
        },
      }));
    } else {
      setAppCustomizeSetting((prevPersonalization) => ({
        ...prevPersonalization,

        [key]: newValue,
      }));
    }
  };

  const applyPresets = async () => {
    const result = loadDash.cloneDeep(appCustomizeSetting);
    const presetSchema = presetFormSchema.filter(
      (schema) => schema.presetType === "" || schema.presetType === preset
    );

    for (const prop of presetSchema) {
      const {
        key,
        isNested,
        parentKey,
        presetType,
        elementType,
        cssVariable,
      } = prop;

      switch (elementType) {
        case "ColorPicker":
          const value = document.documentElement.style.getPropertyValue(
            cssVariable
          );
          if (isNested) {
            result[parentKey][key] = value;
          } else {
            result[key] = value;
          }
          break;
        case "Image":
          let file =
            result[parentKey][key] ||
            result[key] ||
            appCustomizeSetting[parentKey][key] ||
            appCustomizeSetting[key];
          // console.log(file,result)
          const imgRes = await startUpload([file]);
          if (imgRes && imgRes[0].url) {
            if (isNested) {
              result[parentKey][key] = imgRes[0]?.url;
            } else {
              result[key] = imgRes[0]?.url;
            }
          }
          break;
        default:
          break;
      }
    }

    return result;
  };

  const handleOnDiscard = () => {
    setAppCustomizeSetting(initialState);
  };
  const handleOnSave = async () => {
    setUploading(true);
    const result = await applyPresets();
    // const data = await saveOrUpdatePreset({
    //   guild_id: params.slug,
    //   type: "guild",
    //   // id,
    //   customizeSetting: result,
    // });
    console.log(result);
    handleStatus("saved", true);
    setUploading(false);
    toast({
      title: "Saved Successfully",
      variant: "success",
      description: `${upperCaseFirstChar(
        preset
      )} Page  customizations  has been saved.`,
    });
    // console.log(data);
  };
  handleOnDiscard();

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
              disabled={appCustomizeSetting.status === "draft"}
              selectedPreset={preset}
              setSelectedPreset={setPreset}
            />
            {appCustomizeSetting?.status === "draft" && !isUploading ? (
              <AlertPopup
                title="Are you absolutely sure?"
                description={`This action cannot be undone. This will permanently delete your unsaved changes  for ${preset} page. `}
                btnText="Discard"
                onContinue={handleOnDiscard}
              />
            ) : (
              <></>
            )}

            <Button disabled={isUploading} onClick={handleOnSave}>
              {isUploading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Save
            </Button>
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
                  customSetting={""}
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
                <Profile {...appCustomizeSetting} />
              ) : (
                "tests"
              )}
            </DesktopScreen>
          )}
        </div>
        <div className="hidden flex-col col-span-1 min-w-[20rem] bg-gray-200 space-y-4 sm:flex md:order-2 h-full min-h-[40rem]  rounded p-2 ">
          <div className="">
            <CustomizeSetting
              preset={preset}
              initial={appCustomizeSetting}
              handleStatus={handleStatus}
              handleCustomization={handleCustomization}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
