"use client";

import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

const GoBack = () => {
  const router = useRouter();

  return (
    <Button className="w-52" onClick={() => router.back()}>
      Go Back
    </Button>
  );
};

export default GoBack;
