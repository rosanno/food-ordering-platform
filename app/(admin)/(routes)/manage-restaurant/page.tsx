import { IoRestaurantOutline } from "react-icons/io5";
import { format } from "date-fns";

import prisma from "@/lib/prisma";
import { DataTable } from "./_components/data-table";
import { Restaurant, columns } from "./_components/column";

const ManageRestaurantPage = async () => {
  const restaurants = await prisma.restaurant.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const transformRestaurant: Restaurant[] = restaurants.map(
    (item) => ({
      id: item.id,
      name: item.restaurantName,
      country: item.country,
      city: item.city,
      createdAt: format(item.createdAt, "d MMMM, yyyy"),
    })
  );

  return (
    <>
      <section className="space-y-10">
        <div className="flex items-center space-x-2.5">
          <div className="bg-black rounded-full p-1.5">
            <IoRestaurantOutline className="text-xl text-white" />
          </div>
          <h1 className="font-semibold text-lg tracking-wide">
            Manage Restaurant
          </h1>
        </div>
        <div className="border-b" />
      </section>
      <DataTable
        columns={columns}
        data={transformRestaurant}
      />
    </>
  );
};

export default ManageRestaurantPage;
