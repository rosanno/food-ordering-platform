"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import {
  Favorite,
  FavoriteItem,
  Menu,
} from "@prisma/client";
import { IoMdHeart } from "react-icons/io";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

import { Button } from "@/components/ui/button";

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
  const router = useRouter();
  const { isSignedIn, userId } = useAuth();

  const isFavoriteIndex = item?.favoriteItem.findIndex(
    (favItem) =>
      favItem.favorite?.customerId === userId &&
      favItem.menuId === item.id
  );

  const handleOrder = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
    } else {
    }
  };

  const handleFavorite = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
    } else {
    }
  };

  return (
    <div
      className="
        bg-gray-100/30
        px-5
        py-2
        w-full
        rounded-lg 
        shadow-md 
        transition-all
        duration-300
        mb-32
    "
    >
      <Link href={`/menu/${item?.slug}`}>
        <div className="flex items-center justify-center">
          <Image
            src={item?.imageUrl as string}
            alt={item?.menuName as string}
            height={350}
            width={350}
            className="
            -mt-32
            w-full
            h-full
            md:w-48
            md:h-48
            object-contain
          "
          />
        </div>
        <div className="space-y-3 mt-4">
          <h4 className="truncate text-sm capitalize">
            {item?.menuName}
          </h4>
          <p
            className="
              text-muted-foreground 
              text-[13px] 
              font-medium
            "
          >
            {item &&
              formatCurrency(parseInt(item.price), "PHP")}
          </p>
        </div>
      </Link>
      <div
        className="
          py-1.5 
          mt-2 
          flex 
          items-center 
          justify-between 
          gap-2.5
        "
      >
        <Button
          size={"sm"}
          variant={"outline"}
          className="w-full flex-1"
          onClick={handleOrder}
        >
          Order
        </Button>
        <Button
          size={"icon"}
          variant={"outline"}
          className="rounded-full"
          onClick={handleFavorite}
        >
          {isFavoriteIndex ? (
            <Heart className="h-4 w-4" />
          ) : (
            <IoMdHeart className="text-yellow-500 text-xl" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Item;
