import {  MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button, buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import more from "../../public/assets/more.svg";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { fetchUserById } from "@/lib/actions/user.actions";
import Link from "next/link";

export async function UserNav() {
  const loggedUser = await currentUser();

  if (!loggedUser) {
    return <Link  href="/sign-in" >Login or sign</Link>;
  }
  const user = await fetchUserById(loggedUser.id)
  if(!user){
    return null
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="unknown"
          className="relative h-7 w-7 rounded-full hover:outline-none hover:ring-transparent focus:bg-transparent  text-black"
        >
          <Avatar className=" h-7 w-7">
            <AvatarImage src={user.image||""} alt={`@${user.username}`} />
            <AvatarFallback>{user?.name?.slice(0,2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className=" text-small-semibold font-medium leading-none">{user.name}</p>
            <p className="text-[7px] leading-none text-muted-foreground">
            {user.email ?? `@${user.username}`}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="text-black text-[10px]">
          <DropdownMenuItem>
            <a href="/profile">Profile</a>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
         
          <DropdownMenuItem>
            <a href="/setting">Settings</a>
            {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
          </DropdownMenuItem>
          {/* <DropdownMenuItem>New Team</DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {/* Log out */}
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
