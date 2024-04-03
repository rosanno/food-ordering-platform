"use client";

import Link from "next/link";

const ButtonLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href}
      className="
        text-[13px] 
        text-white 
        bg-[#0A0A0A] 
        rounded-full 
        px-8 
        md:px-7
        py-2
        md:py-2.5
      "
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
