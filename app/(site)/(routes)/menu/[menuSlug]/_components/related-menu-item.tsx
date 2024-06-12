"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { GoStarFill } from "react-icons/go";
import { Heart, ShoppingCart } from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import {
  Favorite,
  FavoriteItem,
  Menu,
} from "@prisma/client";
import useHandleOrder from "@/hooks/use-handler-order";

import { Button } from "@/components/ui/button";
import useFavoriteHandler from "@/hooks/use-favorite-handler";
import { IoMdHeart } from "react-icons/io";


interface RelatedMenuItemProps {
  item: Menu | any;
}

const RelatedMenuItem = ({
  item,
}: RelatedMenuItemProps) => {
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
    item?.id as string,
    isSignedIn,
    setLoading
  );

  const isFavoriteIndex = item?.favoriteItem.findIndex(
    (favItem: any) =>
      favItem.favorite?.customerId === userId &&
      favItem.menuId === item.id
  );

  return (
    <div className="rounded-md shadow relative">
      <Link href={`/menu/${item?.slug}`}>
        <div className="h-36 bg-gray-200/25">
          <Image
            src={item?.imageUrl!}
            alt={item?.menuName!}
            height={400}
            width={400}
            className="object-cover h-full w-full"
          />
        </div>
        <div className="p-2.5">
          <h4 className="text-sm truncate">
            {item?.menuName}
          </h4>
          <div className="flex items-center gap-1 pt-1.5">
            {[1, 2, 3, 4, 5].map((_) => (
              <GoStarFill
                key={_}
                className="text-[#FFA71E] text-[12px]"
              />
            ))}
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-between px-2.5 py-1">
        <p className="text-sm text-[#FFA71E]">
          {item?.price !== undefined &&
            formatCurrency(parseInt(item?.price), "PHP")}
        </p>
        <Button
          size={"icon"}
          variant={"ghost"}
          onClick={handleOrder}
          disabled={loading}
        >
          <ShoppingCart className="h-4 w-4 text-[#FFA71E]" />
        </Button>
      </div>
      <div
        role="button"
        onClick={handleFavorite}
        className="absolute z-20 top-2 right-2.5 border rounded-full p-1.5 bg-white/75"
      >
        {isFavoriteIndex ? (
          <Heart className="size-4 text-black" />
        ) : (
          <IoMdHeart className="text-[#FFA71E] text-xl" />
        )}
      </div>
    </div>
  );
};

export default RelatedMenuItem;
