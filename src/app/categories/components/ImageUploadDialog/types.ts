export type AttachedFile = {
  firstFileSrc: string;
  folderName: string;
  filesCount: number;
  status: "pending" | "optimizing" | "uploading" | "uploaded";
};
