import prisma from "@/lib/prisma";
import Item from "./_components/item";

const MenuPage = async () => {
  const menu = await prisma.menu.findMany();

  return (
    <section className="mt-56">
      <div className="flex flex-wrap gap-6">
        {menu.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default MenuPage;
