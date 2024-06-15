"use client";

import { Restaurant } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { GoStarFill } from "react-icons/go";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";

import { MotionDiv } from "./motion-div";

interface RestaurantProps {
  restaurant: Restaurant[];
}

const Restaurants = ({ restaurant }: RestaurantProps) => {
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
        {restaurant.map((item) => (
          <Link
            key={item.id}
            href={`/restaurant/${item.slug}`}
            className="bg-gray-100/65 rounded-lg overflow-hidden my-5 md:my-12"
          >
            <div>
              <Image
                src={item.imageUrl}
                alt={item.name}
                height={340}
                width={340}
                className="h-full md:h-48 lg:h-48 w-full object-cover"
              />
            </div>
            <div className="p-4 space-y-2.5">
              <h4 className="font-medium pb-0.5">
                {item.name}.
              </h4>
              <div className="flex items-center gap-1 text-[13px] text-muted-foreground">
                <FaMapMarkerAlt />
                <span>
                  {item.country}, {item.city}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 text-[13px] text-yellow-500">
                  <GoStarFill />
                  <span>4.8</span>
                </div>{" "}
                <span className="text-[13px] text-muted-foreground">
                  • 1.97 km near you
                </span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <CiDeliveryTruck />{" "}
                <span className="text-[13px]">
                  Delivery
                </span>
                ,<span className="text-[13px]">Pickup</span>
              </div>
            </div>
          </Link>
        ))}
      </MotionDiv>
    </section>
  );
};

export default Restaurants;
