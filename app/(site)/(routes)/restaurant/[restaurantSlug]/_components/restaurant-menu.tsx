"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "@prisma/client";
import { formatCurrency } from "@/lib/utils";

import Search from "./search";

interface RestaurantMenuProps {
  menu: Menu[] | null;
}

const RestaurantMenu = ({ menu }: RestaurantMenuProps) => {
  return (
    <section className="pt-72 md:pt-96 relative z-20">
      <Search placeholder="Search restaurant menu" />
      <div className="space-y-3 mt-5">
        {menu?.map((item) => (
          <Link
            href={`/menu/${item.slug}`}
            key={item.id}
            className="block"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="bg-gray-100/75 rounded-md py-1.5 px-2 overflow-hidden">
                  <Image
                    src={item.imageUrl as string}
                    alt={item.menuName as string}
                    height={120}
                    width={120}
                    className="h-12 w-12"
                  />
                </div>
                <p className="text-[13px]">
                  {item.menuName}
                </p>
              </div>
              <div>
                <h4 className="text-sm text-yellow-600 font-medium">
                  {formatCurrency(
                    parseInt(item.price),
                    "PHP"
                  )}
                </h4>
              </div>
            </div>
            <div className="border-b border-gray-200/50 w-full pt-2.5" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RestaurantMenu;
