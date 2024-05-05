import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";

const rubik = Rubik({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    absolute: "",
    default: "GoodFood",
    template: "%s | GoodFood",
  },
  description:
    "Empowering Food Lovers Everywhere to Order with Ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={rubik.className}>
          <ModalProvider />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
