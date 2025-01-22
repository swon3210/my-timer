"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2">
      <Button
        asChild
        variant="outline"
        className={pathname === "/account-book/budget" ? "bg-gray-200" : ""}
      >
        <Link href="/account-book/budget">주간 예산 관리</Link>
      </Button>
      <Button
        asChild
        variant="outline"
        className={
          pathname === "/account-book/budget/monthly" ? "bg-gray-200" : ""
        }
      >
        <Link href="/account-book/budget/yearly">연간 예산관리</Link>
      </Button>
    </div>
  );
}
