import prisma from "@/lib/prisma";

import BlogForm from "@/components/ui/blog-form";
import Card from "@/components/ui/card";
import Header from "@/components/ui/header";

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
    <Card className="pt-4 pb-7">
      <Header title="Add New Blog" />
      <BlogForm
        blogCategories={blogCategories}
        restaurantId={restaurant?.id}
      />
    </Card>
  );
};

export default CreateBlogPage;
