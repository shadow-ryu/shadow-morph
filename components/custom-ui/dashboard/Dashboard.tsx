"use client";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
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
import { Panel } from "react-resizable-panels";
import LogoSvg from "../../LogoSvg";
import Link from "next/link";
// import ThreadCard from "@/components/cards/ThreadCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { buttonVariants } from "@/components/ui/button";
import { index } from "drizzle-orm/mysql-core";
import link from "next/link";

interface MailProps {
  //   mails: Mail[]
  noOFSections: number[];
  children: React.ReactNode;
  navCollapsedSize: number;
  thirdSection: React.ReactNode;
}

export default function Dashboard({
  children,
  navCollapsedSize,
  noOFSections = [10, 60, 20],
  thirdSection = null,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [defaultLayout, setDefaultLayout] = useState(noOFSections);
  //   const [mail] = useMail()

  return (
    <div className="min-h-screen h-full w-full">
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            //   document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            //     sizes
            //   )}`;
            console.log(sizes);
            setDefaultLayout(sizes);
          }}
          className="h-full max-h-[800px] min-h-screen  w-full items-stretch"
        >
          <ResizablePanel
            defaultSize={defaultLayout[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={10}
            maxSize={15}
            onResize={(e) => {
              console.log(Math.floor(e), "eeeee");
              let collapsed = Math.floor(e) <= 10;
              setIsCollapsed(collapsed);
            }}
            className={cn(
              isCollapsed &&
                "min-w-[50px] transition-all duration-300 ease-in-out"
            )}
          >
            <div
              className={cn(
                "flex h-[56px] items-center justify-center",
                isCollapsed ? "h-[52px]" : "px-2"
              )}
            >
              {/* <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} /> */}
              <Link
                href="/"
                className="flex gap-2 min-h-4 w-full text-center p-2   justify-center  items-center order-first"
              >
                {/* <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' /> */}
                <LogoSvg
                  height={isCollapsed ? 25 : 35}
                  width={isCollapsed ? 25 : 35}
                />
                {!isCollapsed ? (
                  <h4 className="hidden text-white  text-md text-heading3-semibold md:block">
                    ShadMorph
                  </h4>
                ) : null}
              </Link>
            </div>
            <Separator />
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
              ]}
            />
            <Separator />
            <Nav
              isCollapsed={isCollapsed}
              links={[
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
            <Separator />
            <nav className="grid gap-1 my-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
              <SignedIn>
                {/* Mount the UserButton component */}
                <div className="flex justify-start w-full  text-white gap-3 items-center">
                  <UserButton />
                  {!isCollapsed ? <div className="">user</div> : ""}
                </div>
              </SignedIn>
              <SignedOut>
                <SignInButton />
              </SignedOut>
            </nav>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={defaultLayout[1]} minSize={60}>
            {children}
          </ResizablePanel>
          {thirdSection != null && defaultLayout.length === 3 ? (
            <>
              {/* <ResizableHandle withHandle /> */}
              <ResizablePanel
                minSize={20}
                maxSize={30}
                defaultSize={defaultLayout[2]}
              >
                {thirdSection}
              </ResizablePanel>
            </>
          ) : null}
        </ResizablePanelGroup>
      </TooltipProvider>
    </div>
  );
}
