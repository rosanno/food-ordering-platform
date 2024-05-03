import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

import FavoriteItem from "./_components/favorite-item";

const FavoritePage = async () => {
  const { userId } = auth();

  const favorites = await prisma.favorite.findFirst({
    where: {
      customerId: userId as string,
    },
    include: {
      favoriteItem: {
        include: {
          menu: {
            include: {
              restaurant: true,
            },
          },
        },
      },
    },
  });

  return (
    <section className="pt-11">
      <div className="space-y-3.5">
        {favorites?.favoriteItem.map((item) => (
          <FavoriteItem key={item.id} favoriteItem={item} />
        ))}
      </div>
    </section>
  );
};

export default FavoritePage;
