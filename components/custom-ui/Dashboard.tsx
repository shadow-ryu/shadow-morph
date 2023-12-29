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
import { Separator } from "../ui/separator";
import { Nav } from "../common/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { TooltipProvider } from "../ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../ui/resizable";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Panel } from "react-resizable-panels";

interface MailProps {
  accounts: {
    label: string;
    email: string;
    icon: React.ReactNode;
  }[];
  //   mails: Mail[]
  navCollapsedSize: number;
}

export default function Dashboard({ accounts, navCollapsedSize }: MailProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [defaultLayout, setDefaultLayout] = useState([20, 40, 40]);
  //   const [mail] = useMail()

  return (
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
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={10}
          maxSize={20}
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
            <div className="h-4"></div>
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
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold text-gray-50  font-serif">
                Feed
              </h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="following"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Following
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0"></TabsContent>
            <TabsContent value="following" className="m-0"></TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}></ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
