import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import slugify from "slugify";

import prisma from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { blogId: string } }
) {
  const {
    title,
    content,
    cover,
    metaTitle,
    metaDescription,
    categories,
  } = await request.json();

  try {
    auth().protect();

    const slug = slugify(title).toLowerCase();

    await prisma.blog.update({
      where: {
        id: params.blogId,
      },
      data: {
        title,
        content,
        cover,
        blogSlug: slug,
        metaTitle,
        metaDescription,
        categories: {
          deleteMany: {},
        },
      },
    });

    await prisma.blog.update({
      where: {
        id: params.blogId,
      },
      data: {
        title,
        content,
        cover,
        blogSlug: slug,
        metaTitle,
        metaDescription,
        categories: {
          create: categories.map((categoryId: string) => ({
            blogCategory: {
              connect: {
                id: categoryId,
              },
            },
          })),
        },
      },
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("[BLOG_PATCH]", error);
    return new NextResponse("Internal error", {
      status: 500,
    });
  }
}
