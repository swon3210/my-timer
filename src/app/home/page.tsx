"use client";

import Dashboard from "@/components/Dashboard";
import { useSettingsQuery } from "@/domains/users/useSettingsQuery";
import usePlatform from "@/lib/hooks";

export default function Home() {
  const { platform } = usePlatform();
  const { data: appSettings } = useSettingsQuery();

  if (platform == null || appSettings == null) {
    return null;
  }

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <Dashboard />
    </div>
  );
}
