"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface FooterLinks {
  label: string;
  href?: string;
  icon?: LucideIcon;
  link?: boolean;
}

const FooterLinks = ({
  label,
  href,
  icon: Icon,
  link = false,
}: FooterLinks) => {
  let item = "";

  const ItemLink = () => {
    if (link) {
      return (
        <Link
          href={href as string}
          className="text-[13px] text-muted-foreground block py-1"
        >
          {label}
        </Link>
      );
    } else {
      return (
        <div
          className={cn(
            "text-[13px] text-muted-foreground py-1",
            Icon && "flex items-center"
          )}
        >
          {Icon && <Icon className="h-4 w-4 mr-1.5" />}
          {label}
        </div>
      );
    }
  };

  return (
    <div>
      <ItemLink />
    </div>
  );
};

export default FooterLinks;
