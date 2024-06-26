import { Metadata } from "next";
import prisma from "@/lib/prisma";

import RestaurantDetails from "./_components/restaurant-details";
import RestaurantMenu from "./_components/restaurant-menu";

export const metadata: Metadata = {
  title: "Restaurant Menu",
};

const RestaurantDetailsPage = async ({
  params,
  searchParams,
}: {
  params: { restaurantSlug: string };
  searchParams?: { query?: string };
}) => {
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      slug: params.restaurantSlug,
    },
    include: {
      menu: {
        include: {
          favoriteItem: {
            include: {
              favorite: true,
            },
          },
        },
        where: {
          OR: [
            {
              menuName: {
                contains:
                  searchParams?.query?.toString() || "",
                mode: "insensitive",
              },
            },
          ],
        },
      },
    },
  });

  return (
    <>
      <RestaurantDetails restaurant={restaurant} />
      <RestaurantMenu menu={restaurant?.menu} />
    </>
  );
};

export default RestaurantDetailsPage;
