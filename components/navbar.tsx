"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import ButtonLink from "./ui/button-link";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import MobileNav from "./mobile-nav";

const MenuList = [
  {
    path: "/",
    label: "Home",
  },
  {
    path: "/menu",
    label: "Menu",
  },
  {
    path: "/booking",
    label: "Booking",
  },
  {
    path: "/pricing",
    label: "Pricing",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <header
        className="
        px-2 
        py-2.5 
        md:py-4
        md:px-5
        fixed
        top-0
        inset-x-0
        z-30
        bg-white
        shadow-sm
        w-full
      "
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <Link
              href={"/"}
              className="font-extrabold md:text-lg"
            >
              Good
              <span className="text-[#FF9E0A]">Food</span>
            </Link>
            <nav className="hidden sm:block">
              <ul className="flex items-center space-x-10">
                {MenuList.map((list, i) => (
                  <li
                    key={i}
                    className={cn(
                      "text-[13px] hover:text-yellow-600 transition-colors duration-300",
                      pathname === list.path &&
                        "text-yellow-600"
                    )}
                  >
                    <Link href={list.path}>
                      {list.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex items-center gap-3">
              {isLoaded ? (
                <>
                  {isSignedIn ? (
                    <>
                      <UserButton afterSignOutUrl="/" />
                    </>
                  ) : (
                    <ButtonLink href="/sign-in">
                      Sign in
                    </ButtonLink>
                  )}
                </>
              ) : (
                <Skeleton className="h-8 w-8 rounded-full bg-gray-300/55" />
              )}
              <div className="block sm:hidden">
                <Button
                  size={"icon"}
                  variant={"outline"}
                  onClick={() => setIsOpen(true)}
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileNav
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        menuList={MenuList}
      />
    </>
  );
}
