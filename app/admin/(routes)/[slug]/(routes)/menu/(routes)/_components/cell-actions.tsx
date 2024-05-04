"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Eye,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "./column";
import AlertModal from "@/components/modals/alert-modal";

interface CellActionProps {
  data: Menu;
}

const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await axios.delete(
        `/api/menu/${data.id}`
      );

      if (response.statusText === "OK") {
        toast(response.data.message, {
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
          duration: 5000,
        });
      }
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} size={"icon"}>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-[13px]">
            Actions
          </DropdownMenuLabel>
          <DropdownMenuItem onClick={() => {}}>
            <Eye className="mr-2 h-3 w-3" />
            <span className="text-[12px]">View</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/admin/${params.slug}/menu/edit/${data.slug}`
              )
            }
          >
            <Pencil className="mr-2 h-3 w-3" />
            <span className="text-[12px]">Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className="mr-2 h-3 w-3" />
            <span className="text-[12px]">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
