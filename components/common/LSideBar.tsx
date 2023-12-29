"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { sidebarLinks } from "@/lib/constants";
import { UserNav } from "./UserNav";
import LogoSvg from "./LogoSvg";
import { Separator } from "../ui/separator";
const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { userId } = useAuth();
  const dynamicRoutePattern = /^\/guilds\/\d+\/editor$/;
  // console.log(pathname);
  if (["/customize"].includes(pathname) || dynamicRoutePattern.test(pathname)) {
    return null;
  }
  return (
    <section className="custom-scrollbar leftsidebar w-max  min-w-[20rem]">
      <div className="flex flex-col justify-center items-center">
        <Link
          href="/"
          className="flex gap-2 min-h-4 w-full text-center p-2   justify-center  items-center order-first"
        >
          {/* <Icons.logo className='h-8 w-8 sm:h-6 sm:w-6' /> */}
          <LogoSvg height={40} width={40} />
          <h4 className="hidden text-white  text-md text-heading3-semibold md:block">
            ShadMorph
          </h4>
        </Link>

          <Separator className="mx-1" />

      </div>
      <div className="flex w-full order-2 flex-1 flex-col gap-6 px-6 pb-5 pt-6 ">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && "bg-primary-500 "}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={22}
                height={22}
              />

              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className=" order-last   border-t-slate-300">
        {userId ? (
          <UserNav />
        ) : (
          <Link className="text-white" href={"post/create"}>
            {" "}
            sign-In
          </Link>
        )}
      </div>
    </section>
  );
};

export default LeftSidebar;
