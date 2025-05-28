"use client";

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { useDropzone } from "react-dropzone";
import { X, Upload, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import { AttachedFile } from "./types";
import AttachedFileItemList from "./AttachedFileItemList";

export type ImageGroup = {
  folderName: string;
  files: File[];
};

export type ImageUploadDialogRef = {
  setAttachedFiles: (updater: (prev: AttachedFile[]) => AttachedFile[]) => void;
};

type ImageUploadModalOverlayProps = {
  isOpen: boolean;
  close: () => void;
  onImagesUploaded: (imageGroups: ImageGroup[]) => void;
};

export const useImageUploadDialogRef = () => {
  return useRef<ImageUploadDialogRef>(null);
};

const getFolderNameFromPath = (path: string) => {
  return path.split("/")[1];
};

const ImageUploadDialog = forwardRef<
  ImageUploadDialogRef,
  ImageUploadModalOverlayProps
>(({ isOpen, close, onImagesUploaded }, ref) => {
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);

  const imagesUploadProgress =
    (attachedFiles.filter((fileInfo) => fileInfo.status === "uploaded").length /
      attachedFiles.length) *
    100;

  const uploadingFileItem = attachedFiles.find(
    (fileInfo) => fileInfo.status === "uploading"
  );

  useImperativeHandle(ref, () => ({
    setAttachedFiles: (updater: (prev: AttachedFile[]) => AttachedFile[]) => {
      setAttachedFiles((prev) => updater(prev));
    },
  }));

  const handleDrop = (acceptedFiles: File[]) => {
    const folderNames = Array.from(
      new Set(
        acceptedFiles.map((file) => {
          const path = (file as File & { path: string }).path;
          return getFolderNameFromPath(path);
        })
      )
    );

    const imageGroups: ImageGroup[] = folderNames.map((folderName) => ({
      folderName,
      files: acceptedFiles.filter((file) => {
        const path = (file as File & { path: string }).path;
        return getFolderNameFromPath(path) === folderName;
      }),
    }));

    onImagesUploaded(imageGroups);

    setAttachedFiles([
      ...attachedFiles,
      ...imageGroups.map((imageGroup) => ({
        firstFileSrc: URL.createObjectURL(imageGroup.files[0]),
        folderName: imageGroup.folderName,
        filesCount: imageGroup.files.length,
        status: "pending" as const,
      })),
    ]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/*": [],
    },
    multiple: true,
  });

  const removeFileUploadedInfo = () => {
    setAttachedFiles([]);
  };

  const handleClose = () => {
    removeFileUploadedInfo();
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="rounded-lg w-[calc(100%-1rem)] gap-4">
        <DialogHeader>
          <DialogTitle>이미지 업로드</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary bg-primary/10"
                : "border-gray-300 hover:border-primary"
            }`}
          >
            <input {...getInputProps()} />
            {attachedFiles.length > 0 ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={uploadingFileItem?.firstFileSrc}
                  alt="Uploaded preview"
                  className="max-h-48 mx-auto rounded-lg object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-0 right-0 -mt-2 -mr-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFileUploadedInfo();
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
          <AttachedFileItemList
            attachedFiles={attachedFiles}
            className="max-h-32 grow overflow-y-auto"
          />
        </div>
        {attachedFiles.length > 0 && (
          <div className="flex items-center gap-2">
            {imagesUploadProgress != null && imagesUploadProgress < 100 ? (
              <Spinner />
            ) : (
              <CheckCircle className="h-4 w-4 text-primary" />
            )}
            <Progress value={imagesUploadProgress} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
});

ImageUploadDialog.displayName = "ImageUploadDialog";

export default ImageUploadDialog;
