"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { DollarSign, Save, Scissors } from "lucide-react";

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
import { useState } from "react";

const formSchema = z.object({
  menuName: z
    .string()
    .min(5, {
      message: "Menu name must be at least 5 characters.",
    })
    .max(20),
  price: z
    .string()
    .min(4, {
      message: "Price must be at least 5 characters.",
    })
    .max(20),
  discount: z.string(),
  imageUrl: z.string(),
  metaTitle: z
    .string()
    .min(5, {
      message: "Meta title must be at least 5 characters.",
    })
    .max(30),
  metaKeywords: z
    .string()
    .min(5, {
      message:
        "Meta keywords must be at least 5 characters.",
    })
    .max(50),
});

const RestaurantForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuName: "",
      price: "",
      discount: "",
      imageUrl: "",
      metaTitle: "",
      metaKeywords: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/menu", values);

      console.log(res);
    } catch (error) {
      console.log("[MENU_ERROR]", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormHeader />
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
                        onRemove={() => {}}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="py-5 flex justify-end gap-3">
            <Button
              type="submit"
              size={"default"}
              disabled={loading}
            >
              <Save className="h-5 w-5 mr-2" /> Save / Add
            </Button>
            <Button
              type="button"
              variant={"outline"}
              size={"default"}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default RestaurantForm;
