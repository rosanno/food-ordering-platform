import DashboardNavbar from "@/components/admin-navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNavbar />
      <main className="px-5 pt-20 md:px-14 w-full max-w-7xl mx-auto mt-10">
        {children}
      </main>
    </>
  );
}
