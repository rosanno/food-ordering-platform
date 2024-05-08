"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: string;
  menu: string;
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
    accessorKey: "menu",
    header: "Menu",
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
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
