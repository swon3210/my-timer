import { useAtom } from "jotai";
import { useEffect } from "react";
import { platformAtom } from "./atoms";

const usePlatform = () => {
  const [platform, setPlatform] = useAtom(platformAtom);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    if (/android/i.test(userAgent)) {
      setPlatform("AOS");
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      setPlatform("IOS");
    } else if (/Macintosh|Windows/.test(userAgent)) {
      setPlatform("WEB-PC");
    } else {
      setPlatform("WEB-MOBILE");
    }
  }, [setPlatform]);

  return {
    platform,
  };
};

export default usePlatform;
