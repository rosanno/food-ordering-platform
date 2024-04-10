import { format } from "date-fns";

import prisma from "@/lib/prisma";
import { DataTable } from "./_components/data-table";
import { Restaurant, columns } from "./_components/column";
import Header from "@/components/ui/header";

const ManageRestaurantPage = async () => {
  const menu = await prisma.menu.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(menu);

  // const transformRestaurant: Restaurant[] = restaurants.map(
  //   (item) => ({
  //     id: item.id,
  //     name: item.restaurantName,
  //     country: item.country,
  //     city: item.city,
  //     createdAt: format(item.createdAt, "d MMMM, yyyy"),
  //   })
  // );

  return (
    <>
      <Header title="Menu List" button />
      {/* <DataTable
        columns={columns}
        data={transformRestaurant}
      /> */}
    </>
  );
};

export default ManageRestaurantPage;
