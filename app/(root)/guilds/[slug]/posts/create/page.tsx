// import EditiorSkeleton from "@/components/custom-ui/editior/EditiorSkeleton";
import Dashboard from "@/components/custom-ui/dashboard/Dashboard";
import Editor from "@/components/editior/Editor";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { db } from "@/lib/db";
import { BadgeInfo } from "lucide-react";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

const page = async ({ params }: PageProps) => {
    const {slug} =params;
  return (
    <Dashboard noOFSections={[20,60,20]}  navCollapsedSize={3} thirdSection={undefined}>
        <div className="mx-auto max-w-4xl mt-8 p-5 bg-[#17394f]  w-full rounded-lg">
      <div className="flex flex-col items-start gap-6">
        {/* heading */}
        <div className="">
          <div className="-ml-2 -mt-2 flex flex-wrap text-center items-baseline">
            <h3 className="ml-4 mt-2 flex justify-between text-base font-semibold leading-6 text-gray-100">
              Create Post
              <div className="ml-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <BadgeInfo />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-gray-500  font-normal ">
                        use hastags(#) to link to topics and @(username) to
                        mention someone
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </h3>
          </div>
        </div>

        {/* form */}
        <Editor  isGuild={true} guildId={slug}/>

        <div className="w-full flex justify-end">
          <Button type="submit" variant={"secondary"} className="w-full bg-[#AA4B86] hover:bg-[#b13581]" form="post-form">
            Post
          </Button>
        </div>
      </div>
    </div>
      </Dashboard>
  );
};

export default page;
