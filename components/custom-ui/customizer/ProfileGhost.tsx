import Image from "next/image";

import { redirect } from "next/navigation";



import ThreadsTab from "./ThreadsTab";
import ProfileHeader from "./ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export const profileTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "replies", label: "Replies", icon: "/assets/members.svg" },
    { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
  ];
  
 function ProfileGhost ({userText,bodyText}) {
  const user = {
    "id": "user_2XRjBc1msivqXqPTydMGKJamWqX",
    "name": "Tester",
    "email": "testerbraxil0@gmail.com",
    "bio": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed veritatis fuga, quos iusto voluptas voluptate ratione quam dolorum doloremque libero deserunt animi quibusdam. Odio, consectetur provident qui debitis nam hic.",
    "interests": [],
    "createdAt": "2023-10-29 17:21:32.985474",
    "updatedAt": "2023-10-29 17:21:32.985474",
    "image": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yWFJqQmJUaFRuMUxlbnlTdWk5WnZvT0NjcXgifQ",
    "is_setup": false,
    "username": "tester"
  }


console.log(userText,bodyText);


  return (
    <section>
      <ProfileHeader
        accountId={user.id}
        authUserId={user.id}
        name={user.name}
        username={user.username}
        imgUrl={user.image}
        bio={user.bio}
        userText={userText}
        bodyText={bodyText}
      />

      <div className='mt-1'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {/* {userInfo.threads.length} */}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className='w-full text-light-1'
            >
              {/* @ts-ignore */}
              {/* <ThreadsTab
                currentUserId={user.id}
                accountId={user.id}
                accountType='User'
              /> */}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
export default ProfileGhost;
