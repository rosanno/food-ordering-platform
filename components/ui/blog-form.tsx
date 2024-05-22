"use client";

import * as z from "zod";
import dynamic from "next/dynamic";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BlogCategory } from "@prisma/client";

const Editor = dynamic(
  () => import("@/components/editor"),
  {
    ssr: false,
  }
);

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "./form";
import { Input } from "./input";
import DatePicker from "@/components/date-picker";
import AddCategory from "@/components/add-category";
import { Checkbox } from "./checkbox";

interface BlogFormProps {
  blogCategories?: BlogCategory[];
}

const formSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(220).max(1000),
  cover: z.string(),
  metaTitle: z.string().min(20).max(100),
  metaDescription: z.string().min(20).max(200),
  publishedDate: z.string(),
  categories: z
    .array(z.string())
    .refine((value) => value.some((item) => item)),
});

const BlogForm = ({ blogCategories }: BlogFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      cover: "",
      metaTitle: "",
      metaDescription: "",
      publishedDate: "",
      categories: [""],
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-5"
      >
        <div className="space-y-4 flex-1">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Blog title"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Editor field={field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="metaTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="metaDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meta Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="w-[270px] space-y-4">
          <FormField
            control={form.control}
            name="publishedDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Published Date</FormLabel>
                <FormControl>
                  <DatePicker field={field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={() => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel>Categories</FormLabel>
                  <AddCategory />
                </div>
                {blogCategories?.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="categories"
                    render={({ field }) => {
                      return (
                        <FormItem key={item.id}>
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(
                                item.id
                              )}
                              onCheckedChange={(
                                checked
                              ) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      item.id,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) =>
                                          value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.name}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};

export default BlogForm;
