"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useOverlay } from "@toss/use-overlay";

type ImageUploadModalOverlayProps = {
  isOpen: boolean;
  close: () => void;
  resolve: (files: File[]) => void;
};

const ImageUploadModalOverlay = ({
  isOpen,
}: // close,
// resolve,
ImageUploadModalOverlayProps) => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  const removeFile = () => {
    setFiles([]);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">이미지 업로드</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>이미지 업로드</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-gray-300 hover:border-primary"
            }`}
          >
            <input {...getInputProps()} />
            {files.length > 0 ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={URL.createObjectURL(files[0])}
                  alt="Uploaded preview"
                  className="max-h-48 mx-auto rounded-lg object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-0 right-0 -mt-2 -mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {isDragActive
                    ? "여기에 파일을 놓으세요"
                    : "클릭하거나 파일을 여기로 드래그하세요"}
                </p>
              </div>
            )}
          </div>
          {files.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ImageIcon className="h-4 w-4" />
              <span>{files[0].name}</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const useImageUploadModalOverlay = () => {
  const overlay = useOverlay({ exitOnUnmount: true });

  const openImageUploadModalOverlay = () =>
    new Promise<File[]>((resolve) => {
      overlay.open(({ close, isOpen }) => (
        <ImageUploadModalOverlay
          isOpen={isOpen}
          close={close}
          resolve={resolve}
        />
      ));
    });

  return {
    openImageUploadModalOverlay,
  };
};

export default useImageUploadModalOverlay;
