"use client";

import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="font-extrabold md:text-lg">
      Good
      <span className="text-[#FF9E0A]">Food</span>
    </Link>
  );
};

export default Logo;
