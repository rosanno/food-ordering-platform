import Navbar from "@/components/navbar";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (checkRole("admin")) {
    redirect("/admin/dashboard");
  }

  return (
    <>
      <Navbar />
      <main className="px-2 md:px-5 w-full max-w-6xl mx-auto mt-16">
        {children}
      </main>
    </>
  );
}
