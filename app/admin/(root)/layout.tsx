import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const restaurant = await prisma.restaurant.findFirst({
    where: {
      ownerId: userId,
    },
  });

  if (restaurant) {
    redirect(`/admin/${restaurant.id}/dashboard`);
  }

  return <>{children}</>;
}
