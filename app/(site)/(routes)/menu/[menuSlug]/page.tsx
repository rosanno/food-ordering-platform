import prisma from "@/lib/prisma";

import MenuDetails from "./_components/menu-details";

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
    <div className="mt-32 md:mt-32">
      <MenuDetails item={menu} />
    </div>
  );
};

export default MenuDetailsPage;
