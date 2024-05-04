"use client";

import { DataTable } from "@/components/ui/data-table";
import { Menu, columns } from "./column";

interface ClientProps {
  data: Menu[];
}

const Client = ({ data }: ClientProps) => {
  return (
    <section className="mt-6">
      <DataTable
        columns={columns}
        data={data}
        searchKey="menuName"
      />
    </section>
  );
};

export default Client;
