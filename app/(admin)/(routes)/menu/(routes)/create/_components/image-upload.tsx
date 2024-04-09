"use client";

import { UploadButton } from "@/lib/uploadthing";

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  value: string;
}

const ImageUpload = ({
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  return (
    <>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) {
            const imageUrl = res.map((item) => item.url);
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
    </>
  );
};

export default ImageUpload;
