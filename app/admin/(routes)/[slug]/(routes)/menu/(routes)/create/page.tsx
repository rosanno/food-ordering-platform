import prisma from "@/lib/prisma";

import MenuForm from "@/components/ui/menu-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreateRestaurantPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const restaurant = await prisma.restaurant.findFirst({
    where: {
      slug: params.slug,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new menu</CardTitle>
      </CardHeader>
      <CardContent>
        <MenuForm restaurantId={restaurant?.id} />
      </CardContent>
    </Card>
  );
};

export default CreateRestaurantPage;
