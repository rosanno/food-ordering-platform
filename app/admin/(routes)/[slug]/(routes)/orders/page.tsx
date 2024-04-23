import { format } from "date-fns";

import prisma from "@/lib/prisma";
import Header from "@/components/ui/header";
import { Order, columns } from "./_components/column";
import { DataTable } from "./_components/data-table";

const OrdersPage = async () => {
  const orders = await prisma.order.findMany();

  const transformOrder: Order[] = orders.map((item) => ({
    id: item.id,
    customer: item.name,
    orderItems: item.orderItems,
    status: item.status,
    totalAmount: item.totalAmount,
    createdAt: format(item.createdAt, "d MMMM, yyyy"),
  }));

  return (
    <>
      <Header title="Order List" />
      <DataTable columns={columns} data={transformOrder} />
    </>
  );
};

export default OrdersPage;