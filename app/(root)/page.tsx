
// import Dashboard from "@/components/custom-ui/dashboard/Dashboard";
// import { fetchPosts } from "@/lib/db/quries";
import { db } from "@/lib/db";
const Page = async() => {

const data=  await db.query.posts.findMany({

 });
console.log(data,"")
  return (
    <main className="h-screen w-full bg-dark-3">
      {/* <Dashboard
        accounts={[]}
        navCollapsedSize={3}
      /> */}
    </main>
  );
};
export default Page;
