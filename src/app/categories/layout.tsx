"use client";

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { useAddFolderMutation } from "@/lib/mutations";
import { getFolderNamesQueryKey, useInvalidateQuery } from "@/lib/queries";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";

// export const metadata = {
//   title: "My Timer 사진 폴더 선택",
//   description: "사진 폴더를 선택하는 페이지",
// };

const AddFolderButton = ({ categoryName }: { categoryName: string }) => {
  const { mutateAsync: addFolder } = useAddFolderMutation();
  const invalidateQuery = useInvalidateQuery();

  const handleAddFolderButtonClick = async () => {
    const folderName = prompt("폴더 이름을 입력하세요.");

    if (!folderName) {
      return;
    }

    await addFolder({ path: `images/${categoryName}/${folderName}` });
    void invalidateQuery(getFolderNamesQueryKey(categoryName));
  };

  return (
    <Button variant="outline" size="icon" onClick={handleAddFolderButtonClick}>
      <Plus className="w-4 h-4 text-gray-700" />
    </Button>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { categoryName } = useParams() as { categoryName?: string };

  return (
    <main className="w-full max-w-app-container mx-auto min-h-full">
      <div className="flex items-center justify-between h-16 pl-2 pr-4">
        <div className="flex items-center gap-2">
          <BackButton />
          <h3 className="text-xl font-semibold">폴더</h3>
        </div>
        {categoryName && <AddFolderButton categoryName={categoryName} />}
      </div>

      {children}
    </main>
  );
}
