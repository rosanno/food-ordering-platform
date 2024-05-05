"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "@prisma/client";
import { formatCurrency } from "@/lib/utils";

import Search from "./search";
import { GoStarFill } from "react-icons/go";

interface RestaurantMenuProps {
  menu: Menu[] | null | undefined;
}

const RestaurantMenu = ({ menu }: RestaurantMenuProps) => {
  return (
    <section className="pt-72 md:pt-96 relative z-20">
      <Search placeholder="Search restaurant menu" />
      <div className="space-y-3 mt-5">
        {menu?.length!! > 0 ? (
          <>
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
                    <div className="space-y-1">
                      <p className="text-[13px]">
                        {item.menuName}
                      </p>
                      <p className="flex items-center text-[12px] text-muted-foreground">
                        <GoStarFill className="text-[#FFA71E] mr-1.5" />
                        (4.8)
                        <span className="ml-2.5">
                          2.3 Review
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm text-[#FF9E0A] font-medium">
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
          </>
        ) : (
          <div className="flex justify-center">
            <p className="text-[13px] text-muted-foreground">
              Menu not found
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RestaurantMenu;
