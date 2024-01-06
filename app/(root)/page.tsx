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
  const posts = await db.query.posts.findMany({
    // Use 'with' to include related data
    with: {
      author: true,
      guild: true,
    },
  });

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

            <ScrollArea className="h-screen">
              <ul className="flex flex-col col-span-2 space-y-6">
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
                      <ThreadCard post={post} finalaleData={finalData} />
                    </div>
                    // <div key={post.id} className="text-white h-18 border-red-700 bg-gray-600" ref={ref}>{JSON.stringify(post)}</div>
                  );
                })}
              </ul>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="following" className="m-0"></TabsContent>
        </Tabs>
      </Dashboard>
    </main>
  );
};
export default Page;
