import { format } from "date-fns";

import prisma from "@/lib/prisma";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Blog } from "./_components/column";
import Client from "./_components/client";

const BlogPage = async () => {
  const blogs = await prisma.blog.findMany({
    include: {
      author: true,
      categories: {
        include: {
          blogCategory: true,
        },
      },
    },
  });

  const transformBlog: Blog[] = blogs.map((blog) => ({
    id: blog.id,
    title: blog.title,
    author: blog.author.name,
    categories: blog.categories[0].blogCategory.name,
    blogSlug: blog.blogSlug,
    status: blog.isPublish,
    date: format(blog.createdAt, "d MMMM, yyyy"),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blogs</CardTitle>
        <CardDescription>Manage your blogs</CardDescription>
      </CardHeader>
      <CardContent>
        <Client data={transformBlog} />
      </CardContent>
    </Card>
  );
};

export default BlogPage;
