"use client";

import { IoIosSettings } from "react-icons/io";
import { Button } from "./ui/button";
import { useParams, useRouter } from "next/navigation";

const SettingsButton = () => {
  const params = useParams();
  const router = useRouter();

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      onClick={() =>
        router.push(`/admin/${params.slug}/settings`)
      }
    >
      <IoIosSettings className="text-[22px] text-gray-500" />
    </Button>
  );
};

export default SettingsButton;
