import { useAtom } from "jotai";
import { atomWithHash } from "jotai-location";

export const imageUrlIndexAtom = atomWithHash<number>("image-url-index", 0);

export const useImageUrlIndexAtom = () => {
  const [imageUrlIndex, setImageUrlIndex] = useAtom(imageUrlIndexAtom);

  return { imageUrlIndex, setImageUrlIndex };
};
