"use client";

import Image from "next/image";
import { ControllerRenderProps } from "react-hook-form";

interface BlogImagePriviewProps {
  field: ControllerRenderProps<any, "cover">;
  imageName: string;
  onDeleteImage: (
    field: ControllerRenderProps<any, "cover">
  ) => void;
}

const BlogImagePriview = ({
  field,
  imageName,
  onDeleteImage,
}: BlogImagePriviewProps) => {
  return (
    <div className="relative overflow-hidden group">
      <div
        className="
        h-[230px] 
        w-full 
        overflow-hidden 
        border 
        border-dashed 
        rounded-md 
        p-2
      "
      >
        <Image
          src={field.value}
          alt="blog-image"
          height={300}
          width={300}
          className="h-full w-full object-contain"
        />
      </div>
      <div
        className="
        bg-black/60 
        absolute 
        inset-0 
        h-full 
        py-2.5 
        px-2 
        group-hover:opacity-100
        opacity-0
        transition-opacity
        duration-500
      "
      >
        <div
          role="button"
          className="
          w-fit
          text-[12px] 
          text-white 
          uppercase 
          hover:bg-gray-100/25 
          hover:rounded-full 
          transition 
          duration-700 
          px-1
          py-0.5
        "
          onClick={() => onDeleteImage(field)}
        >
          Remove
        </div>
        <div className="flex items-center justify-center h-full">
          <h3 className="text-white">{imageName}</h3>
        </div>
      </div>
    </div>
  );
};

export default BlogImagePriview;
