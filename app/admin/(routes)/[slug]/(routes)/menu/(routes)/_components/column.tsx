import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

import CellAction from "./cell-actions";

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
    accessorKey: "image",
    header: "",
    cell: ({ row }) => {
      return (
        <div className="bg-gray-100/70 w-fit p-2.5 rounded-md">
          <Image
            src={row.getValue("image")}
            alt={row.getValue("menuName")}
            height={70}
            width={70}
            className="h-12 w-12 object-contain"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "menuName",
    header: "Menu",
    cell: ({ row }) => {
      return (
        <p className="text-sm">
          {row.getValue("menuName")}
        </p>
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
