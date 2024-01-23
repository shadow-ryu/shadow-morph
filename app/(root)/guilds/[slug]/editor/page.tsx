import CustomizingEditor from "@/components/custom-ui/personalize/CustomizerEditor";
import { fetchUserById} from "@/lib/actions/user.actions";
import { db } from "@/lib/db";
import { guilds } from "@/lib/db/schema";
import { currentUser } from "@clerk/nextjs";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { slug } = params;
  const user = await currentUser();
  if (!user) return redirect("/");

  let  userInfo = await fetchUserById(user.id);
  // userInfo=userInfo[0];
  // console.log([0],slug,"slug")
  // if (!userInfo?.onboarded) redirect("/onboarding");
  // const guild = await db.select().from(guilds).where(eq(guilds.id, slug));
  // if (guild) {
  // }
  console.log(userInfo,"fff");
  const data: any = [];
  return (
    <div className="  h-full w-full">
      <CustomizingEditor
      // @ts-ignore
        dataDb={data}
        slug={slug}
        userId={user.id}
        pageType={"guild"}
      />
    </div>
  );
};

export default Page;
