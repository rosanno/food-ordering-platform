import { format } from "date-fns";

import prisma from "@/lib/prisma";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
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
    categories: blog.categories,
    blogSlug: blog.blogSlug,
    status: blog.isPublish,
    date: format(blog.createdAt, "d MMMM, yyyy"),
  }));

  return (
    <Card>
      <CardHeader className="p-0">
        <div className="pb-2 pt-8 px-6 flex justify-between items-center">
          <div>
            <CardTitle className="pb-1">Blogs</CardTitle>
            <CardDescription>
              Manage your created blogs
            </CardDescription>
          </div>
          <div>
            <Button size="sm" className="w-52 rounded-full">
              Create Post
            </Button>
          </div>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="mt-5">
        <Client data={transformBlog} />
      </CardContent>
    </Card>
  );
};

export default BlogPage;
