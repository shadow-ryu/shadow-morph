"use client";
import Logo from "@/public/pac-logo.png";
import {
  ActivitySquare,
  AlertCircle,
  Archive,
  ArchiveX,
  Bookmark,
  File,
  ImagePlus,
  Inbox,
  MessagesSquare,
  PenBox,
  Search,
  Send,
  ShoppingCart,
  Swords,
  Trash2,
  Users2,
} from "lucide-react";
import { Separator } from "../../ui/separator";
import { Nav } from "../../common/Navbar";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../ui/resizable";
import { cn } from "@/lib/utils";
import { useState } from "react";

import Link from "next/link";

import Image from "next/image";
import { UserNav } from "@/components/common/UserNav";
import SearchBar from "@/components/common/SearchBar";


interface Props {
  //   mails: Mail[]
  noOFSections: number[];
  children: React.ReactNode;
  navCollapsedSize: number;
  thirdSection?: React.ReactNode;
}

export default function Dashboard({
  children,
  navCollapsedSize,
  noOFSections = [10, 60, 20],
  thirdSection = null,
}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [defaultLayout, setDefaultLayout] = useState(noOFSections);
  //   const [mail] = useMail()

  return (
    <div className=" h-full w-full">
      <div className="h-[3.5rem] w-full flex item-center self-center   justify-between rounded-none border-b  ">
        <Link
          href="/"
          className="flex gap-1  w-[11.5rem] h-[3rem] text-center px-2 mt-1   justify-start  items-center order-first bg-slate-400 rounded-xl "
        >
          <Image src={Logo} alt="logo" height={50} width={35} />

          <h4
            className="hidden text-black font-mono  text-sm  md:block"
            style={{ fontSize: "12px" }}
          >
            ShadMorph
          </h4>
          <span className="bg-red-100 text-red-800 text-sm  me-2 px-1 py-0.4 rounded dark:bg-red-900 dark:text-red-300" style={{fontSize:'8px'}}>
            V 0.1
          </span>
          {/* <Badge variant={"destructive"} className="h-4  -mt-2" style={{fontSize:'8px'}}> </Badge> */}
        </Link>

        <div className="w-full gap-3 flex items-center  justify-end">
          <SearchBar />
          <UserNav />
        </div>
      </div>


      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          //   document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          //     sizes
          //   )}`;
          console.log(sizes);
          setDefaultLayout(sizes);
        }}
        className="h-full grid grid-cols-3  justify-start   w-full "
      >
        <TooltipProvider delayDuration={0}>
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={10}
            maxSize={15}
            onResize={(e) => {
              let collapsed = Math.floor(e) <= 10;
              setIsCollapsed(collapsed);
            }}
            className={cn(
              isCollapsed &&
                "min-w-[50px]  transition-all duration-300 ease-in-out",
              "col-span-1"
            )}
          >
            <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Home",
                  icon: Inbox,
                  route: "/",
                  variant: "default",
                },
                {
                  title: "Drafts",
                  route: "/drafts",
                  icon: File,
                  variant: "ghost",
                },
                {
                  title: "Activity",
                  route: "/activity",
                  icon: ActivitySquare,
                  variant: "ghost",
                },

                {
                  title: "Bookmark",
                  route: "/bookmark",
                  icon: Bookmark,
                  variant: "ghost",
                },
                {
                  title: "Create Post",
                  route: "",
                  icon: ImagePlus,
                  variant: "ghost",
                },

                {
                  title: "Guilds",
                  route: "/guilds",
                  icon: Swords,
                  variant: "ghost",
                },
                {
                  title: "Updates",
                  route: "/app_updates",
                  icon: AlertCircle,
                  variant: "ghost",
                },
              ]}
            />

            {/* <nav className="grid gap-1 my-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
              <SignedIn>

                <div className="flex justify-start w-full  text-white gap-3 items-center">
                  <UserButton />
                  {!isCollapsed ? <div className="">user</div> : ""}
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </nav> */}
          </ResizablePanel>
          <ResizableHandle withHandle />
        </TooltipProvider>
        <div className={`w-[60rem]  col-span-${isCollapsed ? 4 : 3}`}>
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={60}>
            {children}
          </ResizablePanel>
        </div>
        {thirdSection != null && defaultLayout.length === 3 ? (
          <>
            {/* <ResizableHandle withHandle /> */}
            <ResizablePanel
              minSize={10}
              maxSize={30}
              className={"col-span-1"}
              defaultSize={defaultLayout[2]}
            >
              {thirdSection}
            </ResizablePanel>
          </>
        ) : null}
      </ResizablePanelGroup>
    </div>
  );
}
