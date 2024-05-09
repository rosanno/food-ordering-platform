import { format } from "date-fns";
import prisma from "@/lib/prisma";

import Header from "@/components/ui/header";
import { Order } from "./_components/column";
import Client from "./_components/client";

const OrdersPage = async () => {
  const orders = await prisma.orderItem.findMany({
    include: {
      order: true,
      menu: true,
    },
  });

  // const totalAmount = orders.reduce((acc, item) => {
  //   return acc + parseInt(item.menu.price) * item.quantity;
  // }, 0);

  const transformOrder: Order[] = orders.map((item) => ({
    id: item.id,
    customer: item.order.customer,
    menu: item.menu.menuName,
    status: item.order.status,
    createdAt: format(item.order.createdAt, "d MMMM, yyyy"),
  }));

  return (
    <>
      <Header title="Order List" />
      <Client data={transformOrder} />
    </>
  );
};

export default OrdersPage;
