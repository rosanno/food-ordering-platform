"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const MainNav = () => {
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
    <nav className="space-x-2 hidden md:block">
      {routes.map((item, i) => (
        <Link
          href={item.href}
          key={i}
          className={cn(
            "text-[12px] text-gray-500 font-normal hover:bg-gray-100 rounded-3xl px-3 py-[6px]"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
