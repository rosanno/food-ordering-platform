"use client";

import { useRestaurantModal } from "@/hooks/use-restaurant-modal";

import { Modal } from "@/components/ui/modal";
import RestaurantModalForm from "@/components/ui/restaurant-modal-form";

const RestaurantModal = () => {
  const restaurantModal = useRestaurantModal();

  return (
    <Modal
      title="Create Restaurant"
      description="Add a new restaurant to manage food menu and orders"
      isOpen={restaurantModal.isOpen}
      className="max-h-[720px] max-w-3xl overflow-y-auto"
      onClose={restaurantModal.onClose}
    >
      <RestaurantModalForm />
    </Modal>
  );
};

export default RestaurantModal;
