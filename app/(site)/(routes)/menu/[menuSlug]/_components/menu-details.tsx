"use client";

import Image from "next/image";
import { Menu, Restaurant } from "@prisma/client";
import { GoStarFill } from "react-icons/go";
import { formatCurrency } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface MenuDetailsProps {
  item:
    | (Menu & {
        restaurant: Restaurant | any;
      })
    | null;
}

const MenuDetails = ({ item }: MenuDetailsProps) => {
  return (
    <section className="bg-gray-100/45 rounded-md shadow-sm md:p-4">
      <div className="flex md:items-center flex-col md:flex-row lg:gap-10">
        <div className="border border-gray-100/75 rounded-md p-8">
          <Image
            src={item?.imageUrl as string}
            alt={item?.menuName as string}
            height={500}
            width={500}
            className="w-full md:w-[520px]"
          />
        </div>
        <div className="space-y-1">
          <h3 className="font-medium text-2xl">
            {item?.menuName}
          </h3>
          <p className="text-sm text-muted-foreground">
            {item?.restaurant.name}
          </p>
          <div className="flex items-center gap-1.5 pt-1.5">
            {[1, 2, 3, 4, 5].map((_) => (
              <GoStarFill
                key={_}
                className="text-yellow-400 text-sm"
              />
            ))}
          </div>
          <div className="pt-5">
            <h3 className="text-2xl">
              {item?.price !== undefined &&
                formatCurrency(
                  parseInt(item?.price),
                  "PHP"
                )}
            </h3>
            <Separator className="my-3" />
            <p className="text-muted-foreground text-[13px] leading-6">
              Indulge in the perfect harmony of flavors with
              our Pasta Recipe Noodle Cooking Sauce. Dive
              into a tantalizing blend of aromatic herbs,
              rich tomatoes, and savory spices, all simmered
              to perfection.
            </p>
          </div>
          <div className="flex items-center gap-1.5 pt-6">
            <Button
              variant={"outline"}
              className="w-full md:w-72"
            >
              Order now
            </Button>
            <Button size={"icon"} variant={"outline"}>
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuDetails;
