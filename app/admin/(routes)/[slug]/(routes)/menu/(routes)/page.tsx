import { format } from "date-fns";
import prisma from "@/lib/prisma";

import Client from "./_components/client";
import { Menu } from "./_components/column";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const ManageRestaurantPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      slug: params.slug,
    },
  });

  const menu = await prisma.menu.findMany({
    where: {
      restaurantId: restaurant?.id,
    },
    include: { restaurant: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  const transformMenu: Menu[] = menu.map((item) => ({
    id: item.id,
    menuName: item.menuName,
    image: item.imageUrl as string,
    price: item.price,
    discount: item.discount!,
    restaurant: item.restaurant?.name as string,
    slug: item.slug,
    createdAt: format(item.createdAt, "d MMMM, yyyy"),
    updatedAt: format(item.updatedAt, "d MMMM, yyyy"),
  }));

  return (
    <>
      <Card>
        <CardHeader className="p-0">
          <div className="pb-2 pt-8 px-6 flex justify-between items-center">
            <div>
              <CardTitle className="pb-1">
                Menu List
              </CardTitle>
              <CardDescription>
                Manage your restaurant menu&apos;s
              </CardDescription>
            </div>
            <div></div>
          </div>
          <Separator />
        </CardHeader>
        <CardContent>
          <Client data={transformMenu} />
        </CardContent>
      </Card>
    </>
  );
};

export default ManageRestaurantPage;
