"use client";
import Link from "next/link";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { cn, formatDateString } from "@/lib/utils";
import { useRef } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import EditorOutput from "../custom-ui/editior/EditorOutput";

// import DeleteThread from "../forms/DeleteThread";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}

function PostCard({ post,finalaleData }: any) {
  const pRef = useRef<HTMLParagraphElement>(null);
  console.log(post)
  if (!post) return <></>;
  // let nePost = JSON.parse(post.value);
  const {
    id,
    title,
    authorId,
    guildId,
    isGuild,
    content,
    preset:presets,
    createdAt,
    updatedAt,
    parentId,
    author,
  } = post;
  // console.log(, "post");
  // if (isGuild) {
  // }
  const returnValuePreset = ({
    value,
    defaultValue,
  }: {
    value: string;
    defaultValue: string;
  }) => {
    console.log(value === null || value === "" ? defaultValue : value);
    return value === null || value === "" ? defaultValue : value;
  };
  return (
    <article
      className={`flex w-full flex-col rounded-xl `}
      style={{
        background: presets?.backgroundColor||"gray",

        color: presets?.textColor||"white",
      }}
    >
     
    
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            {author ? (
              <Link
                href={`/profile/${author?.id}`}
                className="relative h-11 w-11"
              >
                <Image
                  src={author.image}
                  alt="user_community_image"
                  fill
                  className="cursor-pointer rounded-full"
                />
              </Link>
            ) : (
              ""
            )}

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author?.id}`} className="w-fit">
              <h4
                className="cursor-pointer text-base-semibold"
                style={{
                  color: `${returnValuePreset({
                    value: presets?.userTitleColor,
                    defaultValue: "white",
                  })}`,
                }}
              >
                {author?.username}
              </h4>
            </Link>
            <div
              className="relative text-sm max-h-40 w-full overflow-clip"
              ref={pRef}
            >
              <EditorOutput content={content} />
              {pRef.current?.clientHeight === 160 ? (
                // blur bottom if content is too long
                <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
              ) : null}
            </div>
            <div className={`$ && "mb-10"} mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <Image
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        /> */}
      </div>

      {/* {!isComment && comments.length > 0 && (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.slice(0, 2).map((comment, index) => (
            <Image
              key={index}
              src={comment.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
            />
          ))}

          <Link href={`/thread/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {comments.length} repl{comments.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      )}

      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)}
            {community && ` - ${community.name} Community`}
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )} */}
    </article>
  );
}

export default PostCard;
