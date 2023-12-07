import BottomNav from "@/components/common/BottomNav";
import LeftSidebar from "@/components/common/LSideBar";
import Navbar from "@/components/common/Navbar";
import RightSidebar from "@/components/common/RSidebar";
import Providers from "@/components/custom-ui/Provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import "../globals.css";

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
          <body
            className={`${inter.className} w-full h-screen bg-dark-3`}
            suppressHydrationWarning={true}
          >
            <section className="flex-col w-full h-full">
              <main className="flex flex-row">
                <LeftSidebar />

                <div className="h-screen w-full  ">{children}</div>

                {/* @ts-ignore */}
                {/* <RightSidebar /> */}
              </main>

              <BottomNav />
            </section>
            <Toaster />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
