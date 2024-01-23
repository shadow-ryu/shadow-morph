import RightSidebar from "@/components/common/RSidebar";
import PostFeed from "@/components/post/PostFeed";
import Dashboard from "@/components/custom-ui/dashboard/Dashboard";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { fetchPosts } from "@/lib/db/quries";
// import { db } from "@/lib/db";
import { Comment, presets, users } from "@/lib/db/schema";
// import { posts, presets } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";

import { useState } from "react";
import { db } from "@/lib/db";
import MorphCard from "@/components/post/MorphCard";


const Page = async () => {
  const posts = await db.query.posts
    .findMany({
      with: {
        author: true,
        guild: true,
        comments: {
          // @ts-ignore
          author: true,
        },
      },
    })
    .then((payload) => {
      payload.map((post) => {
        post["totalComments"] = post["comments"]?.length;
        if (!post?.comments || !post?.comments.length) {
          return post;
        }

        let comments:any = post?.comments.slice(0, 2);
        comments.map(async (comment:any) => {
          const details = await db
            .select()
            .from(users)
            .where(eq(users.id, comment.authorId));
          comment["author"] = details[0]
          return comment;
        });
        post["comments"] = comments;
        return post;
      });
      return payload;
    });

  const fetchPresets = async ({
    id,
    key = "ownerId",
  }: {
    id: any;
    key: string;
  }) => {
     // @ts-ignore
    let [result] = await db.select().from(presets).where(sql`${presets[key]} = ${id}  `);
    return result;
  };

  // Use Promise.all to wait for all asynchronous operations to complete
  const finalData = await Promise.all(
    posts.map(async (post) => {
      if (post.isGuild && post.guildId) {
        post["preset"] = await fetchPresets({
          key: "guildId",
          id: post.guildId,
        });
      }
      return post;
    })
  );


  return (
    <main className=" w-full bg-dark-3">
      <div className=" flex flex-col items-center justify-start">
        <Tabs defaultValue="following" className="w-full  ">
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
            {/* <ScrollArea className="h-[42rem] flex flex-col col-span-2 mx-2 ">
              {finalData?.map((post, index) => {
                // 
                return <PostCardNew key={post.id + index} post={post} />;
              })}
            </ScrollArea> */}
          </TabsContent>
          <TabsContent
            value="following"
            className="border-none p-0 outline-none"
          >
            <div className="h-[42rem] flex  text-white flex-col col-span-2 mx-2 ">
              {finalData?.map((post, index) => {
                //@ts-ignore
                return (<MorphCard key={post.id} post={post} />);
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
};
export default Page;
