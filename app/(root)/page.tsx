"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import RightSidebar from "@/components/common/RSidebar";
import PostFeed from "@/components/custom-ui/PostFeed";
import Dashboard from "@/components/custom-ui/dashboard/Dashboard";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { fetchPosts } from "@/lib/db/quries";
import { db } from "@/lib/db";
import { presets } from "@/lib/db/schema";
// import { posts, presets } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { ChevronsUpDown, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

import PostCardNew from "@/components/cards/PostCardNew";
const Page = () => {
  // const posts = await db.query.posts.findMany({
  //   // Use 'with' to include related data
  //   with: {
  //     author: true,
  //     guild: true,
  //   },
  // });

  // const fetchPresets = async ({
  //   id,
  //   key = "ownerId",
  // }: {
  //   id: any;
  //   key: string;
  // }) => {
  //   let [result] = await db
  //     .select()
  //     .from(presets)
  //     // @ts-ignore
  //     .where(sql`${presets[key]} = ${id}  `);
  //   return result;
  // };

  // Use Promise.all to wait for all asynchronous operations to complete
  // const finalData = await Promise.all(
  //   posts.map(async (post) => {
  //     if (post.isGuild && post.guildId) {
  //       post["preset"] = await fetchPresets({
  //         key: "guildId",
  //         id: post.guildId,
  //       });
  //     }
  //     return post;
  //   })
  // );

  let finalData = [
    {
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
                  url:
                    "https://avatars.githubusercontent.com/u/67259992?v=4?s=400",
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
        guildLogo: null,
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
    },
    {
      id: 14,
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
                  url:
                    "https://avatars.githubusercontent.com/u/67259992?v=4?s=400",
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
        guildLogo: null,
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
        backgroundColor: "purple",
        textColor: "white",
        userTitleColor: "blue",
        customSetting: [],
        createdAt: "2024-01-05T10:04:05.382Z",
        updatedAt: "2024-01-05T10:04:05.382Z",
      },
    },
    {
      id: 15,
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
                  url:
                    "https://avatars.githubusercontent.com/u/67259992?v=4?s=400",
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
          "https://cdn.pixabay.com/photo/2023/12/28/14/09/cat-8474233_1280.png",
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
        backgroundColor:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
        textColor: "white",
        userTitleColor: "pink",
        customSetting: [],
        createdAt: "2024-01-05T10:04:05.382Z",
        updatedAt: "2024-01-05T10:04:05.382Z",
      },
    },
    {
      id: 16,
      title: "new2",
      authorId: "user_2YXCmSzpGrwkFYlFbhh79csdJdH",
      guildId: null,
      isGuild: false,
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
                  url:
                    "https://avatars.githubusercontent.com/u/67259992?v=4?s=400",
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
    },
  ];
  const [feedType, setFeedType] = useState("all");
  return (
    <main className="h-full w-full bg-dark-3">
      <Dashboard
        navCollapsedSize={3}
        noOFSections={[10, 60, 20]}
        thirdSection={<RightSidebar />}
      >
        <div className=" h-full w-full flex flex-col items-center justify-start">
          <Tabs defaultValue="trending" className="h-full  w-full ">
            <div className="space-between w-full justify-between gap-2 flex items-center px-2 my-1">
              <div className="">Feed</div>

              <TabsList
                className="h-8 p-2 flex-end "
                style={{ fontSize: "9px" }}
              >
                <TabsTrigger value="trending" className="relative  rounder-md">
                  Trending
                </TabsTrigger>
                <TabsTrigger value="following" className="rounder-md">
                  Following
                </TabsTrigger>
                {/* <TabsTrigger value="" disabled>
                  Trending
                </TabsTrigger> */}
              </TabsList>
            </div>
            <Separator />
            <TabsContent
              value="trending"
              className="border-none p-0 outline-none"
            >
              <ScrollArea className="h-[95vh] flex flex-col col-span-2 mx-2 ">
                {finalData?.map((post, index) => {
                  // @ts-ignore
                  return <PostCardNew key={post.id + index} post={post} />;
                })}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </Dashboard>
    </main>
  );
};
export default Page;
