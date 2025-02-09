import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useImageFolderNamesQuery from "@/domains/folders/useImageFolderNamesQuery";
import { useAtom, useAtomValue } from "jotai";
import { categoryNameAtom, folderNameAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";

type FolderSwitchButtonsProps = {
  onFolderSwitch: (direction: "prev" | "next") => void;
  className?: string;
};

const FolderSwitchButtons = ({
  onFolderSwitch,
  className,
}: FolderSwitchButtonsProps) => {
  const categoryName = useAtomValue(categoryNameAtom);
  const [folderName, setFolderName] = useAtom(folderNameAtom);

  const { data: folderNames } = useImageFolderNamesQuery({
    categoryName,
  });

  const handleFolderSwitch = (direction: "prev" | "next") => {
    if (!folderName || !folderNames) {
      return;
    }

    const currentIndex = folderNames.indexOf(folderName);
    const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
    setFolderName(
      folderNames[newIndex < 0 ? folderNames.length - 1 : newIndex]
    );

    onFolderSwitch(direction);
  };

  return (
    <div className={cn("flex gap-2", className)}>
      <Button
        variant="ghost"
        onClick={() => handleFolderSwitch("prev")}
        className="size-10"
      >
        <ArrowLeft />
      </Button>
      <Button
        variant="ghost"
        onClick={() => handleFolderSwitch("next")}
        className="size-10"
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default FolderSwitchButtons;
