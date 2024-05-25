import slugify from "slugify";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { restaurantId: string } }
) {
  try {
    const {
      title,
      content,
      cover,
      metaTitle,
      metaDescription,
      categories,
    } = await request.json();

    const slug = slugify(title).toLowerCase();

    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        cover,
        blogSlug: slug,
        metaTitle,
        metaDescription,
        restaurantId: params.restaurantId,
        categories: {
          create: categories.map((categoryId: any) => ({
            blogCategory: {
              connect: {
                id: categoryId,
              },
            },
          })),
        },
      },
    });

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.log("[BLOG_POST]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
