"use client";

import BackgroundGallery, {
  BackgroundGalleryHandle,
} from "@/app/gallery-timer/BackgroundGallery";
import Timer from "@/components/Timer";
import { useSettingsQuery } from "@/domains/users/useSettingsQuery";
import usePlatform from "@/lib/hooks";
import clsx from "clsx";
import { useRef } from "react";

const DEFAULT_TICK_SECONDS = 5;

export default function GalleryTimerPage() {
  const { platform } = usePlatform();
  const backgroundGalleryHandleRef = useRef<BackgroundGalleryHandle>({});
  const { data: appSettings } = useSettingsQuery();

  const handleStandardSecondsReached = () => {
    backgroundGalleryHandleRef.current.changeImage?.();
  };

  if (platform == null || appSettings == null) {
    return null;
  }

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <BackgroundGallery
        ref={backgroundGalleryHandleRef}
        className={clsx("fixed top-0 left-0 z-0")}
      />
      {appSettings.shouldExposeTimer && (
        <Timer
          standardSeconds={appSettings?.tickSeconds ?? DEFAULT_TICK_SECONDS}
          onStandardSecondsReached={handleStandardSecondsReached}
          className="relative z-10"
        />
      )}
    </div>
  );
}
