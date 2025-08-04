import { AttachedFile } from "./types";
import { cn } from "@/lib/utils";

const getStatusStyles = (status: AttachedFile["status"]) => {
  switch (status) {
    case "pending":
      return "text-gray-500";
    case "optimizing":
      return "text-blue-500 animate-pulse";
    case "uploading":
      return "text-yellow-500 animate-pulse";
    case "uploaded":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};

const AttachedFileItem = ({ attachedFile }: { attachedFile: AttachedFile }) => {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
      <span className="text-sm font-medium text-gray-700">
        {attachedFile.folderName}
      </span>
      <span className="text-sm text-gray-500">
        ({attachedFile.filesCount}개)
      </span>
      <span className="text-sm">-</span>
      <span
        className={cn(
          "text-sm font-medium",
          getStatusStyles(attachedFile.status)
        )}
      >
        {attachedFile.status === "pending" && "업로드 대기중"}
        {attachedFile.status === "optimizing" && "최적화 중"}
        {attachedFile.status === "uploading" && "업로드 중"}
        {attachedFile.status === "uploaded" && "업로드 완료"}
      </span>
    </div>
  );
};

const AttachedFileInfoItemList = ({
  attachedFiles,
  className,
}: {
  attachedFiles: AttachedFile[];
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {attachedFiles.map((attachedFile) => (
        <AttachedFileItem
          key={attachedFile.folderName}
          attachedFile={attachedFile}
        />
      ))}
    </div>
  );
};

export default AttachedFileInfoItemList;
