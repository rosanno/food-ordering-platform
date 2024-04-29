import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const { data } = await req.json();

    const cart = await prisma.cart.findFirst({
      where: {
        customerId: userId as string,
      },
      include: { items: true },
    });

    const existingItem = cart?.items.find(
      (item) => item.menuId === data.menuId
    );

    if (!existingItem || !cart) {
      await prisma.cart.create({
        data: {
          customerId: userId as string,
          items: {
            create: {
              menuId: data.menuId,
              quantity: data.quantity,
            },
          },
        },
      });
    } else {
      const res = await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + data.quantity,
        },
      });

      console.log(res);
    }

    return NextResponse.json({
      message: "Added to cart.",
    });
  } catch (error) {
    console.log("[CART_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
