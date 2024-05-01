import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

const FavoritePage = async () => {
  const { userId } = auth();

  const favorites = await prisma.favorite.findMany({
    where: {
      customerId: userId as string,
    },
    include: {
      menu: true,
    },
  });

  return <div>Favorite Pages</div>;
};

export default FavoritePage;
