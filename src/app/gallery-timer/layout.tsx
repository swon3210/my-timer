import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { FolderSearch, Settings } from "lucide-react";
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
      <div className="fixed z-10 top-0 left-0 p-2">
        <BackButton className="size-10 mr-2" />
      </div>
      <div className="fixed z-10 top-0 right-0 p-2 flex items-center gap-1">
        <Button variant="ghost" size="icon" className="size-10" asChild>
          <Link href="/categories">
            <FolderSearch />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="size-10" asChild>
          <Link href="/gallery-timer/settings">
            <Settings />
          </Link>
        </Button>
      </div>

      {children}
    </main>
  );
}
