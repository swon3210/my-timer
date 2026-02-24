"use client";

import { Button } from "@/components/ui/button";
import SettingsForm from "./SettingsForm";
import { SSRSafeSuspense } from "@/lib/providers";
import { useRouter } from "next/navigation";
import useSignOutMutation from "@/domains/users/signOut/useSignOutMutation";

export default function SettingsPage() {
  const router = useRouter();

  const { mutateAsync: signOut } = useSignOutMutation();

  const handleSignOutButtonClick = async () => {
    if (!confirm("로그아웃 하시겠습니까?")) {
      return;
    }

    // TODO : 별도의 Floating UI 로 처리해야함.
    const shouldRevokeAllSessions = confirm("모든 기기에서 로그아웃할까요?");

    await signOut({ shouldRevokeAllSessions });
    router.push("/sign-in");
  };

  return (
    <main className="h-full flex flex-col justify-between">
      <div className="flex-1 overflow-auto">
        <SSRSafeSuspense fallback={<div>Loading...</div>}>
          <SettingsForm />
        </SSRSafeSuspense>
      </div>

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
