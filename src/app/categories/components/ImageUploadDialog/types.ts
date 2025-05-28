export type UploadedFileInfo = {
  firstFileSrc: string;
  folderName: string;
  filesCount: number;
  status: "pending" | "optimizing" | "uploading" | "uploaded";
};
