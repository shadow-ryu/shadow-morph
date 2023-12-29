"use client";
import { currentUser } from "@clerk/nextjs";
import { headers } from "next/headers";
import { usePathname, useRouter } from "next/navigation";

// import UserCard from "../cards/UserCard";

// import { fetchCommunities } from "@/lib/actions/community.actions";
// import { fetchUsers } from "@/lib/actions/user.actions";

function RightSidebar() {
  //   const user = await currentUser();
  //   if (!user) return null;

  //   const similarMinds = await fetchUsers({
  //     userId: user.id,
  //     pageSize: 4,
  //   });

  //   const suggestedCOmmunities = await fetchCommunities({ pageSize: 4 });
  const router = useRouter();
  const pathname = usePathname();
  const dynamicRoutePattern = /^\/guilds\/\d+\/personailzer$/;
  if (
    ["/post/create", "/customize"].includes(pathname) ||
    dynamicRoutePattern.test(pathname)
  ) {
    return <></>;
  }
  return (
    <section className="custom-scrollbar rightsidebar min-w-[25rem]">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">
          Suggested Communities
        </h3>

        <div className="mt-7 flex w-[350px] flex-col gap-9">
          {/* {suggestedCOmmunities.communities.length > 0 ? (
            <>
              {suggestedCOmmunities.communities.map((community) => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType='Community'
                />
              ))}
            </>
          ) : ( */}
          <p className="!text-base-regular text-light-3">No communities yet</p>
          {/* )} */}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1">Similar Minds</h3>
        <div className="mt-7 flex w-[350px] flex-col gap-10">
          {/* {similarMinds.users.length > 0 ? (
            <>
              {similarMinds.users.map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType='User'
                />
              ))}
            </>
          ) : ( */}
          <p className="!text-base-regular text-light-3">No users yet</p>
          {/* )} */}
        </div>
      </div>
    </section>
  );
}

export default RightSidebar;
