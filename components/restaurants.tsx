import prisma from "@/lib/prisma";

import Resto from "./resto";
import { MotionDiv } from "./motion-div";

const Restaurants = async () => {
  const restaurants = await prisma.restaurant.findMany();

  return (
    <section className="mt-52 lg:mt-72 lg:px-2">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        whileInView={{
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            delay: 0.3,
          },
        }}
        viewport={{
          once: true,
        }}
        className="text-center"
      >
        <h4 className="text-2xl font-semibold">
          Nearby Retaurants
        </h4>
      </MotionDiv>
      <MotionDiv
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          delay: 0.6,
        }}
        className="grid md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-5"
      >
        {restaurants.map((item) => (
          <Resto key={item.id} restaurant={item} />
        ))}
      </MotionDiv>
    </section>
  );
};

export default Restaurants;
