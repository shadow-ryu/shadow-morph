import ThreadCard from "@/components/cards/PostCard";
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
import { Search } from "lucide-react";
const Page = async () => {
  // const posts = await db.query.posts.findMany({
  //   // Use 'with' to include related data
  //   with: {
  //     author: true,
  //     guild: true,
  //   },
  // });

  const fetchPresets = async ({
    id,
    key = "ownerId",
  }: {
    id: any;
    key: string;
  }) => {
    let [result] = await db
      .select()
      .from(presets)
      // @ts-ignore
      .where(sql`${presets[key]} = ${id}  `);
    return result;
  };

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
  console.log(finalData);

  console.log(finalData, "result");
  return (
    <main className="h-screen w-full bg-dark-3">
      <Dashboard
        navCollapsedSize={3}
        noOFSections={[10, 60, 20]}
        thirdSection={<RightSidebar />}
      >
        <Tabs defaultValue="all">
          <div className="flex items-center px-4 py-2">
            <h1 className="text-xl font-bold text-gray-50  font-serif">Feed</h1>
            <TabsList className="ml-auto">
              <TabsTrigger
                value="all"
                className="text-zinc-600 dark:text-zinc-200"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="following"
                className="text-zinc-600 dark:text-zinc-200"
              >
                Following
              </TabsTrigger>
            </TabsList>
          </div>
          <Separator />
          <div className="bg-background/95 p-1 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <form>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-8" />
              </div>
            </form>
          </div>
          <TabsContent value="all" className="m-0 my-1">
            {/* <PostFeed initialPosts={finalaleData}/> */}

            <ScrollArea className="h-[90vh] flex flex-col col-span-2 space-y-6 m-2">
              {finalData?.map((post, index) => {
                // const votesAmt = post.votes.reduce((acc, vote) => {
                //   if (vote.type === "UP") return acc + 1;
                //   if (vote.type === "DOWN") return acc - 1;
                //   return acc;
                // }, 0);
                // let data= JSON.parse(post?.value)
                // consol   e.log(post, "ff");
                // const currentVote = post.votes.find(
                //   (vote) => vote.userId === session?.user.id
                // );
                // if (posts.length - 1 === index) {
                //   return (
                //     <li key={post.id} ref={ref}>
                //       <Post
                //         post={post}
                //         commentAmt={post.comments.length}
                //         subredditName={post.subreddit.name}
                //         votesAmt={votesAmt}
                //         currentVote={currentVote}
                //       />
                //     </li>
                //   );
                // }
                return (
                  // @ts-ignore
                  <div className="" key={post.id}>
                    {/* @ts-ignore */}
                    <ThreadCard post={post} />
                    <Separator className="my-2 h-1" />
                  </div>
                  // <div key={post.id} className="text-white h-18 border-red-700 bg-gray-600" ref={ref}>{JSON.stringify(post)}</div>
                );
              })}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="following" className="m-0"></TabsContent>
        </Tabs>
      </Dashboard>
    </main>
  );
};
export default Page;
