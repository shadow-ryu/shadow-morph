"use client";
import AlertPopup from "@/components/common/AlertPopup";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/shacdnUiIcons";
import { presetFormSchema } from "@/constants/uiSchema";
import { toast } from "@/hooks/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { upperCaseFirstChar } from "@/lib/utils";
import { AppCustomizeSetting } from "@/types/types";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React, { useEffect, useState } from "react";
import Profile from "../page-component/profile";
import loadDash from "lodash";

import CustomizerSetting from "./CustomizerSetting";
import { PresetSelector } from "./PresetSelector";
import ScreenPreviewSelector from "./ScreenPreviewSelector";
import DesktopScreen from "./screens/DesktopScreen";
import MobileScreen from "./screens/MobileScreen";
import { Progress } from "@/components/ui/progress";
import { CloudFog } from "lucide-react";
const initialState: AppCustomizeSetting = {
  status: "pending",
  presetType: "profile",
  bannerBorder: "#000",
  background: "#000",
  textColor: "fff",
  userTitleColor: "",
  borderColor: "",
  customSetting: [],
};
const CustomizingEditor = ({
  dbData = [],
  slug,
  pageType,
  userId,
}: {
  dbData?: Array<AppCustomizeSetting> | any;
  slug: string;
  pageType: string;
  userId: string;
}) => {
  const [preset, setPreset] = useState("profile");
  const [screenType, setScreenType] = useState<string>("desktop");
  const [appCustomizeSetting, setAppCustomizeSetting] = useState<
    AppCustomizeSetting
  >(initialState);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [isUploading, setUploading] = useState(false);
  const { startUpload } = useUploadThing("media");
  const handleStatus = (status = "draft", clear = false) => {
    if (appCustomizeSetting.status === "draft" && !clear) return;
    setAppCustomizeSetting((prevPersonalization) => ({
      ...prevPersonalization,

      status: status,
    }));
  };
  const fetchCustomizationDataDb = async ({
    preset,
    data,
  }: {
    preset: string;
    data: Array<AppCustomizeSetting>;
  }) => {
    initialState["presetType"] = preset;
    let initialValue: AppCustomizeSetting;

    initialValue =
      data && data.length > 1
        ? data.find((res) => res.presetType === preset) || initialState
        : initialState;
    console.log(data && data.length > 1, "initialsState", initialValue);

    setProgress(100);
    setAppCustomizeSetting(initialValue);
    // handleCustomization({key:"presetType",value:preset})
    setTimeout(() => setLoading(false), 200);
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

    if ((key = "presetType")) {
      console.log(appCustomizeSetting);

      //   fetchCustomizationDataDb({
      //     preset: appCustomizeSetting.presetType,
      //     data: dbData,
      //   });
    }
  };

  const applyPresets = async () => {
    const result: any = loadDash.cloneDeep(appCustomizeSetting);
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
            cssVariable || ""
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
            // @ts-ignore
            appCustomizeSetting[parentKey][key] ||
            // @ts-ignore
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
    result["guildId"] = slug;
    result["ownerId"] = userId;
    result["pageType"] = pageType;

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
    result["pageType"] = "guild";
    result["ownerId"] = "";
    result["guildId"] = "";
    // available
    console.log(result,"fff");
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
    handleOnDiscard();
  };
  useEffect(() => {
    // fetchCustomizationDataDb({
    //   preset: appCustomizeSetting.presetType,
    //   data: dbData,
    // });
    // console.log(count);
    // let count =progress

    // clearTimeout(timer);
    // return () => clearTimeout(timer);
  });
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
              selectedPreset={appCustomizeSetting.presetType}
              setSelectedPreset={handleCustomization}
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
      {loading ? (
        <div className="h-full w-full items-center flex justify-center gap-4">
          <Progress value={progress} className="w-[60%]" />
        </div>
      ) : (
        <div className=" h-full w-full px-16 py-6  grid grid-cols-5 justify-center gap-4">
          <div className="min-h-[400px] col-span-4 flex-1 p-4 md:min-h-[700px] lg:min-h-[700px] bg-white rounded ">
            {/* <MobileScreen/> */}
            {screenType === "mobile" ? (
              <MobileScreen>
                {appCustomizeSetting.presetType === "profile" ? (
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
                {appCustomizeSetting.presetType === "profile" ? (
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
              <CustomizerSetting
                preset={appCustomizeSetting.presetType}
                initial={appCustomizeSetting}
                handleStatus={handleStatus}
                handleCustomization={handleCustomization}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizingEditor;
