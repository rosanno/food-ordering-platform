"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menuList: MenuList[];
}

interface MenuList {
  path: string;
  label: string;
}

const MobileNav = ({
  isOpen,
  setIsOpen,
  menuList,
}: MobileNavProps) => {
  const pathname = usePathname();

  return (
    <>
      <aside
        className={cn(
          "w-2/3 bg-white shadow-md fixed inset-y-0 right-0 z-50 transition duration-300 p-3",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div>
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={() => setIsOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-20 px-8">
          <ul className="space-y-5">
            {menuList.map((item, index) => (
              <li key={index} className="text-[16px]">
                <Link
                  href={item.path}
                  className={cn(
                    "hover:text-yellow-600 transition-colors duration-300",
                    pathname === item.path &&
                      "text-yellow-600"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
                <div className="border-b border-gray-200/50 pt-5" />
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div
        onClick={() => setIsOpen(false)}
        className={cn(
          "fixed w-full h-full top-0 bg-black/40 backdrop-blur-md z-40 transition duration-300",
          isOpen ? "block" : "hidden"
        )}
      />
    </>
  );
};

export default MobileNav;
