"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { cn, formatDateString } from "@/lib/utils";
import { navigate } from "@/lib/actions/common.action";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import communityIcon from "@/public/assets/community.svg";
import { MoreVertical, Shield } from "lucide-react";
import EditorOutput from "../custom-ui/editior/EditorOutput";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { UserAvatar } from "../custom-ui/UserAvatar";
import GuildHoverCard from "./GuildHoverCard";

interface Props {
  post: {
    id: string;
    title: string;
    authorId: string;
    guildId: number;
    isGuild: boolean;
    content: string;
    guild?: any;
    preset?: any;
    createdAt: string;
    updatedAt: string;
    parentId: string | null;
    author: any;
  };
}

function PostCard({ post }: Props) {
  const pRef = useRef<HTMLParagraphElement>(null);
  const [loading, setLoading] = useState(true);
  console.log(post);
  const {
    id,
    title,
    authorId,
    guildId,
    isGuild,
    content,
    guild,
    preset,
    createdAt,
    updatedAt,
    parentId,
    author,
  } = post;
  useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);

  console.log(guild);
  if (!id || loading) {
    return null;
  }

  const handleClick = () => {
    navigate(`posts/${id}`);
  };

  const renderAuthorLink = () => (
    <Link href={`/profile/${author?.id}`} className="flex h-8 w-8">
      <UserAvatar user={author} />
    </Link>
  );

  return (
    <div
      className="flex flex-col my-1 w-full max-h-[50rem]  p-4  h-full min-h-[10rem] justify-center  rounded-xl items-start gap-2"
      style={{
        background: preset?.backgroundColor || "gray",
        color: preset?.textColor || "black",
      }}
    >
      <div className="flex gap-3 px-3 py-4 justify-between items-center h-8 w-full">
        <div className="flex gap-3 justify-center items-center">
          <div className=" justify-center flex gap-3 items-center">
            {renderAuthorLink()}
            {/* {renderGuildLink()} */}
          </div>
          <div className={`flex flex-col "" justify-start items-center`}>
            <div
              className="text-small-semibold"
              style={{
                color: preset?.userTitleColor || "black",
              }}
            >
              {author.username}
            </div>
            {isGuild ? (
              <Badge className="h-[1.1rem] text-small-semibold"
              style={{
                color: preset?.textColor  || "white",
              }} >
                {" "}
                <GuildHoverCard guild={guild} />
              </Badge>
            ) : null}
          </div>
        </div>
        <div className=" order-last">
          <Button variant={"ghost"} className="hover:bg-transparent">
            <MoreVertical height={25} width={20} />
          </Button>
        </div>
      </div>
      <Link href={`post/${id}`} className=" w-fit p-2 h-fit max-h-[15rem] ">
        <EditorOutput content={content} />
      </Link>
      <div className="tweet-info-counts  w-full flex-start justify-between  flex gap-1 ">
        <div className="flex justify-evenly  items-center ">
          <div className="comments flex mr-20">
            <svg
              className="feather feather-message-circle sc-dnqmqq jxshSx"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <div className="comment-count">33</div>
          </div>
          <div className="retweets flex mr-20">
            <svg
              className="feather feather-repeat sc-dnqmqq jxshSx"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="17 1 21 5 17 9"></polyline>
              <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
              <polyline points="7 23 3 19 7 15"></polyline>
              <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
            </svg>
            <div className="retweet-count">397</div>
          </div>
          <div className="likes flex mr-20">
            <svg
              className="feather feather-heart sc-dnqmqq jxshSx"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <div className="likes-count">2.6k</div>
          </div>
          <div className="message">
            <svg
              className="feather feather-send sc-dnqmqq jxshSx"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>
        </div>

        <p className="text-subtle-semibold text-muted-foreground order-last">
          {/* @ts-ignore */}
          {formatDistanceToNow(createdAt)} ago
        </p>
      </div>
    </div>
  );
}

export default PostCard;
