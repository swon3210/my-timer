"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Z_INDEX from "../_constants/z-index";
import BackButton from "@/components/BackButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="w-full max-w-app-container mx-auto min-h-full">
      <div
        className={cn(
          "sticky top-0 flex items-center justify-between h-16 pl-2 pr-4 bg-white transition-all duration-300",
          isScrolled && "shadow-md",
          Z_INDEX.HEADER
        )}
      >
        <BackButton />
      </div>

      {children}
    </main>
  );
}
