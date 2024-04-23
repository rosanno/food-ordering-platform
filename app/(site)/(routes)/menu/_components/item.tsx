"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Menu } from "@prisma/client";

import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ItemProps {
  item: Menu;
}

const Item = ({ item }: ItemProps) => {
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
      <Link href={`/menu/${item.slug}`}>
        <div className="flex items-center justify-center">
          <Image
            src={item.imageUrl!!}
            alt={item.menuName}
            height={350}
            width={350}
            className="
            -mt-32
            w-full
            h-full
            object-contain
          "
          />
        </div>
        <div className="space-y-3 mt-4">
          <h4 className="truncate text-sm capitalize">
            {item.menuName}
          </h4>
          <p
            className="
              text-muted-foreground 
              text-[13px] 
              font-medium
            "
          >
            {formatCurrency(parseInt(item.price), "PHP")}
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
          onClick={(e) => e.preventDefault()}
        >
          Order
        </Button>
        <Button
          size={"icon"}
          variant={"outline"}
          className="rounded-full"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Item;
