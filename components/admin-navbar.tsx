"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { IoIosSettings } from "react-icons/io";

import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut } from "lucide-react";

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
    href: "/customers",
    label: "Customers",
  },
  {
    href: "/menu",
    label: "Menu",
  },
  {
    href: "/menu/create",
    label: "Add Menu",
  },
];

const DashboardNavbar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <header className="border-b py-5 md:mx-1.5 fixed z-10 w-full top-0 bg-white">
      <div className="px-5 md:px-10 flex items-center gap-10">
        <Link
          href={"/"}
          className="font-extrabold md:text-base"
        >
          Good<span className="text-[#FF9E0A]">Food</span>
        </Link>
        <nav className="space-x-2 hidden md:block">
          {Menu.map((item, i) => (
            <Link
              href={item.href}
              key={i}
              className={cn(
                "text-[12px] text-gray-500 font-normal hover:bg-gray-100 rounded-3xl px-3 py-[6px]",
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="h-[35px] w-[35px]">
                <AvatarImage
                  src={user?.imageUrl}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-28 mr-10 mt-2">
              <DropdownMenuItem>
                <SignOutButton>
                  <div className="text-[13px] flex items-center">
                    <LogOut className="h-4 w-4 mr-2" /> Sign
                    out
                  </div>
                </SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
