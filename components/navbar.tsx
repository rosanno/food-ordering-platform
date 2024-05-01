import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import { MenuList } from "@/constants";

import MobileNav from "./mobile-nav";
import MainNavigation from "./main-navigation";
import Avatar from "./avatar";
import prisma from "@/lib/prisma";
import HamburgerButton from "./hamburger-button";

export default async function Navbar() {
  const { userId } = auth();

  let cartItem = [];

  if (userId) {
    const user = await prisma.cart.findFirst({
      where: {
        customerId: userId as string,
      },
    });

    cartItem = await prisma.cartItem.findMany({
      where: {
        cartId: user?.id,
      },
    });
  }

  return (
    <>
      <header
        className="
        px-2 
        py-2.5 
        md:py-4
        md:px-5
        fixed
        top-0
        inset-x-0
        z-30
        bg-white
        shadow-sm
        w-full
      "
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <Link
              href={"/"}
              className="font-extrabold md:text-lg"
            >
              Good
              <span className="text-[#FF9E0A]">Food</span>
            </Link>
            <MainNavigation />
            <div className="flex items-center gap-3.5">
              <Link href="/cart">
                <div className="relative">
                  {userId && (
                    <span
                      className="
                      absolute 
                      -top-2.5 
                      -right-2 
                      text-center 
                      text-[12px] 
                      bg-yellow-500 
                      rounded-full 
                      w-4 
                      h-4
                    "
                    >
                      {cartItem.length}
                    </span>
                  )}
                  <ShoppingCart className="h-[18px] w-[18px] text-yellow-500/85" />
                </div>
              </Link>
              <Avatar />
              <div className="block sm:hidden">
                <HamburgerButton />
              </div>
            </div>
          </div>
        </div>
      </header>
      <MobileNav menuList={MenuList} />
    </>
  );
}
