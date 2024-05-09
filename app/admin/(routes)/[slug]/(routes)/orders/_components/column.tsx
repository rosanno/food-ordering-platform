"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./cell-actions";
import Image from "next/image";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: string;
  menu: string;
  image: string;
  customer: string;
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
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <div className="bg-gray-100 rounded-md p-2">
            <Image
              src={row.original.image}
              alt="menu image"
              height={40}
              width={40}
            />
          </div>
          <p>{row.original.menu}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "status",
    header: "Status",
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
