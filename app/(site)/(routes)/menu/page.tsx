import { Metadata } from "next";
import prisma from "@/lib/prisma";

import MenuItem from "@/components/menu-item";
import { Suspense } from "react";
import Loading from "./loading";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Menu List",
};

const MenuPage = async ({
  searchParams,
}: {
  searchParams?: { query?: string };
}) => {
  const menu = await prisma.menu.findMany({
    where: {
      OR: [
        {
          menuName: {
            contains: searchParams?.query?.toString() || "",
            mode: "insensitive",
          },
        },
      ],
    },
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
      <section className="mt-20">
        {searchParams?.query && (
          <h1 className="text-2xl font-medium mb-6">
            Search Results for:{" "}
            <span className="font-normal">
              {searchParams?.query}
            </span>
          </h1>
        )}
        {menu.length === 0 && (
          <div className="flex justify-center">
            <Image
              src="/assets/no-results.jpg"
              height={400}
              width={400}
              alt="no results"
            />
          </div>
        )}
        <div
          className="
          grid
          grid-cols-2
          sm:max-w-max
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-x-5
          gap-y-8
          sm:gap-6 
          md:gap-x-7
          md:gap-y-14
        "
        >
          {menu.map((item) => (
            <MenuItem item={item} key={item.id} />
          ))}
        </div>
      </section>
    </Suspense>
  );
};

export default MenuPage;
