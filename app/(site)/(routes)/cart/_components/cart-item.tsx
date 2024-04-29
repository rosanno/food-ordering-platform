"use client";

import {
  Cart,
  CartItem as Item,
  Menu,
  Restaurant,
} from "@prisma/client";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface ItemWithMenu extends Item {
  menu: Menu & { restaurant: Restaurant | null };
}

interface CartItemProps {
  cart:
    | (Cart & {
        items: ItemWithMenu[];
      })
    | null;
}

const CartItem = ({ cart }: CartItemProps) => {
  return (
    <section className="col-span-7">
      <div>
        {cart?.items.map((item) => (
          <div
            key={item.id}
            className="border rounded-md px-3.5 py-3 flex justify-between"
          >
            <div className="flex gap-3.5">
              <div className="h-20 w-20">
                <Image
                  src={item.menu?.imageUrl as string}
                  alt={item.menu?.menuName as string}
                  height={135}
                  width={135}
                  className="object-contain"
                />
              </div>
              <div>
                <h4 className="text-sm font-medium mb-0.5">
                  {item.menu?.menuName}
                </h4>
                <p className="text-[12px] text-muted-foreground">
                  {item.menu?.restaurant?.name}
                </p>
                <div
                  className="
                   flex 
                   items-center 
                   border 
                   border-[#FF9E0A] 
                   w-max px-2 
                   py-0.5 
                   rounded-md 
                   mt-3
                  "
                >
                  <div role="button">
                    <Minus className="h-3.5 w-3.5 text-[#EBB535]" />
                  </div>
                  <input
                    type="text"
                    defaultValue={item.quantity || ""}
                    disabled
                    className="text-center w-8 outline-none text-sm"
                  />
                  <div role="button">
                    <Plus className="h-3.5 w-3.5 text-[#EBB535]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center flex-col">
              <h4
                className="
                  text-[13px] 
                  text-[#FF9E0A] 
                  font-medium
                "
              >
                {formatCurrency(
                  parseInt(item.menu?.price),
                  "PHP"
                )}
              </h4>
              <Button
                className="mt-auto"
                size={"sm"}
                variant={"ghost"}
              >
                <span className="text-[12px] text-red-500">
                  Delete
                </span>
                <Trash className="h-3.5 w-3.5 ml-1.5 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CartItem;
