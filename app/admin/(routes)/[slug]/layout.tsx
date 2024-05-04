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
  params: { slug: string };
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
      slug: params.slug,
    },
  });

  if (!restaurant) {
    redirect("/admin");
  }

  return (
    <>
      <DashboardNavbar />
      <main className="px-5 md:px-12 lg:px-20 pt-20 mt-10">
        {children}
      </main>
    </>
  );
}
