"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { IoIosSettings } from "react-icons/io";

import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "./ui/button";

const Menu = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/orders",
    label: "Orders",
  },
  {
    href: "/menu/list",
    label: "Menu List",
  },
];

const DashboardNavbar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <header className="border-b py-5 mx-1.5 fixed w-full top-0 bg-white">
      <div className="px-10 flex items-center gap-10">
        <Link
          href={"/"}
          className="font-extrabold md:text-base"
        >
          Good<span className="text-[#FF9E0A]">Food</span>
        </Link>
        <nav className="space-x-2">
          {Menu.map((item, i) => (
            <Link
              href={item.href}
              key={i}
              className={cn(
                "text-[13px] text-gray-500 font-medium hover:bg-gray-100 rounded-3xl px-3 py-[6px]",
                pathname === item.href && "bg-gray-100"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Button variant={"ghost"} size={"icon"}>
            <IoIosSettings className="text-[22px] text-gray-500" />
          </Button>
          <Avatar className="h-[35px] w-[35px]">
            <AvatarImage
              src={user?.imageUrl}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
