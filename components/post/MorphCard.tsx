"use client";
import Image from "next/image";
import Link from "next/link";

import { cn, formatDateString } from "@/lib/utils";
import { Comment, Guild, Post, Preset, User } from "@/lib/db/schema";
import { formatDistanceToNow } from "date-fns";
import { useRef } from "react";
import EditorOutput from "../editior/EditorOutput";
import { ScrollArea } from "../ui/scroll-area";
// import DeleteThread from "../forms/DeleteThread";

interface PostComment extends Comment {
  author: User;
}
interface ExpendedPost extends Post {
  author: User;
  guild: Guild | null;
  comments: PostComment;
  preset?: Preset;
}
interface Props {
  post: ExpendedPost;
  isDetail: boolean;
}
function MorphCard({ post, isDetail = false }: Props) {
  const pRef = useRef<HTMLParagraphElement>(null);

  const {
    id,
    title,
    authorId,
    guildId,
    isGuild,
    content,
    guild,
    preset,
    comments,
    createdAt,
    updatedAt,
    parentId,
    author,
  } = post;
  return (
    <article
      className={`flex w-full flex-col rounded-xl   p-7 ${
        !preset?.backgroundColor ?? "bg-dark-2"
      }  my-1 ${!isDetail && "border"}`}
      style={{
        fontSize: "11px",
        background: preset?.backgroundColor,
        color: preset?.textColor || "whitesmoke",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="user_guild_image"
                fill
                className="cursor-pointer rounded-full"
              />
            </Link>

            <div className="thread-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <Link
              href={`/profile/${author.id}`}
              className={cn(
                "w-fit",
                isDetail && "flex justify-start items-center gap-2"
              )}
            >
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
              {isDetail && (
                <p className="text-subtle-medium text-gray-1">
                  posted - {formatDistanceToNow(createdAt)} ago
                </p>
              )}
            </Link>

            {isDetail ? (
              <ScrollArea className="h-[13rem] max-h-[25rem] w-full">
                <EditorOutput
                  isLoaded={false}
                  content={content}
                  isDetail={false}
                />
              </ScrollArea>
            ) : (
              <Link href={`posts/${id}`}>
                <div
                  className="mt-2   text-small-regular text-sm  max-h-48 w-full overflow-clip"
                  ref={pRef}
                >
                  <EditorOutput
                    isLoaded={false}
                    content={post.content}
                    isDetail={false}
                  />
                  {pRef.current?.clientHeight === 140 ? (
                    // blur bottom if content is too long
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-t rounded-sm from-gray-400 to-transparent"></div>
                  ) : null}
                </div>
              </Link>
            )}

            {!isDetail ? (
              <div className={` mt-5 flex flex-col gap-3`}>
                <div className="flex gap-3.5">
                  <Image
                    src="/assets/heart-gray.svg"
                    alt="heart"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                  {!isDetail && (
                    <Link href={`/posts/${id}`}>
                      <Image
                        src="/assets/reply.svg"
                        alt="heart"
                        width={24}
                        height={24}
                        className="cursor-pointer object-contain"
                      />
                    </Link>
                  )}
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
            ) : null}
          </div>
        </div>
      </div>
      {/* {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                  </p>
                </Link>
              )}  */}
      {/* <DeleteThread
          threadId={JSON.stringify(id)}
          currentUserId={currentUserId}
          authorId={author.id}
          parentId={parentId}
          isComment={isComment}
        />  */}
      {/* @ts-ignore */}
      {comments.length > 0 ? (
        <div className="ml-1 mt-3 flex items-center gap-2">
          {comments.forEach(({ comment, index }: any) => (
            <Image
              key={index}
              src={comment?.author.image}
              alt={`user_${index}`}
              width={24}
              height={24}
              className={`${
                index !== 0 && "-ml-5"
              } border-red-500 h-4 bg-white rounded-full object-cover`}
            />
          ))}
          <Link href={`/posts/${id}`}>
            <p className="mt-1 text-subtle-medium text-gray-1">
              {/* @ts-ignore */}
              {comments?.length} repl{comments?.length > 1 ? "ies" : "y"}
            </p>
          </Link>
        </div>
      ) : null}

      {guild && isGuild ? (
        <Link
          href={`/communities/${guild.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDistanceToNow(createdAt)}
            {guild && ` - ${guild.name} guild`}
          </p>
          {guild && guild.guildLogo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={guild.guildLogo}
              alt={guild.name}
              width={14}
              height={14}
              className="ml-1 rounded-full object-cover"
            />
          )}
        </Link>
      ) : (
        <></>
      )}
      {(!isGuild && !isDetail) || !isDetail ? (
        <p className="text-subtle-medium text-gray-1">
          posted - {formatDistanceToNow(createdAt)} ago
        </p>
      ) : null}
    </article>
  );
}

export default MorphCard;
