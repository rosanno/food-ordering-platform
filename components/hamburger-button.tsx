"use client";

import { Menu } from "lucide-react";
import { useSideNav } from "@/hooks/use-side-nav";

import { Button } from "./ui/button";

const HamburgerButton = () => {
  const sideNav = useSideNav();

  return (
    <Button
      size={"icon"}
      variant={"outline"}
      onClick={() => sideNav.onOpen()}
    >
      <Menu className="h-4 w-4" />
    </Button>
  );
};

export default HamburgerButton;
