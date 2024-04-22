import prisma from "@/lib/prisma";
import Header from "@/components/ui/header";
import MenuItems from "./_components/menu-items";

const ManageRestaurantPage = async () => {
  const menu = await prisma.menu.findMany({
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
