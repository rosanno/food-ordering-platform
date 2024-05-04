import { UserButton, auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

import RestaurantSwitcher from "@/components/restaurant-switcher";
import MainNav from "@/components/main-nav";
import SettingsButton from "./settings-button";

const DashboardNavbar = async () => {
  const { userId } = auth();

  const restaunrants = await prisma.restaurant.findMany({
    where: {
      ownerId: userId!!,
    },
  });

  return (
    <header className="border-b py-3.5 md:mx-1.5 fixed z-10 w-full top-0 bg-white">
      <div className="px-5 md:px-10 lg:px-20 flex items-center gap-4">
        <RestaurantSwitcher items={restaunrants} />
        <MainNav />
        <div className="ml-auto flex items-center gap-2">
          <SettingsButton />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
