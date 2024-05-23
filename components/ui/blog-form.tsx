"use client";

import * as z from "zod";
import dynamic from "next/dynamic";
import Image from "next/image";
import { toast } from "sonner";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ControllerRenderProps,
  useForm,
} from "react-hook-form";
import axios from "axios";

import { BlogCategory } from "@prisma/client";
import { UploadDropzone } from "@/lib/uploadthing";

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
import { Checkbox } from "./checkbox";
import DatePicker from "@/components/date-picker";
import AddCategory from "@/components/add-category";
import BlogImagePriview from "@/components/blog-image-priview";

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
  const [key, setKey] = useState("");
  const [imageName, setImageName] = useState("");

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

  const onDeleteImage = async (
    field: ControllerRenderProps<any, "cover">
  ) => {
    try {
      await axios.delete("/api/uploadthing", {
        data: {
          key,
        },
      });
      field.onChange((field.value = ""));
    } catch (error) {
      toast.error("Something went wrong");
    }
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
        <div className="w-[310px] space-y-4">
          <div className="border py-3 px-4 rounded-md">
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
          </div>
          <div className="border py-3 rounded-md">
            <FormField
              control={form.control}
              name="categories"
              render={() => (
                <FormItem>
                  <div className="flex items-center gap-1.5 pb-3.5 mb-4 px-4 border-b">
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
                          <FormItem
                            key={item.id}
                            className="px-4"
                          >
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
                                            value !==
                                            item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-[13px] font-normal ml-2.5">
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
          <div className="border py-3 px-4 rounded-md">
            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Image</FormLabel>
                  <FormControl>
                    <>
                      {field.value ? (
                        <BlogImagePriview
                          field={field}
                          imageName={imageName}
                          onDeleteImage={onDeleteImage}
                        />
                      ) : (
                        <UploadDropzone
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            field.onChange(res[0].url);
                            setKey(res[0].key);
                            setImageName(res[0].name);
                          }}
                          onUploadError={(error: Error) => {
                            toast.error(
                              "something went wrong"
                            );
                          }}
                        />
                      )}
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default BlogForm;
