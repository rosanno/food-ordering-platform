"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useSideNav } from "@/hooks/use-side-nav";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface MobileNavProps {
  menuList: MenuList[];
}

interface MenuList {
  path: string;
  label: string;
}

const MobileNav = ({ menuList }: MobileNavProps) => {
  const sideNav = useSideNav();
  const pathname = usePathname();

  return (
    <Sheet
      open={sideNav.isOpen}
      onOpenChange={sideNav.onClose}
    >
      <SheetContent>
        <div className="mt-20">
          <ul className="space-y-5">
            {menuList.map((item, index) => (
              <li key={index} className="text-sm">
                <Link
                  href={item.path}
                  className={cn(
                    "hover:text-yellow-600 transition-colors duration-300",
                    pathname === item.path &&
                      "text-yellow-600"
                  )}
                  onClick={() => sideNav.onClose()}
                >
                  {item.label}
                </Link>
                <div className="border-b border-gray-200/50 pt-3" />
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
