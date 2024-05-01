import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { menuId: string } }
) {
  try {
    const { userId } = auth();
    const { quantity } = await request.json();

    if (!userId) {
      return NextResponse.json({
        message: "Unauthenticated",
      });
    }

    const cart = await prisma.cart.findFirst({
      where: {
        customerId: userId as string,
      },
      include: { items: true },
    });

    const existingItem = cart?.items.find(
      (item) => item.menuId === params.menuId
    );

    if (existingItem) {
      await prisma.cartItem.update({
        where: {
          id: existingItem.id,
        },
        data: {
          quantity,
        },
      });
    } else {
      return NextResponse.json({
        message: "Menu not found in the cart",
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("[CART_PATCH]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { menuId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({
        message: "Unauthenticated",
      });
    }

    const cart = await prisma.cart.findFirst({
      where: {
        customerId: userId as string,
      },
      include: { items: true },
    });

    const existingItem = cart?.items.find(
      (item) => item.menuId === params.menuId
    );

    if (existingItem) {
      await prisma.cartItem.delete({
        where: {
          id: existingItem.id,
        },
      });
    } else {
      return NextResponse.json({
        message: "Menu not found in the cart",
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("[CART_DELETE]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}