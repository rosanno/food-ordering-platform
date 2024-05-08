"use client";

import { Menu } from "@prisma/client";

import RelatedMenuItem from "./related-menu-item";

interface RelatedMenuProps {
  menu: Menu[];
}

const RelatedMenu = ({ menu }: RelatedMenuProps) => {
  return (
    <section className="mt-10">
      <h3 className="text-xl font-medium">Related Menu</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-7">
        {menu?.map((item) => (
          <RelatedMenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default RelatedMenu;
