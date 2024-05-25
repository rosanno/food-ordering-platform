import prisma from "@/lib/prisma";

import BlogForm from "@/components/ui/blog-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CreateBlogPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const blogCategories = await prisma.blogCategory.findMany(
    {}
  );

  const restaurant = await prisma.restaurant.findFirst({
    where: {
      slug: params.slug,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new blog</CardTitle>
      </CardHeader>
      <CardContent>
        <BlogForm
          blogCategories={blogCategories}
          restaurantId={restaurant?.id}
        />
      </CardContent>
    </Card>
  );
};

export default CreateBlogPage;
