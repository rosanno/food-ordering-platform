"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DollarSign, Scissors } from "lucide-react";

import FormHeader from "./form-header";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ImageUpload from "./image-upload";

const formSchema = z.object({
  menuName: z.string().min(1).max(20),
  price: z.string().min(5).max(20),
  discount: z.string().min(5).max(30),
  imageUrl: z.string(),
});

const RestaurantForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      menuName: "",
      price: "",
      discount: "",
      imageUrl: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
              </FormItem>
            )}
          />
          <div className="grid grid-cols-12 gap-5">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="col-span-6">
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem className="col-span-6">
                  <FormLabel>Discount</FormLabel>
                  <FormControl>
                    <div className="flex items-center border rounded-md">
                      <Scissors
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
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Menu Image</FormLabel>
                <FormControl>
                  <div className="flex justify-start pt-2.5">
                    <ImageUpload
                      value={field.value[0]}
                      onChange={(imageUrl) => {
                        field.onChange(imageUrl);
                      }}
                      onRemove={() => {}}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </>
  );
};

export default RestaurantForm;
