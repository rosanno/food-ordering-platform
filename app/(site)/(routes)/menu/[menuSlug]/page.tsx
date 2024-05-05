import prisma from "@/lib/prisma";

import MenuDetails from "./_components/menu-details";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu Details",
};

const MenuDetailsPage = async ({
  params,
}: {
  params: { menuSlug: string };
}) => {
  const menu = await prisma.menu.findFirst({
    where: {
      slug: params.menuSlug,
    },
    include: {
      restaurant: true,
      favoriteItem: {
        include: {
          favorite: true,
        },
      },
    },
  });

  return (
    <div className="mt-32 md:mt-20">
      <MenuDetails item={menu} />
    </div>
  );
};

export default MenuDetailsPage;
