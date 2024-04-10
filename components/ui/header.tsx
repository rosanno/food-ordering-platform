"use client";

const Header = ({ title }: { title: string }) => {
  return (
    <header className="space-y-10">
      <h1 className="text-lg tracking-wide">{title}</h1>
      <div className="border-b border-b-gray-100/80" />
    </header>
  );
};

export default Header;
