"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { sidebarLinks } from "@/lib/constants";
import { UserNav } from "./UserNav";
import LogoSvg from "./LogoSvg";
import { Nav } from "@/components/common/Navbar";
import {
  ActivitySquare,
  AlertCircle,
  Archive,
  ArchiveX,
  Bookmark,
  File,
  ImagePlus,
  Inbox,
  LucideIcon,
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
const profileNavLinks= [
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
];
interface link {
  title: string;
  label?: string;
  icon: LucideIcon;
  route: string;
  variant: "default" | "ghost";
}
const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const defaultLinks :Array<link>= [
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
  ];
  const { userId } = useAuth();
  const dynamicRoutePattern = /^\/guilds\/\d+\/editor$/;
  const profileProtectedPattern = /\/profile\/(?!visit\b)/;
  // console.log(pathname);
  if (["/customize",].includes(pathname) || dynamicRoutePattern.test(pathname)|| profileProtectedPattern.test(pathname)) {
    return null;
  }
  return (
    <div
      className={
        "col-span-1   w-28rem min-w-[20rem] max-w-[25rem] hidden lg:block border-x border-white"
      }
    >
      <Nav
      links={defaultLinks}
      // isCollapsed={isCollapsed}
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
    </div>
  );
};

export default LeftSidebar;
