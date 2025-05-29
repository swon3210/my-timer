import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const categoryNameAtom = atomWithStorage<string | null>(
  "categoryName",
  null
);

export const folderNameAtom = atomWithStorage<string | null>(
  "folderName",
  null
);

export const imageUrlIndexAtom = atomWithStorage<number>("imageUrlIndex", 0);

export const gridLayoutColumnNumberAtom = atomWithStorage<number | null>(
  "gridLayout",
  null
);

export type BookMark = {
  categoryName: string;
  folderName: string;
  imageUrlIndex: number;
};

export const bookMarksAtom = atomWithStorage<BookMark[]>("bookMarks", []);

export const platformAtom = atomWithStorage<
  "IOS" | "AOS" | "WEB-PC" | "WEB-MOBILE" | null
>("platform", null);

export const isSelectionModeAtom = atom<boolean>(false);

export const selectedImagesAtom = atom<string[]>([]);

export const selectedFolderNamesAtom = atom<string[]>([]);
