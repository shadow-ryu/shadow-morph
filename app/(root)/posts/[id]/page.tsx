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
import { Guild, Post, Preset, User, comments, posts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs";
import MorphCard from "@/components/post/MorphCard";
import { fetchUserById } from "@/lib/actions/user.actions";
import { ExpendedPost } from "@/types/types";
import CommentCard from "@/components/post/comment/comment";
interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { id } = params;
  // @ts-ignore
  const post: ExpendedPost = await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, id),

    with: {
      author: true,
      // @ts-ignore
      guild: true,
    },
  });
  if (!post || !id) {
    return notFound();
  }
   // @ts-ignore
  post["comments"] =
    (await db.query.comments.findMany({
      // @ts-ignore
      where: (comments, { eq }) => eq(comments.postId, id),
    })) || [];
  const fetchPresetDetails = async () => {
    // @ts-ignore
    post["preset"] = await fetchPresets({
      key: "guildId",
      id: post.guildId,
    });
  };
  if (post.isGuild && post.guildId) {
    fetchPresetDetails();
  }
  const user = await currentUser();
  let userInfo;
  if (user) {
    const data = (await fetchUserById(user.id));
    console.log(data,"hyug")
    // console.log(user)
    userInfo = data;
  }
  console.log(userInfo," userInfo")
  const { title, author, createdAt, content, comments, preset, guild } = post;

  return (
    <div className="w-full">

      {/*  @ts-ignore */}
      <MorphCard post={post} isDetail={true} />

      <div className="w-full mt-[1rem]">
        <div className="h-48 w-full rounded-md">
          {userInfo ? (
            <>
              <CreateComment
                userId={userInfo.id}
                postId={id}
                currentUserImg={userInfo.image || ""}
              />
            </>
          ) : (
            <div className="text-white">Login to reply to this post {JSON.stringify(userInfo)}</div>
          )}
          {comments?.length ? (
            <div className="text-white">
              {comments.map((childItem: any) => (
                <CommentCard
                  key={childItem.id}
                  id={childItem.id}
                  postId={childItem.postId}
                  content={childItem.content}
                  authorId={childItem.authorId}
                  // community={childItem.community}
                  createdAt={childItem.createdAt}
                  // comments={childItem.children}
                  isReply={childItem.isReply}
                  votes={undefined}               />
              ))}
            </div>
          ) : (
            <div className="">No postComments</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Page;
