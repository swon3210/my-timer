"use client";

import { Button } from "@/components/ui/button";
import SettingsForm from "./SettingsForm";
import { SSRSafeSuspense } from "@/lib/providers";
import { useRouter } from "next/navigation";
import { signOut } from "@/domains/users/fetchers";

export default function SettingsPage() {
  const router = useRouter();

  const handleSignOutButtonClick = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <main className="h-full flex flex-col justify-between">
      <SSRSafeSuspense fallback={<div>Loading...</div>}>
        <SettingsForm />
      </SSRSafeSuspense>
      <footer className="sticky bottom-0 z-10 bg-background border-t p-4">
        <Button
          variant="destructive"
          className="w-full"
          onClick={handleSignOutButtonClick}
        >
          로그아웃
        </Button>
      </footer>
    </main>
  );
}
