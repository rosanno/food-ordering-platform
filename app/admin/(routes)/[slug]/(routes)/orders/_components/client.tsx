"use client";

import { DataTable } from "@/components/ui/data-table";
import { Order, columns } from "./column";

interface ClientProps {
  data: Order[];
}

const Client = ({ data }: ClientProps) => {
  return (
    <section>
      <DataTable
        columns={columns}
        data={data}
        searchKey="menu"
      />
    </section>
  );
};

export default Client;
