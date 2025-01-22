"use client";

import Dashboard from "@/components/Dashboard";
import { useSettingsQuery } from "@/domains/users/useSettingsQuery";
import { useUserQuery } from "@/domains/users/useUserQuery";
import usePlatform from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  const { platform } = usePlatform();
  const { data: appSettings } = useSettingsQuery();
  const { data: user, isLoading: isUserLoading } = useUserQuery({
    retry: false,
  });

  useEffect(() => {
    if (user == null && !isUserLoading) {
      router.push("/sign-in");
    }
  }, [isUserLoading, user, router]);

  if (platform == null || appSettings == null || isUserLoading) {
    return null;
  }

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <Dashboard />
    </div>
  );
}
