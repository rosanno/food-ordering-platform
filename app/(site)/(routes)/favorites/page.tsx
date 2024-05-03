import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

import FavoriteItem from "./_components/favorite-item";
import { Separator } from "@/components/ui/separator";

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
      <h1 className="font-medium">My Wish List</h1>
      <Separator className="my-2.5" />
      <div className="space-y-3.5 mt-6">
        {favorites?.favoriteItem.map((item) => (
          <FavoriteItem key={item.id} favoriteItem={item} />
        ))}
      </div>
    </section>
  );
};

export default FavoritePage;
