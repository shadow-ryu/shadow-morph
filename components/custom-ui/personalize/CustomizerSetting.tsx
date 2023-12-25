import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateLocalURl } from "@/lib/utils";
import useStore from "@/store";
import { InitialState, SchemaItem } from "@/types/types";
import { Heart, MessageSquare, Share2, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { json } from "stream/consumers";

import CustomColorPicker from "./Colorpicker";
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

const initial: InitialState = {
  profile: {
    bannerImage: undefined,
    bannerColor: "",
    isBanner: false,
    bannerBorder: "",
    background: "",
    textColor: "",
    userTitleColor: "",
  },
  post: {
    likeIcon: undefined,
    shareIcon: undefined,
    commentIcon: undefined,
  },
  post_detail: {},
};
const CustomizeSetting = ({
  initialState,
  preset = "profile",
}: {
  initialState: any;
  preset: string;
}) => {
  const [userPersonalization, setUserPersonalization] = useState(
    initialState || initial
  );
  const { setCustomizeSetting, appCustomizeSetting } = useStore();
  const memoizedUserPersonalization = useMemo(() => userPersonalization, [
    userPersonalization,
  ]);

  interface CustomizationParams {
    value: string;
    template: string;
    property: string;
    isImage?: boolean;
    destroy?: boolean;
  }
  const handleCustomization = ({
    value,
    template,
    property,
    destroy = false,
  }: CustomizationParams) => {

    setCustomizeSetting((prevPersonalization) => ({
      ...prevPersonalization,
      [template]: {
        ...prevPersonalization[template],
        [property]: destroy ? undefined : value,
      },
    }));
    console.log("first", appCustomizeSetting[template][property]);

    
  };

  return (
    <div className="p-2">
      <Accordion type="single" collapsible className="w-full">
        {/* @ts-ignore */}
        {Object.keys(Schema[presets[preset]?.schema]).map((schemaKey) => {
          /* @ts-ignore */
          const current = Schema[presets[preset]?.schema][schemaKey];
          return (
            <AccordionItem
              key={schemaKey}
              className="border border-black  rounded px-2 my-1 py-1"
              value={schemaKey}
            >
              <AccordionTrigger>{schemaKey}</AccordionTrigger>
              <AccordionContent>
                {current.map((schema: SchemaItem, index: number) => {
                  const prop = schema.key || "none";
                  return (
                    <div key={index} className="w-full">
                      {schema.type === "ColorPicker" ? (
                        <CustomColorPicker
                          title={schema.label}
                          key={index}
                          cssKey={schema.cssVariable || ""}
                          // setColor={(value: string) =>}
                        />
                      ) : schema.type === "Image" ? (
                        <div className="flex  my-1 w-fit  text-left justify-evenly gap-2 items-center">
                          {appCustomizeSetting[preset] &&
                          appCustomizeSetting[preset][prop] !== undefined ? (
                            <div className="flex justify-evenly items-center">
                              <p className="relative h-fit w-fit  p-1 flex justify-center items-center gap-2 rounded">
                                <Image
                                  width={20}
                                  height={20}
                                  src={generateLocalURl(
                                    appCustomizeSetting[preset][prop]
                                  )}
                                  alt={schema.key}
                                  className="w-[2rem] h-[2rem] mr-1  rounded-lg"
                                />
                                <X
                                  onClick={() => {
                                    console.log("object");
                                    handleCustomization({
                                      // @ts-ignore
                                      value: undefined,
                                      template: preset,
                                      property: prop,
                                      destroy: true,
                                    });
                                  }}
                                  height={10}
                                  className="absolute top-[-0.1rem] right-[-1%]  cursor-pointer  w-[0.8rem] rounded-full bg-white"
                                />
                              </p>
                              <p>{schema.key}</p>
                            </div>
                          ) : (
                            <>
                              <label
                                htmlFor={`file-${schema.key}`}
                                className="flex w-[2rem] p-2 rounded justify-between items-center bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                              >
                                {schema.icon ? (
                                  <>{schema.icon}</>
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
                              <p>{schema.key}</p>
                            </>
                          )}
                          <Input
                            type="file"
                            id={`file-${schema.key}`}
                            accept="image/*"
                            placeholder={schema.key + index}
                            className="opacity-0 hidden"
                            onChange={async (e) => {
                              const file = e.target.files[0];
                              if (file) {
                                handleCustomization({
                                  value: file,
                                  template: preset,
                                  property: prop,
                                });
                                setCustomizeSetting({
                                  profile: {
                                    bannerImage: file,
                                  },
                                });
                              } else {
                                console.log("No file selected");
                              }
                            }}
                          />
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default CustomizeSetting;
