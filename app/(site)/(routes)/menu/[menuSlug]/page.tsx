import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

import MenuDetails from "./_components/menu-details";

const MenuDetailsPage = async ({
  params,
}: {
  params: { menuSlug: string };
}) => {
  const { userId } = auth();

  const menu = await prisma.menu.findFirst({
    where: {
      slug: params.menuSlug,
    },
    include: {
      restaurant: true,
      favorite: {
        where: {
          customerId: userId as string,
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
