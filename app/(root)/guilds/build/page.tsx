import Dashboard from "@/components/custom-ui/dashboard/Dashboard";
import GuildForm from "@/components/guild/GuildForm";

const Page = async () => {
  return (
   <Dashboard noOFSections={[20,80]}  navCollapsedSize={2} >
     <div className="h-full w-full flex-col justify-center items-center">
      <div className="">
        <h1 className="text-xl font-bold text-gray-200 ">
          Build a Guild House
        </h1>
      </div>
      <GuildForm />
    </div>
   </Dashboard>
  );
};
export default Page;
