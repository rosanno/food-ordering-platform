import prisma from "@/lib/prisma";

import Header from "@/components/ui/header";
import MenuForm from "@/components/ui/menu-form";
import Card from "@/components/ui/card";

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
      <div className="lg:px-5 py-2">
        <Header title="Add Menu" />
        <MenuForm restaurantId={restaurant?.id} />
      </div>
    </Card>
  );
};

export default CreateRestaurantPage;
