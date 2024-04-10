"use client";

import Image from "next/image";
import { Menu } from "@prisma/client";
import {
  EyeOff,
  Plus,
  SquarePen,
  Trash,
} from "lucide-react";

import IconButton from "./icon-button";

const MenuItems = ({ menu }: { menu: Menu[] }) => {
  return (
    <section className="mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-32">
        {menu.map((item) => (
          <div
            key={item.id}
            className="
             bg-gray-100/25 
             shadow-md
             rounded-xl
             flex 
             flex-col 
             items-center
             p-3.5
             mb-28
            "
          >
            <Image
              src={item.imageUrl!!}
              alt={item.menuName}
              height={200}
              width={200}
              className="object-contain align-middle -mt-24"
            />
            <div className="text-center space-y-2">
              <h4 className="mt-10 md:mt-5 truncate">
                {item.menuName}
              </h4>
              <p className="text-sm font-normal">
                Food/Noodle
              </p>
            </div>
            <div className="flex items-center justify-between w-full px-4 md:px-6 py-4 md:py-2 mt-5">
              <IconButton
                label="View"
                icon={EyeOff}
                variant="success"
                onClick={() => {}}
              />
              <IconButton
                label="Edit"
                icon={SquarePen}
                variant="danger"
                onClick={() => {}}
              />
              <IconButton
                label="Delete"
                icon={Trash}
                onClick={() => {}}
              />
              <IconButton
                label="Duplicate"
                icon={Plus}
                variant="secondary"
                onClick={() => {}}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuItems;
