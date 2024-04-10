"use client";

const Header = ({ title }: { title: string }) => {
  return (
    <header className="space-y-10 pb-5">
      <h1 className="text-lg tracking-wide">{title}</h1>
    </header>
  );
};

export default Header;
