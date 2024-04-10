"use client";

import { useRouter } from "next/navigation";

const Header = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <header className="space-y-10">
      <h1 className="text-lg tracking-wide">{title}</h1>
      <div className="border-b border-b-gray-100/80" />
    </header>
  );
};

export default Header;
