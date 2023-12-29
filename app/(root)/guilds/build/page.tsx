import GuildForm from "@/components/forms/GuildForm";

const Page = async () => {
  return (
    <div className="h-full w-full bg-[#17394f] flex-col justify-center items-center">
      <div className="flex text-center justify-between items-center my-1">
        <h1 className="text-xl font-bold text-gray-200 ml-[15%]">
          Build a Guild House
        </h1>
      </div>
      <GuildForm />
    </div>
  );
};
export default Page;
