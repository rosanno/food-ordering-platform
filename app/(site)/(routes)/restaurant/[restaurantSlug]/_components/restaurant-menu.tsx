"use client";

import { Menu } from "@prisma/client";

import Search from "./search";
import MenuItem from "@/components/menu-item";

interface RestaurantMenuProps {
  menu: Menu[] | null | undefined;
}

const RestaurantMenu = ({ menu }: RestaurantMenuProps) => {
  return (
    <section className="pt-72 md:pt-96 relative z-20">
      <Search placeholder="Search restaurant menu" />
      {menu?.length === 0 && (
        <div className="mt-4 text-muted-foreground flex items-center justify-center h-[25vh]">
          No menu found
        </div>
      )}
      <div
        className="
           grid
           grid-cols-2
           sm:max-w-max
           sm:grid-cols-2
           md:grid-cols-3
           lg:grid-cols-4
           gap-x-5
           gap-y-8
           sm:gap-6 
           md:gap-x-7
           md:gap-y-14
           mt-16"
      >
        {menu?.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default RestaurantMenu;
