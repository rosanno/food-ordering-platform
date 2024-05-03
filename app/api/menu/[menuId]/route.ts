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
    description,
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
        description,
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

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: { menuId: string };
  }
) {
  try {
    if (!params.menuId) {
      return new NextResponse("Invalid menu id", {
        status: 400,
      });
    }

    await prisma.menu.delete({
      where: {
        id: params.menuId,
      },
    });

    return NextResponse.json({
      message: "Menu deleted",
    });
  } catch (error) {
    console.log("[DELETE_PATCH]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
