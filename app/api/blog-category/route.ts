import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    const category = await prisma.blogCategory.create({
      data: {
        name,
      },
    });

    if (category) {
      await prisma.categoriesOnBlogs.create({
        data: {
          blogCategoryId: category.id,
        },
      });
    }

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("[CART_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
