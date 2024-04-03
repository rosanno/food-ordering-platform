import Navbar from "@/components/navbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="px-2 md:px-5 w-full max-w-6xl mx-auto">
        {children}
      </main>
    </>
  );
}
