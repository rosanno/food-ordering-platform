import prisma from "@/lib/prisma";

import RestaurantDetails from "./_components/restaurant-details";
import RestaurantMenu from "./_components/restaurant-menu";

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
  });

  const menu = await prisma.menu.findMany({
    where: {
      OR: [
        {
          menuName: {
            contains: searchParams?.query?.toString() || "",
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return (
    <>
      <RestaurantDetails restaurant={restaurant} />
      <RestaurantMenu menu={menu} />
    </>
  );
};

export default RestaurantDetailsPage;
