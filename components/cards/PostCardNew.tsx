"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { UserAvatar } from "../custom-ui/UserAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import EditorOutput from "../custom-ui/editior/EditorOutput";
import {
  Command,
  ListChecksIcon,
  MessageCircle,
  Star,
  Waypoints,
} from "lucide-react";
import GuildHoverCard from "./GuildHoverCard";

let post = {
  id: 13,
  title: "new2",
  authorId: "user_2YXCmSzpGrwkFYlFbhh79csdJdH",
  guildId: 5,
  isGuild: true,
  content: {
    time: 1704390355612,
    blocks: [
      {
        id: "rr-JNItV4o",
        type: "paragraph",
        data: {
          text: "tester",
        },
      },
      {
        id: "9n6haFwLWC",
        type: "linkTool",
        data: {
          link: "https://github.com/shadow-ryu",
          meta: {
            title: "shadow-ryu (Vishnu Kulkarni) · GitHub",
            description:
              "Presently crafting 𝕾𝖍𝖆𝖉𝖔𝖜 𝕸𝖔𝖗𝖕𝖍. shadow-ryu has 43 repositories available. Follow their code on GitHub.",
            image: {
              url: "https://avatars.githubusercontent.com/u/67259992?v=4?s=400",
            },
          },
        },
      },
    ],
    version: "2.28.2",
  },
  createdAt: "2024-01-04T17:45:58.000Z",
  updatedAt: "2024-01-04T17:45:58.000Z",
  parentId: null,
  author: {
    id: "user_2YXCmSzpGrwkFYlFbhh79csdJdH",
    name: "Vishnu",
    email: null,
    username: "repivim139w",
    image:
      "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yWVhDbVRIUkJlS0VoMUU2dVltZ3Y5T0M2STIifQ",
    isSetup: true,
    bio: "eds",
    interests: null,
    createdAt: "2024-01-03T10:36:27.666064",
    updatedAt: "2024-01-03T10:36:27.666064",
  },
  guild: {
    id: 5,
    name: "2wes",
    guildHandle: "teste",
    ownerId: "user_2YXCmSzpGrwkFYlFbhh79csdJdH",
    info: "cdsaec",
    guildLogo:
      "https://plus.unsplash.com/premium_photo-1680721444743-2a94a309a24a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: "llll",
    createdAt: "2024-01-05T14:59:03.536013",
    updatedAt: "2024-01-05T14:59:03.536013",
  },
  preset: {
    id: 1,
    presetType: "post",
    pageType: "guild",
    ownerId: "user_2YXCmSzpGrwkFYlFbhh79csdJdH",
    guildId: 5,
    backgroundColor: "lightblue",
    textColor: "white",
    userTitleColor: "blue",
    customSetting: [],
    createdAt: "2024-01-05T10:04:05.382Z",
    updatedAt: "2024-01-05T10:04:05.382Z",
  },
};
const PostCardNew = () => {
  const {
    id,
    title,
    authorId,
    guildId,
    isGuild,
    content,
    guild,
    preset,
    createdAt,
    updatedAt,
    parentId,
    author,
  } = post;
  return (
    <div
      className="h-[11rem] max-h-[20rem] rounded-xl p-4 flex flex-col justify-start bg-card text-card-foreground shadow-sm mt-3 bg-slate-600"
      style={{ fontSize: "11px" }}
    >
      <div className="header flex justify-start items-center gap-1 ">
        <Link href={`/profile/${author?.id}`} className="flex  h-7 w-7">
          <Avatar className=" h-7 w-7">
            <AvatarImage src={author?.image} alt={`@${author?.username}`} />
            <AvatarFallback>{author.username}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col">
          <div className="flex gap-2 justify-between items-center">
            <p className="text-base -6 font-medium text-white">
              {author.name} uuuuwd
            </p>
            <p
              className="text-subtle-semibold text-muted-foreground order-last"
              style={{ fontSize: "7px" }}
            >
              {/* @ts-ignore */}
              {formatDistanceToNow(createdAt)} ago
            </p>
          </div>
          <p
            className="text-sm  font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150"
            style={{ fontSize: "7px" }}
          >
            @{author.username}
          </p>
        </div>
      </div>
      <div className="content  flex justify-start">
        <div className="w-[2rem] flex justify-center items-center my-auto">
          <GuildHoverCard  background={preset.backgroundColor} guild={guild}>
            <Avatar className=" h-4 w-4">
              <AvatarImage
                src={guild?.guildLogo || ""}
                alt={`@${author?.username}`}
              />
              <AvatarFallback>{author.username}</AvatarFallback>
            </Avatar>
          </GuildHoverCard>
        </div>
        <div className="w-full ">
          <EditorOutput content={content} isDetail={false} />
        </div>
      </div>
      <div className="footer  justify-start my-2 items-center flex py-1 w-full h-[1rem]">
        <div className="w-[2rem] gap-2 flex justify-center items-center my-auto"></div>
        <div className="">
          <Star height={15} />
        </div>
        <div className="">
          <MessageCircle height={15} />
        </div>
        <div className="">
          <Waypoints height={15} />
        </div>
      </div>
    </div>
  );
};

export default PostCardNew;
