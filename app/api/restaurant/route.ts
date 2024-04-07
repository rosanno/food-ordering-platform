import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prisma from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  response: NextResponse
) {
  const { userId } = auth();
  const {
    restaurantName,
    city,
    country,
    deliveryPrice,
    estimatedDeliveryTime,
  } = await request.json();

  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        ownerId: userId!!,
        restaurantName,
        city,
        country,
        deliveryPrice,
        estimatedDeliveryTime,
      },
    });

    NextResponse.json({
      data: restaurant,
      message: "Restaurant created!",
    });
  } catch (error) {
    console.log("[RESTAURANT_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
