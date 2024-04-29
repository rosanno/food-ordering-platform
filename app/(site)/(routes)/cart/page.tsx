import prisma from "@/lib/prisma";

import CartItem from "./_components/cart-item";
import { auth } from "@clerk/nextjs";
import OrderSummary from "./_components/order-summary";

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
    <div className="mt-32 grid grid-cols-12 gap-5">
      <CartItem cart={cart} />
      <OrderSummary />
    </div>
  );
};

export default CartPage;
