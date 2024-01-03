
import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";




async function Page() {
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings
  const userInfo:any = await fetchUsers(user.id);
  if (userInfo?.onboarded) redirect("/");

  
  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username:  userInfo?.username || user.username,
    email: userInfo?.email || user?.emailAddresses[0]?.emailAddress,
    name:  userInfo?.name || user.firstName ,
    bio:  userInfo?.bio ||"",
    image:  userInfo?.image || user.imageUrl,
  };
  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 '>
      <h1 className='head-text'>Onboarding</h1>
      <p className='mt-3 text-base-regular text-light-2'>
        Complete your profile now, to use.
      </p>

      <section className='mt-9 bg-current p-10'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </main>
  );
}

export default Page;