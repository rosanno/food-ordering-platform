"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DollarSign, Save, Scissors } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Menu } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormHeader from "./form-header";
import ImageUpload from "./image-upload";
import { Textarea } from "./textarea";

const formSchema = z.object({
  menuName: z
    .string()
    .min(5, {
      message: "Menu name must be at least 5 characters.",
    })
    .max(50),
  price: z
    .string()
    .min(3, {
      message: "Price must be at least 5 characters.",
    })
    .max(20),
  discount: z.string().optional(),
  imageUrl: z.string(),
  metaTitle: z
    .string()
    .min(5, {
      message: "Meta title must be at least 5 characters.",
    })
    .max(50),
  metaKeywords: z
    .string()
    .min(5, {
      message:
        "Meta keywords must be at least 5 characters.",
    })
    .max(50),
  description: z
    .string()
    .min(40, {
      message:
        "Meta keywords must be at least 5 characters.",
    })
    .max(670),
});

interface MenuFormProps {
  initialData?: Menu | null;
  restaurantId?: string;
}

const MenuForm = ({
  initialData,
  restaurantId,
}: MenuFormProps) => {
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);

  const defaultValues = initialData
    ? {
        ...initialData,
        discount: initialData.discount ?? "",
        imageUrl: initialData.imageUrl ?? "",
        description: initialData.description ?? "",
      }
    : {
        menuName: "",
        price: "",
        discount: "",
        imageUrl: "",
        metaTitle: "",
        metaKeywords: "",
        description: "",
      };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    setLoading(true);
    try {
      if (!initialData) {
        const res = await axios.post(
          `/api/menu/create/${restaurantId}`,
          values
        );

        if (res.statusText === "OK") {
          toast(res.data.message, {
            action: {
              label: "Close",
              onClick: () => console.log("Close"),
            },
            duration: 5000,
          });
        }
      } else {
        const res = await axios.patch(
          `/api/menu/${initialData.id}`,
          values
        );

        if (res.statusText === "OK") {
          toast(res.data.message, {
            action: {
              label: "Close",
              onClick: () => console.log("Close"),
            },
            duration: 5000,
          });
        }
      }
      router.push(`/admin/${params.slug}/menu`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDeleteImage = async (key: string, field: any) => {
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
    <>
      <FormHeader
        label="Menu Detail"
        description="Enter the details about your menu"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 space-y-5"
        >
          <FormField
            control={form.control}
            name="menuName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Menu Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="                      
                      ring-offset-0
                      focus-visible:ring-0 
                      focus-visible:ring-offset-0
                    "
                  />
                </FormControl>
                <FormMessage className="text-[13px]" />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-12 gap-5">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-6">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md">
                      <DollarSign
                        className="h-5 w-5 mx-3"
                        strokeWidth={1.5}
                      />
                      <Input
                        {...field}
                        className="
                          border-t-0
                          border-b-0
                          border-r-0
                          rounded-tl-none
                          rounded-bl-none
                          right-0
                          ring-offset-0 
                          focus-visible:ring-0 
                          focus-visible:ring-offset-0
                        "
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-6">
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md">
                      <Scissors
                        className="h-5 w-5 mx-3 -rotate-90"
                        strokeWidth={1.5}
                      />
                      <Input
                        {...field}
                        className="
                          border-t-0
                          border-b-0
                          border-r-0
                          rounded-tl-none
                          rounded-bl-none
                          right-0
                          ring-offset-0 
                          focus-visible:ring-0 
                          focus-visible:ring-offset-0
                        "
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-12 gap-5">
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-6">
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="
                          ring-offset-0 
                          focus-visible:ring-0 
                          focus-visible:ring-offset-0
                        "
                    />
                  </FormControl>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metaKeywords"
              render={({ field }) => (
                <FormItem className="col-span-12 md:col-span-6">
                  <FormLabel>Meta Keywords</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="
                          ring-offset-0 
                          focus-visible:ring-0 
                          focus-visible:ring-offset-0
                        "
                    />
                  </FormControl>
                  <FormMessage className="text-[13px]" />
                </FormItem>
              )}
            />
          </div>
          <div className="pt-5">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[17px] font-medium">
                    Upload Image
                  </FormLabel>
                  <FormControl>
                    <div className="flex justify-start pt-2.5">
                      <ImageUpload
                        value={field.value}
                        onChange={(imageUrl) => {
                          field.onChange(imageUrl);
                        }}
                        onRemove={(key) =>
                          onDeleteImage(key, field)
                        }
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="pt-8">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Menu description..."
                    className="                      
                      ring-offset-0
                      focus-visible:ring-0 
                      focus-visible:ring-offset-0
                    "
                    rows={10}
                  />
                </FormControl>
                <FormMessage className="text-[13px]" />
              </FormItem>
            )}
          />
          <div className="py-5 flex justify-end gap-3">
            <Button
              type="submit"
              size={"default"}
              disabled={loading}
            >
              <Save className="h-5 w-5 mr-2" />{" "}
              {initialData ? "Update" : "Save / Add"}
            </Button>
            <Button
              type="button"
              variant={"outline"}
              size={"default"}
              disabled={loading}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default MenuForm;
