"use client";

import { Button } from "@/components/ui/button";
import useSubTab from "./useSubTab";

export default function Navigation() {
  const { subTab, setSubTab } = useSubTab();

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        className={subTab === "weekly" ? "bg-gray-200" : ""}
        onClick={() => setSubTab("weekly")}
      >
        주간 체크
      </Button>

      <Button
        variant="outline"
        className={subTab === "monthly" ? "bg-gray-200" : ""}
        onClick={() => setSubTab("monthly")}
      >
        월간 체크
      </Button>

      <Button
        variant="outline"
        className={subTab === "yearly" ? "bg-gray-200" : ""}
        onClick={() => setSubTab("yearly")}
      >
        연간 체크
      </Button>
    </div>
  );
}
