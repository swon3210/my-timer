"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BudgetManager from "./BudgetManager/BudgetManager";

export default function BudgetPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>예산 관리</CardTitle>
        </CardHeader>
        <CardContent>
          <BudgetManager />
        </CardContent>
      </Card>
    </div>
  );
}
