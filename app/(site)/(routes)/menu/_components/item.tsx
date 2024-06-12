"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { GoStarFill } from "react-icons/go";
import {
  Favorite,
  FavoriteItem,
  Menu,
} from "@prisma/client";
import { IoMdHeart } from "react-icons/io";
import { useAuth } from "@clerk/nextjs";
import { formatCurrency } from "@/lib/utils";
import useHandleOrder from "@/hooks/use-handler-order";
import useFavoriteHandler from "@/hooks/use-favorite-handler";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface MenuWithFavoriteItem extends FavoriteItem {
  favorite: Favorite | null;
}

interface ItemProps {
  item:
    | (Menu & {
        favoriteItem: MenuWithFavoriteItem[];
      })
    | null;
}

const Item = ({ item }: ItemProps) => {
  const { isSignedIn, userId } = useAuth();
  const [loading, setLoading] = useState(false);

  const quantity = 1;

  const handleOrder = useHandleOrder(
    isSignedIn,
    setLoading,
    item?.id as string,
    quantity
  );

  const handleFavorite = useFavoriteHandler(
    item?.id!,
    isSignedIn,
    setLoading
  );

  const isFavoriteIndex = item?.favoriteItem.findIndex(
    (favItem) =>
      favItem.favorite?.customerId === userId &&
      favItem.menuId === item.id
  );

  return (
    <div className="border border-gray-100/90 cursor-pointer relative">
      <Link href={`/menu/${item?.slug}`}>
        <div className="w-full h-36 sm:h-60 md:h-44">
          <Image
            src={item?.imageUrl as string}
            alt={item?.menuName as string}
            height={400}
            width={400}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="pb-2.5 pt-3 px-3">
          <h2 className="truncate text-[0.9rem] font-medium mb-2">
            {item?.menuName}
          </h2>
          <p className="flex items-center text-[12px] text-muted-foreground">
            <GoStarFill className="text-[#FFA71E] mr-1.5" />
            (4.8)
            <span className="ml-2.5">2.3 Review</span>
          </p>
          <p
            className="
            text-[#FF9E0A]
              text-lg
              sm:text-xl
              mt-2.5
            "
          >
            {item &&
              formatCurrency(parseInt(item.price), "PHP")}
          </p>
        </div>
      </Link>
      <div
        onClick={handleFavorite}
        role="button"
        className="absolute z-20 top-2 right-2.5 border rounded-full p-1.5 bg-white/75"
      >
        {isFavoriteIndex ? (
          <Heart className="size-3.5 text-black" />
        ) : (
          <IoMdHeart className="text-[#FFA71E] text-xl" />
        )}
      </div>
      <div className="pt-4 pb-3 px-3">
        <Button
          size="sm"
          variant="warning"
          className="h-8 w-full flex-1"
          disabled={loading}
          onClick={handleOrder}
        >
          Add to basket
        </Button>
      </div>
    </div>
  );
};

export default Item;
