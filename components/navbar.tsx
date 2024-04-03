"use client";

import Link from "next/link";
import { SignOutButton, useUser } from "@clerk/nextjs";
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
  const { isSignedIn, user } = useUser();

  return (
    <header
      className="
        px-2 
        py-2.5 
        md:py-3.5
        md:px-5
        w-full
        max-w-6xl
        mx-auto
      "
    >
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
              <li key={i} className="text-[13px]">
                <Link href={list.path}>{list.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        {isSignedIn ? (
          <div className="space-x-6">
            <SignOutButton>
              <button className="text-[13px] font-semibold">
                Sign out
              </button>
            </SignOutButton>
            {user?.publicMetadata.role ? (
              <ButtonLink href="/dashboard">
                Dashboard
              </ButtonLink>
            ) : (
              <p>User</p>
            )}
          </div>
        ) : (
          <ButtonLink href="/sign-in">Sign in</ButtonLink>
        )}
      </div>
    </header>
  );
}
