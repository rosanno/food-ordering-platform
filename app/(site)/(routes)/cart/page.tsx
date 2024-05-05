import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

import CartItem from "./_components/cart-item";
import OrderSummary from "./_components/order-summary";

export const metadata: Metadata = {
  title: "Cart",
};

const CartPage = async () => {
  const { userId } = auth();

  const cart = await prisma.cart.findFirst({
    where: {
      customerId: userId as string,
    },
    include: {
      items: {
        include: {
          menu: {
            include: {
              restaurant: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="mt-20 grid grid-cols-12 gap-5">
      <CartItem cart={cart} />
      <OrderSummary cart={cart} />
    </div>
  );
};

export default CartPage;
