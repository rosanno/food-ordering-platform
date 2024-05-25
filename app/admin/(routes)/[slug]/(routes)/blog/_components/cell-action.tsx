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
import { Blog } from "./column";

interface CellActionProps {
  data: Blog;
}

const CellAction = ({ data }: CellActionProps) => {
  const router = useRouter();
  const params = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const decodedUrl = data.blogSlug.replace(/%3A/g, ":");

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
          <DropdownMenuItem
            onClick={() =>
              router.push(`/blog/${decodedUrl}}`)
            }
          >
            <Eye className="mr-2 h-3 w-3" />
            <span className="text-[12px]">View</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>
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
