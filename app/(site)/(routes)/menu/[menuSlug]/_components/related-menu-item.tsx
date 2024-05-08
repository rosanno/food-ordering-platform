"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";
import { GoStarFill } from "react-icons/go";
import { ShoppingCart } from "lucide-react";

import { formatCurrency } from "@/lib/utils";
import { Menu } from "@prisma/client";
import useHandleOrder from "@/hooks/use-handler-order";

import { Button } from "@/components/ui/button";

interface RelatedMenuItem {
  item: Menu;
}

const RelatedMenuItem = ({ item }: RelatedMenuItem) => {
  const { isSignedIn, userId } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const quantity = 1;

  const handleOrder = useHandleOrder(
    isSignedIn,
    setLoading,
    item?.id as string,
    quantity
  );

  return (
    <div className="rounded-md shadow">
      <Link href={`/menu/${item.slug}`}>
        <div className="flex justify-center px-2 py-4 bg-gray-200/35">
          <Image
            src={item.imageUrl!}
            alt={item.menuName}
            height={95}
            width={95}
            className="object-contain h-28"
          />
        </div>
        <div className="p-2.5">
          <h4 className="text-sm truncate">
            {item.menuName}
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
    </div>
  );
};

export default RelatedMenuItem;
