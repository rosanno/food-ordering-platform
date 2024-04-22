import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

import prisma from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { restaurantId: string } }
) {
  const {
    menuName,
    price,
    discount,
    imageUrl,
    metaTitle,
    metaKeywords,
  } = await request.json();

  const slug = slugify(menuName).toLowerCase();

  try {
    const menu = await prisma.menu.create({
      data: {
        menuName,
        price,
        discount,
        imageUrl,
        slug,
        metaTitle,
        metaKeywords,
        restaurantId: params.restaurantId,
      },
    });

    return NextResponse.json({
      menu,
      message: "Menu has beed created",
    });
  } catch (error) {
    console.log("[MENU_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
