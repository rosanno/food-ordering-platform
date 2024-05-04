import prisma from "@/lib/prisma";

import Header from "@/components/ui/header";
import MenuForm from "@/components/ui/menu-form";

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
    <div className="lg:px-10">
      <Header title="Add Menu" />
      <MenuForm restaurantId={restaurant?.id} />
    </div>
  );
};

export default CreateRestaurantPage;
