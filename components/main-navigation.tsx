"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuList } from "@/constants";
import { cn } from "@/lib/utils";

const MainNavigation = () => {
  const pathname = usePathname();
  return (
    <nav className="hidden sm:block">
      <ul className="flex items-center space-x-10">
        {MenuList.map((list, i) => (
          <li
            key={i}
            className={cn(
              "text-[13px] transition-colors duration-300",
              pathname === list.path && "text-[#FFA71E]"
            )}
          >
            <Link
              href={list.path}
              className="hover:text-[#FFA71E]"
            >
              {list.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MainNavigation;