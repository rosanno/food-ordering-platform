"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCategoryModal } from "@/hooks/use-category-modal";

import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  category: z.string().min(10),
});

const CategoryModal = () => {
  const categoryModal = useCategoryModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>
  ) => {
    console.log(values);
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
            name="category"
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
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size={"sm"}
              variant={"outline"}
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
