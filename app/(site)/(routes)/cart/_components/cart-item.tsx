"use client";

import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Cart,
  CartItem as Item,
  Menu,
  Restaurant,
} from "@prisma/client";

import CustomerItem from "./customer-item";

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
  const router = useRouter();

  const updateQuantity = async (
    menuId: string,
    quantity: number
  ) => {
    try {
      await axios.patch(`/api/cart/${menuId}`, {
        quantity,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="col-span-12 md:col-span-8">
      <h3 className="text-sm font-bold">
        Cart ({cart?.items.length})
      </h3>
      <div className="space-y-5 mt-2.5">
        {cart?.items.map((item) => (
          <CustomerItem
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
          />
        ))}
      </div>
    </section>
  );
};

export default CartItem;
