import prisma from "@/lib/prisma";

import Item from "./_components/item";

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
    <section className="mt-64">
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
  );
};

export default MenuPage;
