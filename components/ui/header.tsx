"use client";

const Header = ({ title }: { title: string }) => {
  return (
    <header className="space-y-10">
      <h1 className="text-[16px] font-normal">{title}</h1>
    </header>
  );
};

export default Header;
