"use client";
import React, { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { UserAvatar } from "../custom-ui/UserAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { formatDistanceToNow } from "date-fns";
import EditorOutput from "../editior/EditorOutput";
import {
  BookMarked,
  Bookmark,
  ChefHat,
  CloudFog,
  Command,
  Heart,
  ListChecksIcon,
  MessageCircle,
  Save,
  Share2Icon,
  Star,
  Waypoints,
} from "lucide-react";
import GuildHoverCard from "../common/GuildHoverCard";

const PostCardNew = ({ post, height }: { post: any; height?: any }) => {
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
  const pRef = useRef<HTMLParagraphElement>(null);
  let minifiedContent;


  return (
    <div
      className="min-h-[12rem]  min-w-full max-h-[25rem] rounded-xl px-4 pt-4 pb-1 flex flex-col justify-start bg-card  shadow-sm mt-3 "
      style={{
        fontSize: "11px",
        background: preset?.backgroundColor || "#7a7db8",
        color: preset?.textColor || "whitesmoke",
      }}
    >
      <div className="header flex justify-start items-center gap-1 ">
        <Link href={`/profile/${author?.id}`} className="flex  h-7 w-7">
          <Avatar className=" h-7 w-7">
            <AvatarImage src={author?.image} alt={`@${author?.username}`} />
            <AvatarFallback>{author?.username}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col">
          <div className="flex gap-2 justify-between items-center">
            <p
              className="text-base -6 font-medium "
              style={{
                color: preset?.userTitleColor || "lightgoldenrodyellow",
              }}
            >
              {author?.name}
            </p>
            <p
              className="text-subtle-semibold text-muted-foreground order-last"
              style={{ fontSize: "7px" }}
            >
              {/* @ts-ignore */}
              {formatDistanceToNow(createdAt)} ago
            </p>
          </div>
          <p
            className="text-sm  font-medium  group-hover:text-gray-300 transition ease-in-out duration-150"
            style={{
              fontSize: "7px",
              color: preset?.userTitleColor || "lightgray",
            }}
          >
            @{author?.username}
          </p>
        </div>
      </div>
      <Link
        href={`posts/${id}`}
        className="content  w-full flex-col flex gap-2  items-start justify-center"
      >
        <div className="flex w-full justify-start">
          <div className="w-[2rem] flex justify-center items-center my-auto">
            {isGuild ? (
              <GuildHoverCard preset={preset} guild={guild}>
                <Avatar className=" h-5 w-5 border-destructive border-2">
                  <AvatarImage
                    src={guild?.guildLogo || ""}
                    alt={`@${author?.username}`}
                  />
                  <AvatarFallback>{author.username}</AvatarFallback>
                </Avatar>
              </GuildHoverCard>
            ) : null}
          </div>
          <div
            className="relative text-sm  max-h-48 w-full overflow-clip"
            ref={pRef}
          >
            <EditorOutput isLoaded={false} content={post.content} isDetail={false} />
            {pRef.current?.clientHeight === 140 ? (
              // blur bottom if content is too long
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-t rounded-sm from-gray-400 to-transparent"></div>
            ) : null}
          </div>
        </div>
        {pRef.current?.clientHeight || 0 > 160 ? (
          <Link
            href={`post/${id}`}
            className="text-white  ml-[3.5%] text-clip "
          >
            {" "}
            show more
          </Link>
        ) : (
          ""
        )}
      </Link>
      <div className={`text-white flex justify-evenly w-10/12  mx-auto `}>
        <div
          className="flex items-center space-x-1 group"
          // onClick={(e) => {
          //   e.stopPropagation();
          //   setPostId(id);
          //   setIsOpen(true);
          // }}
        >
          <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
            {/* <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" /> */}
            <MessageCircle className="h-4 group-hover:text-[#1d9bf0]" />
          </div>
          {/* {comments.length > 0 && ( */}
          <span className="group-hover:text-[#1d9bf0] text-sm">
            {/* {comments.length} */} 5
          </span>
          {/* )} */}
        </div>

        {/* {session.user.uid === post?.id ? (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, "posts", id));
                router.push("/");
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-4 group-hover:text-red-600" />
              </div>
            </div>
          ) : ( */}
        {/* <div className="flex items-center space-x-1 group">
          <div className="icon group-hover:bg-green-500/10">
            <SwitchHorizontal className="h-4 group-hover:text-green-500" />
          </div>
        </div> */}
        {/* )} */}

        <div
          className="flex items-center space-x-1 group"
          // onClick={(e) => {
          //   e.stopPropagation();
          //   likePost();
          // }}
        >
          <div className="icon group-hover:bg-pink-600/10">
            {/* {liked ? (
                <HeartIconFilled className="h-4 text-pink-600" />
              ) : (
             
              )} */}
            <Heart className="h-4 group-hover:text-pink-600" />
          </div>
          {/* {likes.length > 0 && ( */}
          <span
            // liked && "text-pink-600"
            className={`group-hover:text-pink-600 text-sm `}
          >
            {/* {likes.length} */} 20
          </span>
          {/* )} */}
        </div>

        <div className="icon group">
          {/* <ShareIcon className="h-4 group-hover:text-[#1d9bf0]" /> */}
          <Share2Icon className="h-4 group-hover:text-[#1d9bf0]" />
        </div>
        <div className="flex items-center space-x-1 group">
          <div className="icon group-hover:bg-green-500/10">
            <Bookmark className="h-4 group-hover:text-green-500" />
          </div>
        </div>
        <div className="icon group">
          {/* <ChartBarIcon className="h-4 group-hover:text-[#1d9bf0]" /> */}
        </div>
      </div>
    </div>
  );
};

export default PostCardNew;
