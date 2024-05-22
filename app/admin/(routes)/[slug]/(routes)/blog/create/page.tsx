import prisma from "@/lib/prisma";

import BlogForm from "@/components/ui/blog-form";
import Card from "@/components/ui/card";
import Header from "@/components/ui/header";

const CreateBlogPage = async () => {
  const blogCategories = await prisma.blogCategory.findMany(
    {}
  );

  return (
    <Card className="pt-4 pb-7">
      <Header title="Add New Blog" />
      <BlogForm blogCategories={blogCategories} />
    </Card>
  );
};

export default CreateBlogPage;
