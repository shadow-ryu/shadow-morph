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
export  interface AppCustomizeSetting{
  status:string;
    profile: {
        bannerImage: any | undefined,
        bannerColor:string,
        isBanner?:boolean,
        bannerBorder:string,
        background:string,
        textColor:string,
        userTitleColor:string,
      },
      post: {
        bannerBorder:string,
        background:string,
        textColor:string,
        userTitleColor:string,
        likeIcon: string,
        shareIcon: string,
        commentIcon: string,
      },
}
export interface StoreType {
  appSetting: AppSetting;
  setAppSetting: (settings: AppSetting) => void;
  appCustomizeSetting:AppCustomizeSetting;
  setCustomizeSetting: (appCustomizeSetting: AppCustomizeSetting) => void;

}
