"use client";

import BackButton from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { folderNameAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { FolderSearch, Settings } from "lucide-react";
import Link from "next/link";
import Z_INDEX from "../_constants/z-index";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const folderName = useAtomValue(folderNameAtom);

  return (
    <main className="w-full h-full mx-auto">
      <div
        className={cn(
          "fixed top-0 left-0 w-full flex justify-between items-center",
          Z_INDEX.HEADER
        )}
      >
        <div className="p-2 flex items-center">
          <BackButton className="size-10 mr-2" />
          <span className="text-sm line-clamp-1">
            {folderName ? decodeURIComponent(folderName) : "Gallery Timer"}
          </span>
        </div>
        <div className="p-2 flex items-center gap-1">
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
      </div>

      {children}
    </main>
  );
}
