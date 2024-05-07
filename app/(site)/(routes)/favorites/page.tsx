import { Metadata } from "next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

import FavoriteItem from "./_components/favorite-item";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Wish List",
};

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
        {favorites?.favoriteItem.length! > 0 ? (
          <>
            {favorites?.favoriteItem.map((item) => (
              <FavoriteItem
                key={item.id}
                favoriteItem={item}
              />
            ))}
          </>
        ) : (
          <p className="text-muted-foreground text-sm">
            No item in wish list
          </p>
        )}
      </div>
    </section>
  );
};

export default FavoritePage;
