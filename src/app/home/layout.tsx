import { LogIn, Settings } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "My Timer",
  description: "나의 어플리케이션",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full max-w-app-container mx-auto">
      <div className="fixed z-10 top-0 right-0 p-4 flex flex-col gap-4">
        <Link href="/sign-in">
          <LogIn size={32} />
        </Link>
        <Link href="/settings">
          <Settings size={32} />
        </Link>
      </div>
      {children}
    </main>
  );
}
