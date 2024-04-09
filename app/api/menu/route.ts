import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const {
    menuName,
    price,
    discount,
    metaTitle,
    metaKeywords,
  } = await request.json();

  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        menuName,
        price,
        discount,
        metaTitle,
        metaKeywords,
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
