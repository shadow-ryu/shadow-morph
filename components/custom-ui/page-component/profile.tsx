import { Separator } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import defaultUserImg from "@/public/deafultUser.png";

import { Button } from "@/components/ui/button";
import {
  ArrowBigLeft,
  MoreHorizontal,
  Search,
  Share2Icon,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { communityTabs } from "@/lib/constants";
import { generateLocalURl } from "@/lib/utils";

interface profileProps {
  customSetting: any;
  postLikeIcon: string;
  postShareIcon: string;
  postCommentIcon: string | undefined;
}

const Profile = (profileSetting: profileProps) => {
  const {
    customSetting,
    postShareIcon,
    postLikeIcon,
    postCommentIcon,
  } = profileSetting;
  let user = {
    image: defaultUserImg,
    name: "test",
    userName: "nreeeee",
    members: 63,
  };
  // const loggedUser = await currentUser();
  return (
    <div
      className="h-min rounded"
      style={{
        background: "var(--gradient-background-color)",
        color: "var(--text-color)",
      }}
    >
      <div
        className="h-[2rem]  flex justify-between  items-center w-full"
        style={{ background: "black", color: "whitesmoke" }}
      >
        <div className=" order-1">
          <Button
            variant={"unknown"}
            className="hover:bg-transparent text-current"
          >
            <ArrowBigLeft />
          </Button>
        </div>
        <div className="order-2">
          <h3> community name</h3>
        </div>
        <div
          className="flex order-3 justify-evenly items-center
      "
        >
          <Button
            variant={"unknown"}
            className="hover:bg-transparent text-current"
          >
            {" "}
            <Search />{" "}
          </Button>
          <Button
            variant={"unknown"}
            className="hover:bg-transparent text-current"
          >
            <MoreHorizontal />
          </Button>
        </div>
      </div>
      <div className="flex-col justify-center items-center w-full h-full">
        <div className="h-[8rem] ">
          {customSetting.bannerImage ? (
            <Image
              src={generateLocalURl(customSetting.bannerImage) || ""}
              alt="banner"
              className="rounded-sm w-full  h-52 "
              width={100}
              height={100}
            />
          ) : (
            <div
              className="rounded-sm w-full bg-red-400  h-52"
              style={{
                background: "var(--gradient-banner-background-color)",
              }}
            >
              {" "}
            </div>
          )}
        </div>
        <div
          className="max-h-[14rem] h-fit w-full flex-col justify-center items-center p-2 "
          style={{
            background: "var(--gradient-background-color)",
            color: "var(--text-color)",
          }}
        >
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-2">
              <Avatar className="h-[4rem] w-[4rem]  items-center">
                {user.image ? (
                  <div className="relative aspect-square min-h-[4rem]  h-full w-full">
                    <Image
                      fill
                      src={user.image}
                      alt="profile picture"
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ) : (
                  <AvatarFallback>
                    <span className="sr-only">{user?.name}</span>
                    <User className="h-[4rem] w-[4rem]" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div className="flex flex-col py-2">
                <div className="flex-col text-justify">
                  <h2
                    className="text-heading3-bold"
                    style={{ color: "var(--header-color) !important" }}
                  >
                    {user.name}
                  </h2>
                  <p className=" text-slate-100">${user?.userName}</p>
                </div>
              </div>
            </div>
            <div className="">
              {/* <SubscribeLeaveToggle guildId={slug} isSubscribed={false} /> */}
            </div>
          </div>

          <p className="text-center p-4 ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta eos
            nesciunt omnis, aperiam, rem veniam laudantium tenetur ratione ut,
            praesentium consequuntur ab cum voluptatem iste autem molestias
            cupiditate doloribus facilis?
          </p>
          <div className="flex  justify-start gap-3 items-center">
            <div className="settings flex justify-between  gap-3 items-center w-full  ">
              <div className="mx-5 my-2 flex items-center gap-2 order-1">
                {[1, 2, 3, 4, 5, 5, 56, 6].slice(0, 2).map((comment, index) => (
                  <Image
                    key={index}
                    src={user.image}
                    alt={`user_${index}`}
                    width={34}
                    height={34}
                    className={`${
                      index !== 0 && "-ml-5"
                    } rounded-full object-cover`}
                  />
                ))}

                <p className="mt-1 font-light    text-stone-50">
                  {user?.members} member{user?.members > 1 ? "" : "s"}
                </p>
              </div>

              <div className="order-last flex justify-end pr-3">
                <Button
                  variant={"unknown"}
                  className="hover:bg-transparent text-current"
                >
                  {" "}
                  <Share2Icon height={22} />{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full bg-transparent">
          <Tabs
            defaultValue="posts"
            className="w-full"
            style={{
              background: "var(--gradient-background-color)",
              color: "var(--text-color)",
            }}
          >
            <TabsList className="tab flex justify-evenly   rounded-none">
              {communityTabs.map((tab) => (
                <TabsTrigger
                  key={tab.label}
                  value={tab.value}
                  className="tab w-full"
                >
                  <p className="max-sm:hidden">{tab.label}</p>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="posts" className="w-full text-light-1">
              {/* @ts-ignore */}
              {/* <ThreadsTab
                currentUserId={"888888"}
                accountId={"0000"}
                accountType="Community"
              /> */}
            </TabsContent>

            <TabsContent value="requests" className="w-full text-light-1">
              {/* @ts-ignore */}
              {/* <ThreadsTab
              currentUserId={user.id}
              accountId={communityDetails._id}
              accountType='Community'
            /> */}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
