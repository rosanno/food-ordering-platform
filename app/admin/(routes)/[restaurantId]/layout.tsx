import { redirect } from "next/navigation";

import { checkRole } from "@/utils/roles";
import DashboardNavbar from "@/components/admin-navbar";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { restaurantId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  if (!checkRole("admin")) {
    redirect("/");
  }

  const restaurant = await prisma.restaurant.findFirst({
    where: {
      id: params.restaurantId,
    },
  });

  if (!restaurant) {
    redirect("/admin");
  }

  return (
    <>
      <DashboardNavbar />
      <main className="px-5 pt-20 md:px-14 w-full max-w-7xl mx-auto mt-10">
        {children}
      </main>
    </>
  );
}
