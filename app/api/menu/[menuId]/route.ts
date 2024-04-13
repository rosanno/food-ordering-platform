import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { menuId: string } }
) {
  const {
    menuName,
    price,
    discount,
    imageUrl,
    metaTitle,
    metaKeywords,
  } = await request.json();

  try {
    const menu = await prisma.menu.update({
      where: {
        id: params.menuId,
      },
      data: {
        menuName,
        price,
        discount,
        imageUrl,
        metaTitle,
        metaKeywords,
      },
    });

    return NextResponse.json({
      menu,
      message: "Menu updated",
    });
  } catch (error) {
    console.log("[MENU_PATCH]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
