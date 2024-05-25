"use client";

import { DataTable } from "@/components/ui/data-table";
import { Blog, columns } from "./column";

interface ClientProps {
  data: Blog[];
}

const Client = ({ data }: ClientProps) => {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="title"
    />
  );
};

export default Client;
