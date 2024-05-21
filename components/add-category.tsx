"use client";

import { useCategoryModal } from "@/hooks/use-category-modal";
import { Plus } from "lucide-react";
import CategoryModal from "./modals/category-modal";

const AddCategory = () => {
  const categoryModal = useCategoryModal();

  return (
    <>
      <CategoryModal />
      <div
        role="button"
        className="bg-gray-100 rounded-full p-2 hover:opacity-60 transition duration-200"
        onClick={categoryModal.onOpen}
      >
        <Plus className="h-3 w-3" />
      </div>
    </>
  );
};

export default AddCategory;
