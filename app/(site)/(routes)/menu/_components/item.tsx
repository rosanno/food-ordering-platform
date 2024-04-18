"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { Menu } from "@prisma/client";

import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ItemProps {
  item: Menu;
}

const Item = ({ item }: ItemProps) => {
  return (
    <Link href={`/details/${item.id}`}>
      <div
        className="
        bg-gray-100/30
        px-5
        py-2
        lg:h-[240px]
        w-full
        rounded-lg 
        shadow-md 
        transition-all
        duration-300
        mb-32
    "
      >
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
          <p className="text-muted-foreground text-sm">
            {formatCurrency(parseInt(item.price), "PHP")}
          </p>
        </div>
        <div className="py-1.5 mt-2 flex items-center justify-between gap-2.5">
          <Button
            size={"sm"}
            variant={"outline"}
            className="w-full flex-1"
            onClick={(e) => e.preventDefault()}
          >
            Order
          </Button>
          <Button size={"icon"} variant={"ghost"}>
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default Item;
