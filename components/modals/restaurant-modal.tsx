"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRestaurantModal } from "@/hooks/use-restaurant-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  country: z.string().min(1, { message: "Required" }),
  city: z.string().min(1, { message: "Required" }),
  imageUrl: z.string(),
});

const RestaurantModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const restaurantModal = useRestaurantModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      country: "",
      city: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "/api/restaurant",
        values
      );

      window.location.assign(
        `/admin/${response.data.id}/dasboard`
      );
    } catch (error) {
      toast.error("Something went wrong");
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
      console.log(error);
    }
  };

  return (
    <Modal
      title="Create Restaurant"
      description="Add a new restaurant to manage food menu and orders"
      isOpen={restaurantModal.isOpen}
      className="max-h-[720px] max-w-3xl overflow-y-auto"
      onClose={restaurantModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-1.5"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant Image</FormLabel>
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
              <div className="pt-6 space-x-2 flex item-center justify-end w-full">
                <Button
                  variant="outline"
                  type="button"
                  disabled={loading}
                  onClick={restaurantModal.onClose}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default RestaurantModal;
