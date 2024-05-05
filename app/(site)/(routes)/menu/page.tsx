import { Metadata } from "next";
import prisma from "@/lib/prisma";

import Item from "./_components/item";
import { Suspense } from "react";
import Loading from "./loading";

export const metadata: Metadata = {
  title: "Menu List",
};

const MenuPage = async () => {
  const menu = await prisma.menu.findMany({
    include: {
      favoriteItem: {
        include: {
          favorite: true,
        },
      },
    },
  });

  return (
    <Suspense fallback={<Loading />}>
      <section className="mt-48">
        <div
          className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          md:grid-cols-3
          lg:grid-cols-4
          gap-10
          sm:gap-6 
          md:gap-7
        "
        >
          {menu.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </div>
      </section>
    </Suspense>
  );
};

export default MenuPage;
