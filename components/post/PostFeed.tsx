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
import MorphCard from "./MorphCard";

interface PostFeeedProps {
  subredditName?: string;
  initialPosts?: object[];
}
const PostFeed = ({ initialPosts }: PostFeeedProps) => {
  const { ref, inView } = useInView();
  const INFINITE_SCROLL_PAGINATION_RESULTS =
    process.env["INFINITE_SCROLL_PAGINATION_RESULTS"] || 4;

  return (
    <ScrollArea className="h-[42rem] px-3">
      {initialPosts?.map((post, index) => {
        //@ts-ignore
        return <MorphCard key={post.id} post={post} />;
      })}
    </ScrollArea>
  );
};

export default PostFeed;
