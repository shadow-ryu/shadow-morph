"use client";
// import { ExtendedPost } from "@/types/client-de";
import React, { useEffect, useRef } from "react";

// import { useIntersection } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useInView } from "react-intersection-observer";
// import Post from "./Post";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface PostFeeedProps {
  subredditName?: string;
  initialPosts?: object[];
}
const PostFeed = ({ subredditName, initialPosts }: PostFeeedProps) => {
  const { ref, inView } = useInView();
  const INFINITE_SCROLL_PAGINATION_RESULTS =
    process.env["INFINITE_SCROLL_PAGINATION_RESULTS"] || 4;

  return (
    // <ScrollArea className="min-h-screen h-full">
    <ul className=" min-h-screen h-ful flex flex-col col-span-2 space-y-6">
      {initialPosts?.map((post, index) => {
        // const votesAmt = post.votes.reduce((acc, vote) => {
        //   if (vote.type === "UP") return acc + 1;
        //   if (vote.type === "DOWN") return acc - 1;
        //   return acc;
        // }, 0);

        console.log(post, "ff");
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
            {/* <ThreadCard post={post} /> */}
          </div>
          // <div key={post.id} className="text-white h-18 border-red-700 bg-gray-600" ref={ref}>{JSON.stringify(post)}</div>
        );
      })}
    </ul>
  );
};

export default PostFeed;
