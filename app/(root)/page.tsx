// import RightSidebar from "@/components/common/RSidebar";
// import PostFeed from "@/components/custom-ui/PostFeed";
// import Dashboard from "@/components/custom-ui/dashboard/Dashboard";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { fetchPosts } from "@/lib/db/quries";
import { db } from "@/lib/db";
import { posts, presets } from "@/lib/db/schema";
import { sql } from "drizzle-orm";
import { Search } from "lucide-react";
const Page = async () => {
  // const data = awai,t db.query.posts.findMany({});
  // console.log(data, "");


  const postsD = await db.query.posts.findMany({
    // Use 'with' to include related data
    with: {
      author: true,
      guild: true,
    },
  }).then(async (data) => {
    // Map through the retrieved posts
    let newData = await Promise.all(data.map(async (post) => {
      // Create a copy of the post data
      let dataCopy = { ...post };
  
      // Check if it's a guild post and has a guildId
      if (post.isGuild && post.guildId) {
        // Perform another query using db.select and presets
        const [res] = await db.select().from(presets).where(
          sql`${presets.guildId} = ${post.guildId}  and ${presets.presetType}="post"`
        );
  
        // Do something with the result 'res'
        // For example, you can update 'dataCopy' with the result
        dataCopy.presets = res;
      }else{
        const [res] = await db.select().from(presets).where(
          sql`  ${presets.ownerId} = ${post.authorId} and ${presets.presetType}='post'`
        );
  
        // Do something with the result 'res'
        // For example, you can update 'dataCopy' with the result
        dataCopy.presets = res;
       
      }
  
      // Return the updated data
      return dataCopy;
    }));
   return newData
  });
  console.log(postsD,"fff")

  return (
    <main className="h-screen w-full bg-dark-3">
      {/* <Dashboard
        navCollapsedSize={3}
        noOFSections={[10,60,20]}
        thirdSection={<RightSidebar/>}
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
           <PostFeed/>
          </TabsContent>
          <TabsContent value="following" className="m-0"></TabsContent>
        </Tabs>
      </Dashboard> */}
    </main>
  );
};
export default Page;
