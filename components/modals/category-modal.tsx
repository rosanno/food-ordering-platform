"use client";

import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoryModal } from "@/hooks/use-category-modal";

import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(10),
});

const CategoryModal = () => {
  const categoryModal = useCategoryModal();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    try {
      setLoading(true);
      await axios.post("/api/blog-category", values);

      toast.success("category created");
      categoryModal.onClose();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={categoryModal.isOpen}
      onClose={categoryModal.onClose}
      title="Add Category"
      description="Blog category"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="float-right space-x-2.5">
            <Button
              type="button"
              size={"sm"}
              variant={"destructive"}
              onClick={categoryModal.onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size={"sm"}
              variant={"outline"}
              disabled={loading}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default CategoryModal;
