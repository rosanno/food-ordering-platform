import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

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

    if (!cart) {
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

      return NextResponse.json({
        message: "Added to cart.",
      });
    }

    const existingItem = cart?.items.find(
      (item) => item.menuId === data.menuId
    );

    if (!existingItem) {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          menuId: data.menuId,
          quantity: data.quantity,
        },
      });
    } else {
      await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity: existingItem.quantity + data.quantity,
        },
      });
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

export async function DELETE(request: NextRequest) {
  try {
    await prisma.cartItem.deleteMany();

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.log("[CART_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}