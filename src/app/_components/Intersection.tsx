import { useIntersectionObserver } from "@uidotdev/usehooks";
import { useEffect, useRef } from "react";

const Intersection = ({
  onIntersect,
  className,
}: {
  onIntersect: () => void;
  className?: string;
}) => {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: "0px",
  });
  const callbackRef = useRef(onIntersect);
  callbackRef.current = onIntersect;

  useEffect(() => {
    if (entry?.isIntersecting) {
      callbackRef.current();
    }
  }, [entry?.isIntersecting]);

  return <div ref={ref} className={className} />;
};

export default Intersection;
