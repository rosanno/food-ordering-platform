import { format } from "date-fns";

import prisma from "@/lib/prisma";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const BlogDetailsPage = async ({
  params,
}: {
  params: { blogSlug: string };
}) => {
  let decodedUrl = params.blogSlug.replace(/%3A/g, ":");

  const blog = await prisma.blog.findFirst({
    where: {
      blogSlug: decodedUrl,
    },
    include: {
      author: true,
      categories: {
        include: {
          blogCategory: true,
        },
      },
    },
  });

  const createdAt = format(
    blog?.createdAt!!,
    "d MMMM, yyyy"
  );

  return (
    <Card className="py-10 px-10">
      <CardContent>
        <header className="flex justify-center">
          <div className="w-[450px] text-center">
            <h1 className="text-3xl font-[400] leading-10 mb-2.5">
              {blog?.title}
            </h1>
            <span className="text-sm text-muted-foreground">
              {createdAt} {" • "}
            </span>
            <span className="text-sm text-muted-foreground">
              Author - {blog?.author.name}
            </span>
          </div>
        </header>
        <section className="mt-14">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src={blog?.cover as string}
              alt="cover"
              height={950}
              width={950}
              className="h-[650px] w-full"
            />
          </div>
          <div className="mt-10">
            <div
              dangerouslySetInnerHTML={{
                __html: blog?.content as string,
              }}
            />
          </div>
        </section>
      </CardContent>
    </Card>
  );
};

export default BlogDetailsPage;
