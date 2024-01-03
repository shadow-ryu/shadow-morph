"use client"
import Link from "next/link";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { cn, formatDateString } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { useRef } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

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
const item = {
  id: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
  name: "William Smith",
  email: "williamsmith@example.com",
  subject: "Meeting Tomorrow",
  author: {
    name: "John Doe",
    image:
      "https://images.pexels.com/photos/19477280/pexels-photo-19477280/free-photo-of-a-man-walking-on-the-beach-with-a-surfboard.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    id: "author123",
  },
  text:
    "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share. It's crucial that we align on our next steps to ensure the project's success.\n\nPlease come prepared with any questions or insights you may have. Looking forward to our meeting!\n\nBest regards, William",
  date: "2023-10-22T09:00:00",
  read: true,
  labels: ["meeting", "work", "important"],
  comments: [
    {
      author: {
        image:
          "https://images.pexels.com/photos/18897882/pexels-photo-18897882/free-photo-of-man-standing-on-a-boat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    },
    {
      author: {
        image:
          "https://images.pexels.com/photos/18897882/pexels-photo-18897882/free-photo-of-man-standing-on-a-boat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    },
    {
      author: {
        image:
          "https://images.pexels.com/photos/18897882/pexels-photo-18897882/free-photo-of-man-standing-on-a-boat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    },
    {
      author: {
        image:
          "https://images.pexels.com/photos/18897882/pexels-photo-18897882/free-photo-of-man-standing-on-a-boat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    },
    {
      author: {
        image:
          "https://images.pexels.com/photos/18897882/pexels-photo-18897882/free-photo-of-man-standing-on-a-boat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    },
    {
      author: {
        image:
          "https://images.pexels.com/photos/18897882/pexels-photo-18897882/free-photo-of-man-standing-on-a-boat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    },
    {
      author: {
        image:
          "https://images.pexels.com/photos/18897882/pexels-photo-18897882/free-photo-of-man-standing-on-a-boat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    },
    {
      author: {
        image:
          "https://images.pexels.com/photos/18897882/pexels-photo-18897882/free-photo-of-man-standing-on-a-boat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    },
    {
      author: {
        image:
          "https://images.pexels.com/photos/18897882/pexels-photo-18897882/free-photo-of-man-standing-on-a-boat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    },
    {
      author: {
        image:
          "https://images.pexels.com/photos/18897882/pexels-photo-18897882/free-photo-of-man-standing-on-a-boat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      },
    },
  ],
  isComment: false,
};
function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) {
  const pRef = useRef<HTMLParagraphElement>(null);
  return (
    // <article
    //   className={`flex w-full flex-col rounded-xl ${
    //     isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
    //   }`}
    // >
    //   <div className='flex items-start justify-between'>
    //     <div className='flex w-full flex-1 flex-row gap-4'>
    //       <div className='flex flex-col items-center'>
    //         <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
    //           <Image
    //             src={author.image}
    //             alt='user_community_image'
    //             fill
    //             className='cursor-pointer rounded-full'
    //           />
    //         </Link>

    //         <div className='thread-card_bar' />
    //       </div>

    //       <div className='flex w-full flex-col'>
    //         <Link href={`/profile/${author.id}`} className='w-fit'>
    //           <h4 className='cursor-pointer text-base-semibold text-light-1'>
    //             {author.name}
    //           </h4>
    //         </Link>

    //         <p className='mt-2 text-small-regular text-light-2'>{content}</p>

    //         <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
    //           <div className='flex gap-3.5'>
    //             <Image
    //               src='/assets/heart-gray.svg'
    //               alt='heart'
    //               width={24}
    //               height={24}
    //               className='cursor-pointer object-contain'
    //             />
    //             <Link href={`/thread/${id}`}>
    //               <Image
    //                 src='/assets/reply.svg'
    //                 alt='heart'
    //                 width={24}
    //                 height={24}
    //                 className='cursor-pointer object-contain'
    //               />
    //             </Link>
    //             <Image
    //               src='/assets/repost.svg'
    //               alt='heart'
    //               width={24}
    //               height={24}
    //               className='cursor-pointer object-contain'
    //             />
    //             <Image
    //               src='/assets/share.svg'
    //               alt='heart'
    //               width={24}
    //               height={24}
    //               className='cursor-pointer object-contain'
    //             />
    //           </div>

    //         </div>
    //       </div>
    //     </div>

    //     {/* <DeleteThread
    //       threadId={JSON.stringify(id)}
    //       currentUserId={currentUserId}
    //       authorId={author.id}
    //       parentId={parentId}
    //       isComment={isComment}
    //     /> */}
    //   </div>

    //   {!isComment && comments.length > 0 && (
    //     <div className='ml-1 mt-3 flex items-center gap-2'>
    //       {comments.slice(0, 2).map((comment, index) => (
    //         <Image
    //           key={index}
    //           src={comment.author.image}
    //           alt={`user_${index}`}
    //           width={24}
    //           height={24}
    //           className={`${index !== 0 && "-ml-5"} rounded-full object-cover`}
    //         />
    //       ))}

    //       <Link href={`/thread/${id}`}>
    //         <p className='mt-1 text-subtle-medium text-gray-1'>
    //           {comments.length} repl{comments.length > 1 ? "ies" : "y"}
    //         </p>
    //       </Link>
    //     </div>
    //   )}

    //   {!isComment && community && (
    //     <Link
    //       href={`/communities/${community.id}`}
    //       className='mt-5 flex items-center'
    //     >
    //       <p className='text-subtle-medium text-gray-1'>
    //         {formatDateString(createdAt)}
    //         {community && ` - ${community.name} Community`}
    //       </p>

    //       <Image
    //         src={community.image}
    //         alt={community.name}
    //         width={14}
    //         height={14}
    //         className='ml-1 rounded-full object-cover'
    //       />
    //     </Link>
    //   )}
    // </article>
    <button
      key={item.id}
      className={cn(
        "flex flex-col relative items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all text-gray-100 hover:text-black hover:bg-gray-700"
        // mail.selected === item.id && "bg-muted"
      )}
      // style={{
      //   border:
      //     "10px solid ",
      //     borderColor:"linear-gradient(45deg, #fff , #fff 10px, #3C7AB8 0, #3C7AB8 20px, #fff 0, #fff 30px, #CB2C4B 0, #CB2C4B 40px) !important"
      // }}

      onClick={
        () => {}
        // setMail({
        //   ...mail,
        //   selected: item.id,
        // })
      }
    >
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <Link
              href={`/profile/${item?.author.id}`}
              className="relative flex  justify-start gap-2 items-center"
            >
              <Avatar>
                <AvatarImage
                  className=" object-cover"
                  height={40}
                  width={40}
                  src={item?.author.image}
                  alt={`@${item?.author.name}`}
                />
                <AvatarFallback className="text-black ">
                  {item?.author.name}
                </AvatarFallback>
              </Avatar>
              <div className=" flex flex-col w-full">
                <div className="font-semibold ">{item.name}</div>
                <div
                  className={cn(
                    "  text-[12px]",
                    // false=== item.id
                    //   ? "text-foreground"
                    //   :
                    "text-muted-foreground"
                  )}
                >
                  {/* @ts-ignore */}

                  {formatDistanceToNow(new Date(item.date), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </Link>
            {!item.read && (
              <span className="flex h-2 w-2 rounded-full bg-blue-600" />
            )}
          </div>
        </div>
        <div className="text-xs  font-medium">{item.subject}</div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {item.text.substring(0, 300)}
      </div>
      {/* {!item.isComment && item.comments.length > 0 && (
        <Link href={`/thread/${id}`}>
          <div className="my-2 flex items-center gap-2 order-1">
            {item.comments.slice(0, 2).map((comment, index) => (
              <Image
                key={index}
                src={comment.author.image}
                alt={`user_${index}`}
                height={12}
                width={12}
                className={`${
                  index !== 0 && "-ml-5"
                } rounded-full  h-8 w-8 object-cover`}
              />
            ))}
            <p className="mt-1 text-subtle-medium text-gray-1">
              {item.comments.length} repl
              {item.comments.length > 1 ? "ies" : "y"}
            </p>
          </div>
        </Link>
      )} */}
      <div className="flex items-center">
        <div className="flex-1 text-center">
          <a
            className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
            target="_blank"
          >
            <svg
              className="text-center h-6 w-6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          </a>
        </div>

       

        <div className="flex-1 text-center py-2 m-2">
          <a
            className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
            target="_blank"
          >
            <svg
              className="text-center h-7 w-6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </a>
        </div>

        <div className="flex-1 text-center py-2 m-2">
          <Link
          href=""
            className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
            target="_blank"
          >
            <svg
              className="text-center h-7 w-6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            <div className=" text-[12px]text-muted-foreground"></div>
          </Link>
        </div>
        <div className="flex-1 text-center py-2 m-2">
          <a
            className="w-12 mt-1 group flex items-center text-gray-500 px-3 py-2 text-base leading-6 font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
            target="_blank"
          >
            <svg
              className="text-center h-7 w-6"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"></path>
            </svg>
          </a>
        </div>
       
      </div>
  
    </button>
  );
}

export default ThreadCard;
