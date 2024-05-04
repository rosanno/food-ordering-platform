"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const MainNav = () => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/admin/${params.slug}/dashboard`,
      label: "Dashboard",
      active:
        pathname === `/admin/${params.slug}/dashboard`,
    },
    {
      href: `/admin/${params.slug}/orders`,
      label: "Orders",
      active: pathname === `/admin/${params.slug}/orders`,
    },
    {
      href: `/admin/${params.slug}/customers`,
      label: "Customers",
      active:
        pathname === `/admin/${params.slug}/customers`,
    },
    {
      href: `/admin/${params.slug}/menu`,
      label: "Menu",
      active: pathname === `/admin/${params.slug}/menu`,
    },
    {
      href: `/admin/${params.slug}/menu/create`,
      label: "Add Menu",
      active:
        pathname === `/admin/${params.slug}/menu/create`,
    },
  ];

  return (
    <nav className="space-x-2 hidden md:block">
      {routes.map((item, i) => (
        <Link
          href={item.href}
          key={i}
          className={cn(
            "text-[12px] text-gray-500 font-normal hover:bg-gray-100 rounded-3xl px-3 py-[6px]",
            item.active && "bg-gray-100"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
