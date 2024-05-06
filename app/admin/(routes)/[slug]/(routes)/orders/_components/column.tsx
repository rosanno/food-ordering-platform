"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: string;
  orderItems: any;
  status:
    | "place"
    | "paid"
    | "inProgress"
    | "outForDelivery"
    | "delivered";
  createdAt: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "orderItems",
    header: "Orders",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
  {
    accessorKey: "createdAt",
    header: "Created_At",
  },
];
