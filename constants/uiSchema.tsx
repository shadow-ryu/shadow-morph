import { Heart } from "lucide-react";
import { Share2 } from "lucide-react";
import { MessageSquare } from "lucide-react";
export const presetFormSchema = [
  {
    key: "background",
    isNested: false,
    parentKey: "",
    presetType: "",
    elementType: "ColorPicker",
    cssVariable: "--gradient-background-color",
    label: "Background Color",
  },
  {
    key: "textColor",
    isNested: false,
    parentKey: "",
    presetType: "",
    elementType: "ColorPicker",
    cssVariable: "--text-color",
    label: "Text Color",
  },
  {
    key: "userTitleColor",
    isNested: false,
    parentKey: "",
    presetType: "",
    elementType: "ColorPicker",
    cssVariable: "--header-color",
    label: "User Title Color",
  },
  {
    key: "bannerBorder",
    isNested: true,
    parentKey: "customSetting",
    presetType: "profile",
    elementType: "ColorPicker",
    cssVariable: "--gradient-banner-border-color",
    label: "Banner Border Color",
  },
  {
    isNested: true,
    parentKey: "customSetting",
    presetType: "profile",
    elementType: "ColorPicker",
    key: "bannerColor",
    cssVariable: "--gradient-banner-background-color",
    type: "ColorPicker",
    label: "Banner Color",
  },
  {
    isNested: true,
    parentKey: "customSetting",
    presetType: "profile",
    key: "bannerImage",
    elementType: "Image",
    label: "Banner Image",
  },
  {
    isNested: true,
    parentKey: "customSetting",
    presetType: "post",
    elementType: "Image",
    key: "likeIcon",
    label: "Like Icon",
  },
  {
    isNested: true,
    parentKey: "customSetting",
    presetType: "post",
    elementType: "Image",
    key: "shareIcon",
    label: "share Icon",
  },
  {
    isNested: true,
    parentKey: "customSetting",
    presetType: "post",
    elementType: "Image",
    label: "Comment Icon",
    key: "commentIcon",
  },
];

export const presets = {
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
