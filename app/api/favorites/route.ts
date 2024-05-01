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

    await prisma.favorite.create({
      data: {
        customerId: userId,
        menuId,
      },
    });

    return NextResponse.json({
      message: "Added to favorites",
    });
  } catch (error) {
    console.log("[FAVORITES_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
