"use client";

import Image from "next/image";
import { useState } from "react";
import { Minus, Plus, Trash } from "lucide-react";
import { CartItem, Menu, Restaurant } from "@prisma/client";
import { formatCurrency } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface ItemWithMenu extends CartItem {
  menu: Menu & { restaurant: Restaurant | null };
}

interface CustomerItemProps {
  item: ItemWithMenu;
  loading: boolean;
  updateQuantity: (menuId: string, qty: number) => void;
  deleteCartItem: (menuId: string) => void;
}

const CustomerItem = ({
  item,
  loading,
  updateQuantity,
  deleteCartItem,
}: CustomerItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const updateQty = (increase?: boolean) => {
    if (increase) {
      setQuantity((prevQty) => {
        const newQty = prevQty + 1;
        updateQuantity(item.menuId, newQty);
        return newQty;
      });
    } else {
      setQuantity((prevQty) => {
        const newQty = prevQty - 1;
        updateQuantity(item.menuId, newQty);
        return newQty;
      });
    }
  };

  return (
    <div className="border rounded-md px-3.5 py-3 flex justify-between">
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
              w-max  
              rounded-md 
              mt-3
          "
          >
            <button
              onClick={() => updateQty()}
              disabled={quantity <= 1 || loading}
              className="bg-gray-100 py-1.5 px-1 rounded-tl-md rounded-bl-md overflow-hidden"
            >
              <Minus className="h-3.5 w-3.5 text-[#EBB535]" />
            </button>
            <input
              type="text"
              defaultValue={quantity || ""}
              disabled
              className="text-center w-8 outline-none text-sm"
            />
            <button
              onClick={() => updateQty(true)}
              disabled={loading}
              className="bg-gray-100 py-1.5 px-1 rounded-tr-md rounded-br-md overflow-hidden"
            >
              <Plus className="h-3.5 w-3.5 text-[#EBB535]" />
            </button>
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
          disabled={loading}
          onClick={() => deleteCartItem(item.menuId)}
        >
          <span className="text-[12px] text-red-500">
            Delete
          </span>
          <Trash className="h-3.5 w-3.5 ml-1.5 text-red-500" />
        </Button>
      </div>
    </div>
  );
};

export default CustomerItem;
