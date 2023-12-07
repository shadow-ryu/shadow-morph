"use client"
import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

// import { Icons } from './Icons'

const Navbar = () => {

  const pathname = usePathname();

  // const { userId } = useAuth();
  
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-30 py-2 md:py-4 ">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
       

        {/* search bar */}
        {/* <SearchBar /> */}

        {/* actions */}
        <SignedIn>
          <UserButton/>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
