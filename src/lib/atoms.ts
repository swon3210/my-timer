import { atomWithStorage } from "jotai/utils";

export const categoryNameAtom = atomWithStorage<string | null>(
  "categoryName",
  null
);

export const folderNameAtom = atomWithStorage<string | null>(
  "folderName",
  null
);

export const gridLayoutColumnNumberAtom = atomWithStorage<number | null>(
  "gridLayout",
  null
);
