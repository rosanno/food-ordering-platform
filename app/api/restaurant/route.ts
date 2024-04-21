import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, country, city, imageUrl } =
    await request.json();
  const { userId } = auth();

  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        ownerId: userId!!,
        country,
        city,
        imageUrl,
      },
    });

    return NextResponse.json({
      restaurant,
      message: "Restaurant created",
    });
  } catch (error) {
    console.log("[RESTAURANT_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
