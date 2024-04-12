"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Restaurant = {
  id: string;
  name: string;
  country: string;
  city: string;
  createdAt: string;
};

export const columns: ColumnDef<Restaurant>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "createdAt",
    header: "Created_At",
  },
];
