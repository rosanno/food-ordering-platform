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
    <div>
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
      />
    </div>
  );
};

export default ImageUpload;
