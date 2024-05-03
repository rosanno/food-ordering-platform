import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    const { menuId } = await request.json();

    if (!userId) {
      return NextResponse.json({
        message: "Unauthenticated",
      });
    }

    const userFavorite = await prisma.favorite.findFirst({
      where: {
        customerId: userId,
      },
      include: { favoriteItem: true },
    });

    if (!userFavorite) {
      await prisma.favorite.create({
        data: {
          customerId: userId,
          favoriteItem: {
            create: {
              menuId,
            },
          },
        },
      });

      return NextResponse.json({
        message: "Added to favorite",
      });
    }

    const alreadyFavorite = userFavorite?.favoriteItem.find(
      (item) => item.menuId === menuId
    );

    if (alreadyFavorite) {
      await prisma.favoriteItem.delete({
        where: {
          id: alreadyFavorite.id,
        },
      });

      return NextResponse.json({
        message: "Removed from favorite",
      });
    } else {
      await prisma.favoriteItem.create({
        data: {
          favoriteId: userFavorite.id,
          menuId,
        },
      });

      return NextResponse.json({
        message: "Added to favorite",
      });
    }

  } catch (error) {
    console.log("[FAVORITES_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
