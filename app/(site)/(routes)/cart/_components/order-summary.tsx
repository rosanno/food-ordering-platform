"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Cart, CartItem, Menu } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ItemWithMenu extends CartItem {
  menu: Menu;
}

interface OrderSummaryProps {
  cart:
    | (Cart & {
        items: ItemWithMenu[];
      })
    | null;
}

const OrderSummary = ({ cart }: OrderSummaryProps) => {
  const router = useRouter();

  const total = cart?.items.reduce((acc, item) => {
    return acc + parseInt(item.menu.price) * item.quantity;
  }, 0);

  return (
    <section className="col-span-12 md:col-span-4">
      <div className="border rounded-sm px-4 py-3.5 h-full">
        <h3 className="text-sm font-bold">Order Summary</h3>
        <div className="mt-4">
          {cart?.items.map((item) => (
            <div key={item.id} className="mt-3.5">
              <div className="flex justify-between">
                <p className="text-[13px] text-muted-foreground truncate">
                  {item.quantity}x {item.menu.menuName}
                </p>
                <h4 className="text-[13px]">
                  {formatCurrency(
                    parseInt(item.menu.price),
                    "PHP"
                  )}
                </h4>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2.5 mt-5">
            <Input placeholder="Coupon Code" />
            <Button variant={"outline"}>Apply</Button>
          </div>
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-muted-foreground">
                Sub Total
              </p>
              <h4 className="text-sm">
                {formatCurrency(total!!, "PHP")}
              </h4>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[13px] text-muted-foreground">
                Discount
              </p>
              <h4 className="text-sm">-</h4>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-medium">Total</h3>
              <h4 className="text-sm">
                {" "}
                {formatCurrency(total!!, "PHP")}
              </h4>
            </div>
          </div>
          <div className="mt-7 pb-1 space-y-3">
            <Button className="w-full">
              Checkout
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
            <Button
              variant={"ghost"}
              className="w-full"
              onClick={() => router.push("/menu")}
            >
              Find Menu
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSummary;
