import { redirect } from "next/navigation";

// import { fetchCommunityPosts } from "@/lib/actions/community.actions";
// import { fetchUserPosts } from "@/lib/actions/user.actions";

import ThreadCard from "../cards/PostCard";

interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
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
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  // let result: Result;

  // if (accountType === "Community") {
  //   result = await fetchCommunityPosts(accountId);
  // } else {
  //   result = await fetchUserPosts(accountId);
  // }

  // if (!result) {
  //   redirect("/");
  // }
  let result = [1, 2, 3, 4, 5];
  const dummyData = {
    id: "1",
    currentUserId: "user123",
    parentId: null,
    content: "This is a sample post content.",
    author: {
      name: "John Doe",
      image: "",
      id: "author123",
    },
    community: {
      id: "community123",
      name: "Sample Community",
      image: "",
    },
    createdAt: "2023-01-01T12:00:00Z",
    comments: [
      {
        author: {
          image: "",
        },
      },
      {
        author: {
          image:"",
        },
      },
    ],
    isComment: false,
  };
  
  return (
    <section className='mt-9 flex flex-col gap-3 h-fit max-h-[35vh] overflow-scroll'>
      {result.map(() => (
        <ThreadCard
          key={dummyData.id}
          id={dummyData.id}
          currentUserId={currentUserId}
          parentId={dummyData.parentId}
          content={dummyData.content}
          author={
            accountType === "User"
              ? { name: dummyData.author.name, image: dummyData.author.image, id: dummyData.author.id }
              : {
                  name: dummyData.author.name,
                  image: dummyData.author.image,
                  id: dummyData.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: dummyData.community.name, id: dummyData.id, image: dummyData.community.image }
              : dummyData.community
          }
          createdAt={dummyData.createdAt}
          comments={dummyData.comments}
        />
      ))}
    </section>
  );
}

export default ThreadsTab;
