"use client";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import React from "react";
import ProfileHeader from "../custom-ui/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { UserAvatar } from "../UserAvatar";
import PostPreview from "./PostPreview";

interface profileProps {
  bannerImag: any;
  backGroundColor: string;
  textColor: string;
}
const Profile = ({ textColor, bannerImag, backGroundColor }: profileProps) => {
  console.log(bannerImag);
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen  "
      style={{
        backgroundColor: backGroundColor,
      }}
    >
      {bannerImag ? (
        <Image
          src={bannerImag}
          alt="banner"
          className="rounded-sm w-full  h-52 "
          width={100}
          height={100}
        />
      ) : (
        <div
          className="rounded-sm w-full bg-blue-100  h-52"
          style={
            {
              //   backgroundImage: "",
            }
          }
        ></div>
      )}

      <div className="flex justify-start items-start px-4">
        <div className="flex flex-col justify-center items-center -mt-[23%]">
          <UserAvatar
            user={{
              name: null,
              image:
                "data:image/jpeg;base64,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",
            }}
            className="h-12 w-12 backdrop-filter"
          />
          <div className=" text-center ">
            <h6> community name</h6>
            <p>@community</p>
          </div>
        </div>
      </div>
      <div
        className="m-2 flex flex-col  items-center"
        style={{ color: textColor }}
      >
        <div className=" text-justify p-4  text-sm ">
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
            dolorem rerum deleniti minima. Quae tempora, corrupti magnam ipsum
            labore accusantium perspiciatis soluta, amet voluptate rerum harum
            vero eius quam dolorem. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Tenetur ea repellat ipsum enim. Adipisci unde
            voluptas illum tempore consequatur labore excepturi dignissimos
            officia. Voluptas sint praesentium molestiae exercitationem quam
            iure.
          </p>
        </div>
        <Tabs defaultValue="account" className="w-full m-2 p-3">
          <TabsList className="grid w-full grid-cols-5 gap-3">
            <TabsTrigger value="account">posts</TabsTrigger>
            {/* <TabsTrigger value="test">posts</TabsTrigger>
            <TabsTrigger value="accoteunt">posts</TabsTrigger> */}
            {/* <TabsTrigger value="password">Password</TabsTrigger> */}
          </TabsList>
          <TabsContent value="account">
            <div className="flex flex-col justify-between items-center gap-2">
              <PostPreview
                postBackgroundColor="black"
                bodyTextColor="#ffff"
                userNameColor="#fff"
              />
              <PostPreview
                postBackgroundColor="black"
                bodyTextColor="#ffff"
                userNameColor="#fff"
              />
              <PostPreview
                postBackgroundColor="black"
                bodyTextColor="#ffff"
                userNameColor="#fff"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
