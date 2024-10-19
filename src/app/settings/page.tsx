"use client";

import { Button } from "@/components/ui/button";
import SettingsForm from "./SettingsForm";
import { SSRSafeSuspense } from "@/lib/providers";

export default function SettingsPage() {
  return (
    <main className="h-full flex flex-col justify-between">
      <SSRSafeSuspense fallback={<div>Loading...</div>}>
        <SettingsForm />
      </SSRSafeSuspense>
      <footer className="sticky bottom-0 z-10 bg-background border-t p-4">
        <Button variant="destructive" className="w-full">
          로그아웃
        </Button>
      </footer>
    </main>
  );
}
