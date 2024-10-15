import { Folders, LogIn, Settings } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "My Timer",
  description: "나의 타이머 어플리케이션",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full">
      <div className="fixed z-10 top-0 right-0 p-4 flex flex-col gap-4">
        <Link href="/auth/sign-in">
          <LogIn size={32} />
        </Link>
        <Link href="/categories">
          <Folders size={32} />
        </Link>
        <Link href="/settings">
          <Settings size={32} />
        </Link>
      </div>

      {children}
    </main>
  );
}
