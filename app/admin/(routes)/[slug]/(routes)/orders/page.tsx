import { format } from "date-fns";
import prisma from "@/lib/prisma";

import { Order } from "./_components/column";
import Client from "./_components/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OrdersPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const orders = await prisma.orderItem.findMany({
    include: {
      order: {
        include: {
          restaurant: true,
        },
      },
      menu: true,
    },
  });

  const foundItems = orders.filter(
    (item) => item.order.restaurant.slug === params.slug
  );

  // const totalAmount = orders.reduce((acc, item) => {
  //   return acc + parseInt(item.menu.price) * item.quantity;
  // }, 0);

  const transformOrder: Order[] = foundItems.map(
    (item) => ({
      id: item.id,
      customer: item.order.customer,
      menu: item.menu.menuName,
      image: item.menu.imageUrl!,
      status: item.order.status,
      createdAt: format(
        item.order.createdAt,
        "d MMMM, yyyy"
      ),
    })
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Client data={transformOrder} />
      </CardContent>
    </Card>
  );
};

export default OrdersPage;
