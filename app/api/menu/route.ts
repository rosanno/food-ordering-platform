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
    const menu = await prisma.menu.create({
      data: {
        menuName,
        price,
        discount,
        metaTitle,
        metaKeywords,
      },
    });

    return NextResponse.json({
      data: menu,
      message: "Restaurant created!",
    });
  } catch (error) {
    console.log("[RESTAURANT_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
