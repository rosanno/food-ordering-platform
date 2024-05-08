import prisma from "@/lib/prisma";

import MenuDetails from "./_components/menu-details";
import { Metadata } from "next";
import RelatedMenu from "./_components/related-menu";

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

  const relatedMenu = await prisma.menu.findMany({
    where: {
      NOT: { id: menu?.id },
    },
    include: {
      favoriteItem: {
        include: {
          favorite: true,
        },
      },
    },
    take: 5,
  });

  return (
    <div className="mt-10 md:mt-16">
      <MenuDetails item={menu} />
      <RelatedMenu menu={relatedMenu} />
    </div>
  );
};

export default MenuDetailsPage;
