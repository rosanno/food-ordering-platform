import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import Navbar from "@/components/navbar";
import { checkRole } from "@/utils/roles";
import Footer from "@/components/footer";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  const restaurant = await prisma.restaurant.findFirst({
    where: {
      ownerId: user?.id,
    },
  });

  if (checkRole("admin") && restaurant) {
    redirect(`/admin/${restaurant.slug}/dashboard`);
  }

  return (
    <>
      <Navbar />
      <main className="px-2 md:px-2.5 w-full max-w-6xl mx-auto mt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
