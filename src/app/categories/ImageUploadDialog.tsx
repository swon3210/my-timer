"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ImageUploadModalOverlayProps = {
  isOpen: boolean;
  close: () => void;
  onImagesUploaded: (folderName: string, files: File[]) => void;
};

const ImageUploadDialog = ({
  isOpen,
  close,
  onImagesUploaded,
}: ImageUploadModalOverlayProps) => {
  const [uploadedFilesInfo, setUploadedFilesInfo] = useState<
    {
      firstFileSrc: string;
      folderPath: string;
      filesCount: number;
    }[]
  >([]);

  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    const [file] = acceptedFiles;

    const path = (file as File & { path: string }).path;
    const folderName = path.split("/")[1];

    setFiles(acceptedFiles);
    onImagesUploaded(folderName, acceptedFiles);

    setTimeout(() => {
      setFiles([]);
      setUploadedFilesInfo([
        ...uploadedFilesInfo,
        {
          firstFileSrc: URL.createObjectURL(file),
          folderPath: path,
          filesCount: acceptedFiles.length,
        },
      ]);
    }, 1000);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
  });

  const removeFile = () => {
    setFiles([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      {/* <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus className="w-4 h-4 text-gray-700" />
        </Button>
      </DialogTrigger> */}
      <DialogContent className="rounded-lg w-[calc(100%-1rem)]">
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
          {uploadedFilesInfo.map(({ firstFileSrc, folderPath, filesCount }) => (
            <div
              key={folderPath}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={firstFileSrc}
                alt={`${folderPath} 폴더의 첫 번째 이미지`}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span>
                업로드 됨 : {folderPath} 포함 {filesCount}개
              </span>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageUploadDialog;
