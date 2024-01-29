import Providers from "@/components/custom-ui/Provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/pac-logo.png";
import SearchBar from "@/components/common/SearchBar";
import { UserNav } from "@/components/common/UserNav";
import { TooltipProvider } from "@/components/ui/tooltip";

import RightSidebar from "@/components/common/RSidebar";
import LeftSidebar from "@/components/common/LSideBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SM",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <head>
          <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16"/>
          <link rel="icon" href="https://utfs.io/f/c7842498-d783-429a-8ae9-cd3eeff5a7ec-t1saia.ico" sizes="any" />
          </head>
          <body
            className={`${inter.className} bg-dark-3 w-full h-screen`}
            suppressHydrationWarning={true}
          >
            <div className="h-[3.5rem] w-full flex item-center self-center   justify-between rounded-none  border-b  ">
              <Link
                href="/"
                className="flex gap-1 w-fit  md:w-[11.5rem] h-[3rem] text-center px-2 mt-1   justify-start  items-center order-first md:bg-slate-400 rounded-xl "
              >
                <Image src={Logo} alt="logo" height={50} width={35} />

                <h4
                  className="hidden text-black font-mono  text-sm  md:block"
                  style={{ fontSize: "12px" }}
                >
                  ShadMorph
                </h4>
                <span
                  className="bg-red-100 hidden md:block text-red-800 text-sm  me-2 px-1 py-0.4 rounded dark:bg-red-900 dark:text-red-300"
                  style={{ fontSize: "8px" }}
                >
                  V 0.1
                </span>
                {/* <Badge variant={"destructive"} className="h-4  -mt-2" style={{fontSize:'8px'}}> </Badge> */}
              </Link>

              <div className="w-full gap-3 flex items-center  justify-end">
                <SearchBar />
                <UserNav />
              </div>
            </div>
            <div className="flex   h-[92%] min-h-fit ">
              <LeftSidebar/>
              {children}
              {/* <RightSidebar /> */}
            </div>

            <Toaster />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
