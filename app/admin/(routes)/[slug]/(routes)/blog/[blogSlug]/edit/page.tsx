import prisma from "@/lib/prisma";

import BlogForm from "@/components/ui/blog-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const EditBlogPage = async ({
  params,
}: {
  params: { blogSlug: string };
}) => {
  const blogCategories = await prisma.blogCategory.findMany(
    {}
  );

  let decodedUrl = params.blogSlug.replace(/%3A/g, ":");

  const blog = await prisma.blog.findFirst({
    where: {
      blogSlug: decodedUrl,
    },
    include: {
      categories: {
        include: {
          blogCategory: true,
        },
      },
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Blog</CardTitle>
      </CardHeader>
      <CardContent>
        <BlogForm
          blogCategories={blogCategories}
          initialData={blog}
        />
      </CardContent>
    </Card>
  );
};

export default EditBlogPage;
