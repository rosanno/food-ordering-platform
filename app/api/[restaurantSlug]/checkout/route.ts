import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";

export async function POST(
  request: NextRequest,
  { params }: { params: { restaurantSlug: string } }
) {
  try {
    const { menuIds } = await request.json();
    const { userId } = auth();

    if (!menuIds || menuIds.length === 0) {
      return new NextResponse("Menu ids are required", {
        status: 400,
      });
    }

    const restaurant = await prisma.restaurant.findFirst({
      where: {
        slug: params.restaurantSlug,
      },
    });

    const menu = await prisma.menu.findMany({
      where: {
        id: {
          in: menuIds,
        },
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      [];

    menu.forEach((item) => {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: item.menuName,
          },
          unit_amount: parseInt(item.price),
        },
      });
    });

    const order = await prisma.order.create({
      data: {
        restaurantId: restaurant?.id as string,
        customerId: userId as string,
        status: "place",
        orderItems: {
          create: menuIds.map((menuId: string) => ({
            menu: {
              connect: {
                id: menuId,
              },
            },
          })),
        },
      },
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${process.env.FRONTEND_RESTAURANT_URL}/cart?success=1`,
      cancel_url: `${process.env.FRONTEND_RESTAURANT_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log("[CHECKOUT_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
