import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { name, country, city, imageUrl } =
    await request.json();
  const { userId } = auth();

  const slug = slugify(name).toLowerCase();

  try {
    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        ownerId: userId!!,
        country,
        city,
        imageUrl,
        slug,
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
