import prisma from "@/lib/prisma";

import Resto from "./resto";

const Restaurants = async () => {
  const restaurants = await prisma.restaurant.findMany();

  return (
    <section className="mt-32 lg:mt-60 lg:px-16">
      <div className="text-center">
        <h4 className="text-2xl font-semibold">
          Nearby Retaurants
        </h4>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-3">
        {restaurants.map((item) => (
          <Resto key={item.id} restaurant={item} />
        ))}
      </div>
    </section>
  );
};

export default Restaurants;
