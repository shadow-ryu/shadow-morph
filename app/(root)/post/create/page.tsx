import EditiorSkeleton from "@/components/custom-ui/editior/EditiorSkeleton";
import Editor from "@/components/custom-ui/editior/Editor";
import { Button } from "@/components/ui/Button";
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
  return (
    <div className="flex flex-col items-start gap-6">
      {/* heading */}
      <div className="">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 flex justify-between text-base font-semibold leading-6 text-gray-900">
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
      <Editor />

      <div className="w-full flex justify-end">
        <Button type="submit" className="w-full" form="post-form" >
          Post
        </Button>
      </div>
    </div>
  );
};

export default page;
