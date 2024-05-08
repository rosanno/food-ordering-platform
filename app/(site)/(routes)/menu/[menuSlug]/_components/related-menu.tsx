"use client";

import Image from "next/image";
import Link from "next/link";
import { GoStarFill } from "react-icons/go";
import { Menu } from "@prisma/client";

import { formatCurrency } from "@/lib/utils";

interface RelatedMenuProps {
  menu: Menu[];
}

const RelatedMenu = ({ menu }: RelatedMenuProps) => {
  return (
    <section className="mt-10">
      <h3 className="text-xl font-medium">Related Menu</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-7">
        {menu.map((item) => (
          <Link
            href={`/menu/${item.slug}`}
            key={item.id}
            className="rounded-md shadow"
          >
            <div className="flex justify-center px-2 py-4 bg-gray-200/35">
              <Image
                src={item.imageUrl!}
                alt={item.menuName}
                height={95}
                width={95}
                className="object-contain h-28"
              />
            </div>
            <div className="p-2.5">
              <h4 className="text-sm truncate">
                {item.menuName}
              </h4>
              <div className="flex items-center gap-1 pt-1.5 mb-3.5">
                {[1, 2, 3, 4, 5].map((_) => (
                  <GoStarFill
                    key={_}
                    className="text-[#FFA71E] text-[12px]"
                  />
                ))}
              </div>
              <p className="text-sm text-[#FFA71E]">
                {item?.price !== undefined &&
                  formatCurrency(
                    parseInt(item?.price),
                    "PHP"
                  )}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedMenu;
