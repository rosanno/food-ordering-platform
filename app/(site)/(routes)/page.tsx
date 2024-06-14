import Link from "next/link";

import prisma from "@/lib/prisma";

import Article from "@/components/article";
import Featured from "@/components/featured";
import Restaurants from "@/components/restaurants";
import Step from "@/components/step";
import MenuItem from "@/components/menu-item";
import { MotionDiv } from "@/components/motion-div";

import {
  staggerContainer,
  staggerItem,
} from "@/constants/variants";

export default async function Home() {
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
    <>
      <article
        className="
         grid
         md:grid-cols-12
         md:gap-12
         items-center
         mt-10
         md:mt-0
        "
      >
        <Article />
        <Featured />
      </article>
      <section className="mt-52 lg:mt-72">
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: "easeInOut",
          }}
        >
          <h2 className="text-2xl text-center font-semibold">
            Featured Menu
          </h2>
        </MotionDiv>
        <MotionDiv
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
           mt-16
        "
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {menu.slice(0, 8).map((item) => (
            <MotionDiv
              key={item.id}
              variants={staggerItem}
              transition={{
                duration: 0.7,
                ease: "linear",
              }}
            >
              <MenuItem item={item} />
            </MotionDiv>
          ))}
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
          className="flex justify-center mt-14"
        >
          <Link
            href="/menu"
            className="bg-yellow-500 hover:bg-opacity-75 transition duration-300 py-1.5 px-5 text-sm text-white rounded-md"
          >
            View all
          </Link>
        </MotionDiv>
      </section>
      <Step />
      <Restaurants />
    </>
  );
}
