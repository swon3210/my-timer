import { ForwardedRef, RefObject } from "react";

export function combineRefs<T>(...refs: (RefObject<T> | ForwardedRef<T>)[]) {
  return (node: T) => {
    refs.forEach((ref) => {
      if (ref && typeof ref === "function") {
        (ref as (node: T) => void)(node);
      } else if (ref && "current" in ref) {
        (ref as { current: T }).current = node;
      }
    });
  };
}
