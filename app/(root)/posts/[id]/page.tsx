import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ArrowBigDown, ArrowBigUp, Loader, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { fetchPostById } from "@/lib/actions/post.actions";
import EditorOutput from "@/components/editior/EditorOutput";
import Dashboard from "@/components/custom-ui/dashboard/Dashboard";
import RightSidebar from "@/components/common/RSidebar";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateComment from "@/components/post/comment/CreateComment";
import { Separator } from "@/components/ui/separator";
import { fetchPresets } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs";
interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { id } = params;
  const post = await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, id),

    with: {
      author: true,
      guild: true,
    },
  });
  if (!post || !id) {
    return notFound();
  }

  post["comments"] =
    (await db.select().from(posts).where(eq(posts.parentId, id))) || [];
  const fetchPresetDetails = async () => {
    post["preset"] = await fetchPresets({
      key: "guildId",
      id: post.guildId,
    });
  };
  if (post.isGuild && post.guildId) {
    fetchPresetDetails();
  }
  const user = await currentUser();

  const { title, author, createdAt, content, comments, preset, guild } = post;

  return (
    <div
      style={{ background: "black", color: "whitesmoke" }}
      className="w-full h-full px-2 flex flex-col items-center justify-between gap-3 sm:block "
    >
      <div className="w-full flex flex-col gap-5 flex-1 p-4 rounded-sm">
        <div className="header text-white flex justify-start items-center gap-3 ">
          {/* @ts-ignore */}
          <Link href={`/profile/${author?.id}`} className="flex h-7 w-7">
            <Avatar className="h-9 w-9">
              {/* @ts-ignore */}

              <AvatarImage src={author?.image} alt={`@${author?.username}`} />
              {/* @ts-ignore */}

              <AvatarFallback>{author?.username}</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <div className="flex gap-2 justify-between items-center">
              {/* @ts-ignore */}

              <p className="text-base-6 font-medium">{author?.name}</p>
              <p
                className="text-subtle-semibold text-muted-foreground order-last"
                style={{ fontSize: "8px" }}
              >
                {formatDistanceToNow(createdAt)} ago
              </p>
            </div>
            <p
              className="text-sm font-medium transition ease-in-out duration-150"
              style={{ fontSize: "8px" }}
            >
              {/* @ts-ignore */}
              @{author?.username}
            </p>
          </div>
        </div>
        <h1 className="text-xl font-semibold py-2 leading-6">{title}</h1>
        <div className=" hidden  h-[12rem] max-h-[30rem] lg:mb-[2rem] lg:block">
          <EditorOutput content={content} isDetail={true} />
        </div>
        <ScrollArea className=" block  h-[12rem] max-h-[25rem] lg:hidden">
          <EditorOutput content={content} isDetail={true} />
        </ScrollArea>
      </div>
      <div className="w-full mt-[1rem]">
        <Separator className="text-white w-full my-2 h-1" />
        <ScrollArea className="h-72 w-full rounded-md">
          {user?.id ? (
            <>
              <CreateComment postId={id} />
              <Separator className="text-white w-full my-2 h-1" />
            </>
          ) : (
            <>Login to reply to this post</>
          )}
          {comments?.length ? <></> : <div className="">No comments</div>}
        </ScrollArea>
      </div>
    </div>
  );
};
export default Page;
