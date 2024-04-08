"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "./button";

const Header = ({
  title,
  button = false,
}: {
  title: string;
  button?: boolean;
}) => {
  const router = useRouter();

  return (
    <header className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg tracking-wide">
          {title}
        </h1>
        {button && (
          <Button
            size={"sm"}
            className="text-[13px]"
            onClick={() => router.push("/menu/create")}
          >
            <Plus className="mr-1 h-4 w-4" />
            <span className="pt-0.5">Add Menu</span>
          </Button>
        )}
      </div>
      <div className="border-b border-b-gray-100/80" />
    </header>
  );
};

export default Header;
