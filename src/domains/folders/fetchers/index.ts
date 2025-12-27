import {
  getFolderList,
  getUserStoragePath,
  deleteFolders as deleteFoldersFromFirebase,
} from "@/lib/firebase";
import { User } from "@/lib/types";

export const getImageFolderNames = async ({
  categoryName,
  user,
}: {
  categoryName: string | null;
  user: User;
}) => {
  if (categoryName == null) {
    throw new Error("categoryName 이 비어있습니다");
  }

  const path = `images/${categoryName}`;
  const userStoragePath = getUserStoragePath(user, decodeURIComponent(path));
  const folders = await getFolderList(userStoragePath);

  return folders ?? [];
};

export const getFolderNames = async ({ user }: { user: User }) => {
  const path = `images`;
  const userStoragePath = getUserStoragePath(user, path);
  const folders = await getFolderList(userStoragePath);

  return folders ?? [];
};

export const deleteFolders = async ({ paths }: { paths: string[] }) => {
  await deleteFoldersFromFirebase(paths);
};
