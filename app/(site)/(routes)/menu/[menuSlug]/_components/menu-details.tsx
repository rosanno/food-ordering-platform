"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import {
  Favorite,
  FavoriteItem,
  Menu,
  Restaurant,
} from "@prisma/client";
import { GoStarFill } from "react-icons/go";
import { formatCurrency } from "@/lib/utils";
import { IoMdHeart } from "react-icons/io";
import useFavoriteHandler from "@/hooks/use-favorite-handler";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import useHandleOrder from "@/hooks/use-handler-order";

interface MenuWithFavoriteItem extends FavoriteItem {
  favorite: Favorite | null;
}

interface MenuDetailsProps {
  item:
    | (Menu & {
        restaurant: Restaurant | any;
        favoriteItem: MenuWithFavoriteItem[];
      })
    | null;
}

const MenuDetails = ({ item }: MenuDetailsProps) => {
  const { isSignedIn, userId } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const quantity = 1;

  const handleOrder = useHandleOrder(
    isSignedIn,
    setLoading,
    item?.id as string,
    quantity
  );

  const handleFavorite = useFavoriteHandler(
    item,
    isSignedIn,
    setLoading
  );

  const isFavoriteIndex = item?.favoriteItem.findIndex(
    (favItem) =>
      favItem.favorite?.customerId === userId &&
      favItem.menuId === item.id
  );

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
                className="text-[#FFA71E] text-sm"
              />
            ))}
          </div>
          <div className="pt-5">
            <h3 className="text-2xl text-[#FFA71E] font-medium">
              {item?.price !== undefined &&
                formatCurrency(
                  parseInt(item?.price),
                  "PHP"
                )}
            </h3>
            <Separator className="my-3" />
            <p className="text-muted-foreground text-[13px] leading-6">
              {item?.description}
            </p>
          </div>
          <div className="flex items-center gap-1.5 pt-6">
            <Button
              variant={"outline"}
              className="w-full md:w-72"
              onClick={handleOrder}
              disabled={loading}
            >
              Order now
            </Button>
            <Button
              size={"icon"}
              variant={"outline"}
              disabled={loading}
              onClick={handleFavorite}
            >
              {isFavoriteIndex ? (
                <Heart className="h-4 w-4" />
              ) : (
                <IoMdHeart className="text-[#FFA71E] text-xl" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuDetails;
