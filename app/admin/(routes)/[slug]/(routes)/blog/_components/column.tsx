"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type Blog = {
  id: string;
  title: string;
  author: string;
  categories: string;
  blogSlug: string;
  status: boolean;
  date: string;
};

export const columns: ColumnDef<Blog>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "categories",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const isPublished = row.original.status
        ? "Pusblish"
        : "Unpublished";

      return (
        <div>
          <p>{isPublished}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
