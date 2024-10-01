import { useEffect, useState } from "react";

const usePlatform = () => {
  const [platform, setPlatform] = useState<
    "IOS" | "AOS" | "WEB-PC" | "WEB-MOBILE"
  >();

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
  }, []);

  return {
    platform,
  };
};

export default usePlatform;
