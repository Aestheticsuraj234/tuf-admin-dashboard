"use client";
import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
  disabled,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = (result:any)=>{
       onChange(result.info.secure_url)
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
          <div className="z-10 absolute top-2 right-2">
            <Button
              type="button"
              onClick={() => onRemove(value)}
              variant={"destructive"}
              size={"sm"}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>

          <Image
            fill
            className="object-cover"
            alt="Image"
            src={value || "https://placehold.co/600x400.png"}
          />
        </div>
      </div>
        <CldUploadWidget onSuccess={onUpload} uploadPreset="abcdef">
            {({open})=>{
                const onClick = ()=>{
                    open()
                }
                return (
                    <Button 
                    type="button"
                    disabled={disabled}
                    variant={"secondary"}
                    onClick={onClick}
                    >
                        <ImagePlus className="h-4 w-4 mr-2"/>
                        Upload an image
                    </Button>
                )
            }}
        </CldUploadWidget>

    </div>
  );
};

export default ImageUpload;
