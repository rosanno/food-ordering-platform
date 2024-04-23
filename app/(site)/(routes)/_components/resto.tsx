"use client";

import Image from "next/image";
import { Restaurant } from "@prisma/client";
import { GoStarFill } from "react-icons/go";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import Link from "next/link";

interface RestaurantProps {
  restaurant: Restaurant;
}

const Resto = ({ restaurant }: RestaurantProps) => {
  return (
    <Link href={`/restaurant/${restaurant.slug}`}>
      <div className="bg-gray-100/65 rounded-lg overflow-hidden my-12">
        <div>
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            height={340}
            width={340}
            className="h-full md:h-48 lg:h-48 w-full object-cover"
          />
        </div>
        <div className="p-4 space-y-2.5">
          <h4 className="font-medium pb-0.5">
            {restaurant.name}.
          </h4>
          <div className="flex items-center gap-1 text-[13px] text-muted-foreground">
            <FaMapMarkerAlt />
            <span>
              {restaurant.country}, {restaurant.city}
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
            <span className="text-[13px]">Delivery</span>,
            <span className="text-[13px]">Pickup</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Resto;
