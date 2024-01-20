"use client";

import RightSidebar from "@/components/common/RSidebar";
import PostFeed from "@/components/post/PostFeed";
import Dashboard from "@/components/custom-ui/dashboard/Dashboard";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { fetchPosts } from "@/lib/db/quries";
// import { db } from "@/lib/db";
import { presets } from "@/lib/db/schema";
// import { posts, presets } from "@/lib/db/schema";
import { sql } from "drizzle-orm";

import { useState } from "react";

import PostCardNew from "@/components/post/PostCardNew";
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
          {
            id: "TcUNySG15P",
            type: "paragraph",
            data: {
              text: `Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc. Each of them is an independent <sup data-tune="footnotes">1</sup> contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.`,
            },
            tunes: {
              footnotes: [
                "It works more stable then in other WYSIWYG editors. Same time it has smooth and well-known arrow navigation behavior like classic editors.",
              ],
            },
          },
          {
            id: "M3UXyblhAo",
            type: "header",
            data: {
              text: "What does it mean clean data output?",
              level: 3,
            },
          },
          {
            id: "KOcIofZ3Z1",
            type: "paragraph",
            data: {
              text: `There are dozens of ready-to-use Blocks and a simple API <sup data-tune="footnotes">2</sup> for creating any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA buttons, and even games.`,
            },
            tunes: {
              footnotes: [
                "Just take a look at our Creating Block Tool guide. You'll be surprised.",
              ],
            },
          },
          {
            id: "ksCokKAhQw",
            type: "paragraph",
            data: {
              text: `Classic WYSIWYG editors produce raw HTML-markup with both content data and content appearance. On the contrary, <mark class="cdx-marker">Editor.js outputs JSON object</mark> with data of each Block.`,
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
      title: "tester",
      authorId: "user_2YXCmSzpGrwkFYlFbhh79csdJdH",
      guildId: null,
      isGuild: false,
      content: {
        time: 1705048369376,
        blocks: [
          {
            id: "mhTl6ghSkV",
            type: "paragraph",
            data: {
              text:
                "Hey. Meet the new Editor. On this picture you can see it in action. Then, try a demo 🤓",
            },
          },
          {
            id: "l98dyx3yjb",
            type: "header",
            data: {
              text: "Key features",
              level: 3,
            },
          },
          {
            id: "os_YI4eub4",
            type: "list",
            data: {
              type: "unordered",
              items: [
                "It is a block-style editor",
                "It returns clean data output in JSON",
                `Designed to be extendable and pluggable with a <a href="https://editorjs.io/creating-a-block-tool">simple API</a>`,
              ],
            },
          },
          {
            id: "1yKeXKxN7-",
            type: "header",
            data: {
              text: "What does it mean «block-styled editor»",
              level: 3,
            },
          },
          {
            id: "TcUNySG15P",
            type: "paragraph",
            data: {
              text: `Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc. Each of them is an independent <sup data-tune="footnotes">1</sup> contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.`,
            },
            tunes: {
              footnotes: [
                "It works more stable then in other WYSIWYG editors. Same time it has smooth and well-known arrow navigation behavior like classic editors.",
              ],
            },
          },
          {
            id: "M3UXyblhAo",
            type: "header",
            data: {
              text: "What does it mean clean data output?",
              level: 3,
            },
          },
          {
            id: "KOcIofZ3Z1",
            type: "paragraph",
            data: {
              text: `There are dozens of ready-to-use Blocks and a simple API <sup data-tune="footnotes">2</sup> for creating any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA buttons, and even games.`,
            },
            tunes: {
              footnotes: [
                "Just take a look at our Creating Block Tool guide. You'll be surprised.",
              ],
            },
          },
          {
            id: "ksCokKAhQw",
            type: "paragraph",
            data: {
              text: `Classic WYSIWYG editors produce raw HTML-markup with both content data and content appearance. On the contrary, <mark class="cdx-marker">Editor.js outputs JSON object</mark> with data of each Block.`,
            },
          },
          {
            id: "XKNT99-qqS",
            type: "attaches",
            data: {
              file: {
                url: "https://drive.google.com/user/catalog/my-file.pdf",
                size: 12902,
                name: "file.pdf",
                extension: "pdf",
              },
              title: "My file",
            },
          },
          {
            id: "7RosVX2kcH",
            type: "paragraph",
            data: {
              text:
                "Given data can be used as you want: render with HTML for Web clients, render natively for mobile apps, create the markup for Facebook Instant Articles or Google AMP, generate an audio version, and so on.",
            },
          },
          {
            id: "eq06PsNsab",
            type: "paragraph",
            data: {
              text:
                "Clean data is useful to sanitize, validate and process on the backend.",
            },
          },
          {
            id: "hZAjSnqYMX",
            type: "image",
            data: {
              file: {
                url: "",
              },
              withBorder: false,
              withBackground: false,
              stretched: true,
              caption: "CodeX Code Camp 2019",
            },
          },
        ],
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
    <main className=" bg-dark-3">
      <div className=" flex flex-col items-center justify-start">
        <Tabs defaultValue="trending" className="h-full  w-full ">
          <div className="space-between w-full justify-between gap-2 flex items-center px-2 my-1">
            <div className="">Feed</div>

            <TabsList className="h-8 p-2 flex-end " style={{ fontSize: "9px" }}>
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
            <ScrollArea className="h-[42rem] flex flex-col col-span-2 mx-2 ">
              {finalData?.map((post, index) => {
                // @ts-ignore
                return <PostCardNew key={post.id + index} post={post} />;
              })}
            </ScrollArea>
          </TabsContent>
          <TabsContent
            value="following"
            className="border-none p-0 outline-none"
          >
            <ScrollArea className="h-[42rem] flex flex-col col-span-2 mx-2 ">
              {finalData?.map((post, index) => {
                // @ts-ignore
                return <PostCardNew key={post.id + index} post={post} />;
              })}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};
export default Page;
