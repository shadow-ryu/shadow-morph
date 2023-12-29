import { StoreType } from "@/types/types";
import { create } from "zustand";

const useStore = create<StoreType>((set) => ({
  appSetting: {
    personalMessageSelected: true,
    notification: true,
  },
  appCustomizeSetting: {
    status: "draft",
    presetType: "profile",

    bannerBorder: "#000",
    background: "#000",
    textColor: "fff",
    userTitleColor: "",
    borderColor: "",
    customSetting: [],
  },
  setAppSetting: (settings) =>
    set((state) => ({ appSetting: { ...state.appSetting, ...settings } })),
  setCustomizeSetting: (settings: any) =>
    set((state) => ({
      appCustomizeSetting: { ...state.appCustomizeSetting, ...settings },
    })),
}));

export default useStore;
