"use client";

import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { Menu } from "@prisma/client";
import {
  EyeOff,
  Plus,
  SquarePen,
  Trash,
} from "lucide-react";
import { toast } from "sonner";

import IconButton from "./icon-button";

const MenuItems = ({ menu }: { menu: Menu[] }) => {
  const router = useRouter();
  const params = useParams();

  const handleDelete = async (menuId: string) => {
    try {
      const res = await axios.delete(`/api/menu/${menuId}`);
      if (res.statusText === "OK") {
        toast(res.data.message, {
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
          duration: 5000,
        });
      }
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="mt-36">
      <div
        className="
         grid 
         grid-cols-1 
         sm:grid-cols-2 
         md:grid-cols-3
         lg:grid-cols-4
         gap-10
         sm:gap-6 
         md:gap-6
        "
      >
        {menu.map((item) => (
          <div
            key={item.id}
            className="
            bg-gray-100/30
            px-5
            py-2
            w-full
            rounded-lg 
            shadow-md 
            transition-all
            duration-300
            mb-32
        "
          >
            <div className="flex items-center justify-center">
              <Image
                src={item?.imageUrl as string}
                alt={item?.menuName as string}
                height={350}
                width={350}
                className="
                 -mt-24
                 w-52
                 h-52
                 md:w-40
                 md:h-40
                 object-contain
                "
              />
            </div>
            <div className="space-y-1.5 mt-4">
              <h4 className="truncate text-sm capitalize">
                {item?.menuName}
              </h4>
            </div>
            <div className="flex gap-6 mt-3.5">
              <IconButton
                label="View"
                icon={EyeOff}
                variant="success"
                onClick={() =>
                  router.push(`/admin/menu/${item.id}`)
                }
              />
              <IconButton
                label="Edit"
                icon={SquarePen}
                variant="danger"
                onClick={() =>
                  router.push(
                    `/admin/${params.slug}/menu/edit/${item.slug}`
                  )
                }
              />
              <IconButton
                label="Delete"
                icon={Trash}
                onClick={() => handleDelete(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuItems;
