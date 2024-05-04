"use client";

import { useParams, useRouter } from "next/navigation";
import {
  Eye,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu } from "./column";

interface CellActionProps {
  data: Menu;
}

const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
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
          <DropdownMenuItem onClick={() => {}}>
            <Trash className="mr-2 h-3 w-3" />
            <span className="text-[12px]">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
