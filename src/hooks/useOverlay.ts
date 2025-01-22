import { useOverlay as useTossOverlay } from "@toss/use-overlay";

const useOverlay = (...args: Parameters<typeof useTossOverlay>) => {
  return useTossOverlay(...args);
};

export default useOverlay;
