"use client";

const Header = ({ title }: { title: string }) => {
  return (
    <header className="space-y-10">
      <h1 className="text-lg font-medium">{title}</h1>
    </header>
  );
};

export default Header;
