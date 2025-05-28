import { UploadedFileInfo } from "./types";

type AttachedFileInfoItemProps = {
  fileInfo: UploadedFileInfo;
};

const AttachedFileInfoItem = ({ fileInfo }: AttachedFileInfoItemProps) => {
  return (
    <span className="flex items-center gap-2 text-sm text-gray-600">
      {fileInfo.folderName} ({fileInfo.filesCount}개) -{" "}
      {fileInfo.status === "pending" && "업로드 대기중"}
      {fileInfo.status === "optimizing" && "최적화 중"}
      {fileInfo.status === "uploading" && "업로드 중"}
      {fileInfo.status === "uploaded" && "업로드 완료"}
    </span>
  );
};

export default AttachedFileInfoItem;
