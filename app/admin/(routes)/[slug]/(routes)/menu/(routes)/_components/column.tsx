"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown } from "lucide-react";

import CellAction from "./cell-actions";
import { Button } from "@/components/ui/button";

export type Menu = {
  id: string;
  menuName: string;
  image: string;
  restaurant: string;
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
          <div className="bg-gray-100 rounded-md p-2">
            <Image
              src={row.original.image}
              alt="menu image"
              height={40}
              width={40}
            />
          </div>
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
