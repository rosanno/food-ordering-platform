"use client";

import { Restaurant } from "@prisma/client";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GoStarFill, GoClockFill } from "react-icons/go";

interface RestaurantDetailsProps {
  restaurant: Restaurant | null;
}

const RestaurantDetails = ({
  restaurant,
}: RestaurantDetailsProps) => {
  return (
    <div className="absolute inset-x-0">
      <div
        style={{
          backgroundImage: `url(${restaurant?.imageUrl})`,
        }}
        className="h-[240px] md:h-[350px] w-full object-cover"
      >
        <div
          className="
          flex 
          justify-between 
          items-end 
          h-full 
          px-2 
          md:px-2.5 
          max-w-6xl 
          mx-auto
          pb-5
        "
        >
          <div className="relative z-20">
            <h3 className="text-white text-xl md:text-3xl font-medium">
              {restaurant?.name}
            </h3>
            <div className="text-[13px] space-y-2.5 mt-4">
              <p className="flex items-center gap-2 text-gray-300/70">
                <FaMapMarkerAlt className="text-white" />
                {restaurant?.city}, {restaurant?.country}
              </p>
              <p className="flex items-center gap-2 text-gray-300/70">
                <GoStarFill className="text-yellow-400" />
                4.8 (10 reviews)
              </p>
              <p className="flex items-center gap-2 text-gray-300/70">
                <GoClockFill className="text-white" />7 AM -
                9 PM
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 relative z-20">
            <div className="bg-white px-5 py-1 rounded-md text-xs text-yellow-500">
              Open
            </div>
            <div className="bg-white px-5 py-1 rounded-md text-xs text-yellow-500">
              Delivery
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-10 hidden bg-gradient-to-r from-background-dark to-transparent sm:block" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    </div>
  );
};

export default RestaurantDetails;
