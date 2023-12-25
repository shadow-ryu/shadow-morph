import { StoreType } from "@/types/types";
import { create } from "zustand";

const useStore = create<StoreType>((set) => ({
  appSetting: {
    personalMessageSelected: true,
    notification: true,
  },
  appCustomizeSetting: {
    status: "draft",
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
      bannerBorder: "",
      background: "",
      textColor: "",
      userTitleColor: "",
      likeIcon: "",
      shareIcon: "",
      commentIcon: "",
    },
    post_detail: {},
  },
  setAppSetting: (settings) =>
    set((state) => ({ appSetting: { ...state.appSetting, ...settings } })),
  setCustomizeSetting: (settings: any) =>
    set((state) => ({
      appCustomizeSetting: { ...state.appCustomizeSetting, ...settings },
    })),
}));

export default useStore;
