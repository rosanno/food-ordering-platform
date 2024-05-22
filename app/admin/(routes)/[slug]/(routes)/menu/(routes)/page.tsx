import { format } from "date-fns";
import prisma from "@/lib/prisma";

import Header from "@/components/ui/header";
import Client from "./_components/client";
import { Menu } from "./_components/column";
import Card from "@/components/ui/card";

const ManageRestaurantPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      slug: params.slug,
    },
  });

  const menu = await prisma.menu.findMany({
    where: {
      restaurantId: restaurant?.id,
    },
    include: { restaurant: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  const transformMenu: Menu[] = menu.map((item) => ({
    id: item.id,
    menuName: item.menuName,
    image: item.imageUrl as string,
    restaurant: item.restaurant?.name as string,
    slug: item.slug,
    createdAt: format(item.createdAt, "d MMMM, yyyy"),
    updatedAt: format(item.updatedAt, "d MMMM, yyyy"),
  }));

  return (
    <>
      <Card>
        <Header title="Menu List" />
        <Client data={transformMenu} />
      </Card>
    </>
  );
};

export default ManageRestaurantPage;
