"use client";

import { Button } from "@/components/ui/button";
import { UploadButton } from "@/lib/uploadthing";
import { Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
}

const ImageUpload = ({
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  return (
    <div className="space-y-4">
      {value && (
        <Image
          src={value}
          alt="menu"
          width={300}
          height={300}
        />
      )}
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            const imageUrl = res[0].url;
            onChange(imageUrl);
          }
        }}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
        appearance={{
          button:
            "ut-ready:bg-[#FF9E0A] ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
          container:
            "w-max flex-row rounded-md border-cyan-300 bg-slate-800 text-sm",
          allowedContent:
            "flex h-8 flex-col items-center justify-center px-2 text-white",
        }}
      />
      <Button variant={"destructive"} size={"sm"}>
        <Trash className="h-4 w-4 mr-1" /> Delete
      </Button>
    </div>
  );
};

export default ImageUpload;
