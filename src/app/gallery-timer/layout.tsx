"use client";

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { folderNameAtom } from "@/lib/atoms";
import { useAtomValue } from "jotai";
import { FolderSearch, Settings } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const folderName = useAtomValue(folderNameAtom);

  return (
    <main className="w-full h-full mx-auto">
      <div className="fixed z-10 top-0 left-0 p-2 flex items-center">
        <BackButton className="size-10 mr-2" />
        <span className="text-sm">
          {folderName ? decodeURIComponent(folderName) : "Gallery Timer"}
        </span>
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
