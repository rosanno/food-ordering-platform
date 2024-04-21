"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { IoIosSettings } from "react-icons/io";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const DashboardNavbar = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/admin/${params.restaurantId}/dashboard`,
      label: "Dashboard",
      active:
        pathname ===
        `/admin/${params.restaurantId}/dashboard`,
    },
    {
      href: `/admin/${params.restaurantId}/orders`,
      label: "Orders",
      active:
        pathname === `/admin/${params.restaurantId}/orders`,
    },
    {
      href: `/admin/${params.restaurantId}/customers`,
      label: "Customers",
      active:
        pathname ===
        `/admin/${params.restaurantId}/customers`,
    },
    {
      href: `/admin/${params.restaurantId}/menu`,
      label: "Menu",
      active:
        pathname === `/admin/${params.restaurantId}/menu`,
    },
    {
      href: `/admin/${params.restaurantId}/menu/create`,
      label: "Add Menu",
      active:
        pathname ===
        `/admin/${params.restaurantId}/menu/create`,
    },
  ];

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
          {routes.map((item, i) => (
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
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
