"use client"
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

// import { Icons } from './Icons'

const Navbar = () => {
  // //   const session = await getServerSession(authOptions)

  const pathname = usePathname();

  // const { userId } = useAuth();
  
  return (
    <div className=" inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-30 py-2 md:py-4 ">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center">
          {/* <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' /> */}
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            ShadMorph
          </p>
        </Link>

        {/* search bar */}
        {/* <SearchBar /> */}

        {/* actions */}
        <SignedIn>
          <SignOutButton>
            <div className="flex cursor-pointer">
          {/* <Image
          src='/assets/logout.svg'
          alt='logout'
          width={24}
          height={24}
          /> */}
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
