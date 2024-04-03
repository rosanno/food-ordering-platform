import { IoRestaurantOutline } from "react-icons/io5";
import RestaurantForm from "../../_components/restaurant-form";

const ManageRestaurantPage = () => {
  return (
    <>
      <section className="space-y-10">
        <div className="flex items-center space-x-2.5">
          <div className="bg-black rounded-full p-1.5">
            <IoRestaurantOutline className="text-xl text-white" />
          </div>
          <h1 className="font-semibold text-lg tracking-wide">
            Manage Restaurant
          </h1>
        </div>
        <div className="border-b" />
      </section>
      <RestaurantForm />
    </>
  );
};

export default ManageRestaurantPage;
