"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { formatCurrency } from "@/lib/utils";

import CellAction from "./cell-actions";
import { Button } from "@/components/ui/button";

export type Menu = {
  id: string;
  menuName: string;
  image: string;
  restaurant: string;
  price: string;
  discount: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Menu>[] = [
  {
    accessorKey: "menuName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() =>
            column.toggleSorting(
              column.getIsSorted() === "asc"
            )
          }
        >
          Menu
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <Image
            src={row.original.image}
            alt="menu image"
            height={40}
            width={40}
          />
          <p>{row.original.menuName}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "restaurant",
    header: "Restaurant",
    cell: ({ row }) => {
      return (
        <p className="text-sm">
          {row.getValue("restaurant")}
        </p>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return (
        <p>
          {formatCurrency(
            parseInt(row.original.price),
            "PHP"
          )}
        </p>
      );
    },
  },
  {
    accessorKey: "discount",
    header: "Discount",
    cell: ({ row }) => {
      // const discount = parseInt(row.original.discount);

      return <p>0%</p>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    cell: ({ row }) => {
      return (
        <p className="text-sm">
          {row.getValue("createdAt")}
        </p>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "UpdatedAt",
    cell: ({ row }) => {
      return (
        <p className="text-sm">
          {row.getValue("updatedAt")}
        </p>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
