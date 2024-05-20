"use client";

import { cn } from "@/lib/utils";

const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-white shadow-sm rounded-md px-5 py-2.5 mb-5",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
