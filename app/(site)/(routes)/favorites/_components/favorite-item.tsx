"use client";

import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import {
  ShoppingCart,
  StarIcon,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  FavoriteItem as FavItem,
  Menu,
  Restaurant,
} from "@prisma/client";
import useFavoriteHandler from "@/hooks/use-favorite-handler";
import useHandleOrder from "@/hooks/use-handler-order";
import { formatCurrency } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface FavoriteItemProps {
  favoriteItem:
    | (FavItem & {
        menu: Menu & {
          restaurant: Restaurant | null;
        };
      })
    | null;
}

const FavoriteItem = ({
  favoriteItem,
}: FavoriteItemProps) => {
  const { isSignedIn, userId } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const quantity = 1;

  const handleOrder = useHandleOrder(
    isSignedIn,
    setLoading,
    favoriteItem?.menuId as string,
    quantity
  );

  const handleFavorite = useFavoriteHandler(
    favoriteItem?.menuId!,
    isSignedIn,
    setLoading
  );

  return (
    <div className="flex bg-gray-100/50 p-2.5">
      <Link
        href={`/menu/${favoriteItem?.menu.slug}`}
        className="block w-full"
      >
        <div className="flex gap-3">
          <div className="border border-gray-100/70 rounded-md p-3">
            <Image
              src={favoriteItem?.menu.imageUrl as string}
              alt={favoriteItem?.menu.menuName as string}
              height={130}
              width={130}
              className="h-16 w-16 object-contain"
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-sm text-muted-foreground">
              {favoriteItem?.menu.menuName}
            </h3>
            <h4 className="text-[12px] text-muted-foreground truncate">
              Restaurant:{" "}
              {favoriteItem?.menu.restaurant?.name}
            </h4>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((_) => (
                <StarIcon
                  key={_}
                  className="text-[#FFB500] h-3 w-3"
                  fill="#FFB500"
                />
              ))}
            </div>
            <h4 className="pt-2 text-yellow-500 font-medium">
              {formatCurrency(
                parseInt(favoriteItem?.menu.price!!),
                "PHP"
              )}
            </h4>
          </div>
        </div>
      </Link>
      <div className="ml-auto flex flex-col justify-between">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={handleFavorite}
          disabled={loading}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
        <Button
          variant={"outline"}
          size={"icon"}
          onClick={handleOrder}
          disabled={loading}
        >
          <ShoppingCart className="h-4 w-4 text-[#FFB500]" />
        </Button>
      </div>
    </div>
  );
};

export default FavoriteItem;
