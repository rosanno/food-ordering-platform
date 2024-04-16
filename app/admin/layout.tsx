import DashboardNavbar from "@/components/admin-navbar";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If the user does not have the admin role, redirect them to the home page
  if (!checkRole("admin")) {
    redirect("/");
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
