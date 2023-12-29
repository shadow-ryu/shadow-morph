"use client";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { presetFormSchema } from "@/constants/uiSchema";
import { generateLocalURl, upperCaseFirstChar } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import React, { ReactElement } from "react";
import CustomColorPicker from "./Colorpicker";

const CustomizerSetting = ({ preset, initial, handleCustomization,handleStatus }: any) => {
  const getFilterSchema = (preset = "") => {
    return presetFormSchema.filter((element) => element.presetType === preset);
  };
  const commonSchema = getFilterSchema();
  const presetSchema = getFilterSchema(preset);
  const generateUiSettings = () => {
    const UIComponents: ReactElement[] = [];
    const UICustomComponents: ReactElement[] = [];
    commonSchema.forEach((schema) => {
      let element: any = generateUiElement(schema);
      UIComponents.push(element);
    });
    presetSchema.forEach((schema) => {
      let element: any = generateUiElement(schema);
      UICustomComponents.push(element);
    });

    return (
      <div className="flex flex-col justify-center items-center">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Common Settings
        </h2>
        <div className="w-full px-6">{UIComponents}</div>
        <Separator />
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          {upperCaseFirstChar(preset)} Settings
        </h2>
        <div className="w-full px-6"> {UICustomComponents}</div>
      </div>
    );
  };
  const generateUiElement = ({
    key,
    isNested,
    parentKey,
    presetType,
    elementType: type,
    cssVariable,
    icon,
    label,
  }: any) => {
    const initialValue =
      isNested && initial ? initial[parentKey][key] : initial[key];
    switch (type) {
      case "ColorPicker":
        return (
          <CustomColorPicker
            title={label}
            key={key}
            handleStatus={handleStatus}
            cssKey={cssVariable || ""}
            // setColor={(value: string) =>}
          />
        );
        break;
      case "Image":
        return (
          <div
            key={key}
            className="flex  my-1 w-fit  text-left justify-evenly gap-2 items-center"
          >

            {initialValue !== undefined ? (
              <div className="flex justify-evenly items-center">
                <p className="relative h-fit w-fit  p-1 flex justify-center items-center gap-2 rounded">
                  <Image
                    width={20}
                    height={20}
                    src={generateLocalURl(initialValue) || ""}
                    alt={key}
                    className="w-[2rem] h-[2rem] mr-1  rounded-lg"
                  />
                  <X
                    onClick={() => {

                      handleCustomization({
                        // @ts-ignore
                        key,
                        isNested,
                        parentKey,
                        destroy: true,
                      });
                    }}
                    height={10}
                    className="absolute top-[-0.1rem] right-[-1%]  cursor-pointer  w-[0.8rem] rounded-full bg-white"
                  />
                </p>
                <p className=" text-small-regular">{initialValue?.name || label}</p>
              </div>
            ) : (
              <>
                <label
                  htmlFor={`file-${key}`}
                  className="flex w-[2rem] p-2 rounded justify-between items-center bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {icon ? (
                    <>{icon}</>
                  ) : (
                    <figure>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="17"
                        viewBox="0 0 20 17"
                      >
                        <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path>
                      </svg>
                    </figure>
                  )}
                </label>
                <Input
                  type="file"
                  id={`file-${key}`}
                  accept="image/*"
                  placeholder={key}
                  className="opacity-0 hidden"
                  onChange={(e: any) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleCustomization({
                        value: file,
                        key,
                        isNested,
                        parentKey,
                      });
                    }
                    handleStatus()
                  }}
                />
                <p>{label}</p>
              </>
            )}
          </div>
        );
        break;

      default:
        break;
    }
  };
  return <div>{generateUiSettings()}</div>;
};

export default CustomizerSetting;
