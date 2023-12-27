export interface UserProfile {
  bannerImage?: any | undefined;
}
export interface UserPost {
  likeIcon?: any | undefined;
  shareIcon?: any | undefined;
  commentIcon?: any | undefined;
}

export interface InitialState {
  profile: UserProfile;
  post: UserPost;
}
export interface SchemaItem {
  key: string;
  cssVariable?: string;
  type: string;
  label: string;
}

export interface AppSetting {
  personalMessageSelected: boolean;
  notification: boolean;
}
export interface AppCustomizeSetting {
  status: string;
  presetType: string;
  bannerBorder: string;
  background: string;
  textColor: string;
  userTitleColor: string;
  borderColor: string;
  customSetting: undefined | Array<any>;
}
export interface StoreType {
  appSetting: AppSetting;
  setAppSetting: (settings: AppSetting) => void;
  appCustomizeSetting: AppCustomizeSetting;
  setCustomizeSetting: (appCustomizeSetting: AppCustomizeSetting) => void;
}
