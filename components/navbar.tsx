"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import ButtonLink from "./ui/button-link";

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
  const { isSignedIn, user } = useUser();

  return (
    <header
      className="
        px-2 
        py-2.5 
        md:py-4
        md:px-5
        fixed
        top-0
        inset-x-0
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
            Good<span className="text-[#FF9E0A]">Food</span>
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
                  <Link href={list.path}>{list.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          {isSignedIn ? (
            <div className="space-x-6">
              {user?.publicMetadata.role ? (
                <ButtonLink href="/admin/dashboard">
                  Dashboard
                </ButtonLink>
              ) : (
                <UserButton />
              )}
            </div>
          ) : (
            <ButtonLink href="/sign-in">Sign in</ButtonLink>
          )}
        </div>
      </div>
    </header>
  );
}
