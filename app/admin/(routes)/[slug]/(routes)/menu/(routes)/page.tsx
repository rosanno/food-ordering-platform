import prisma from "@/lib/prisma";
import Header from "@/components/ui/header";
import MenuItems from "./_components/menu-items";

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
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <Header title="Menu List" />
      <MenuItems menu={menu} />
    </>
  );
};

export default ManageRestaurantPage;
