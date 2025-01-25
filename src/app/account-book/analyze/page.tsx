"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WeeklyBudgetComparison from "./WeeklyBudgetComparison";
import ExpenseChart from "./ExpanseChart";

export default function AnalyzePage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>주간 예산 비교</CardTitle>
        </CardHeader>
        <CardContent>
          <WeeklyBudgetComparison />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>지출 분석</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseChart transactions={[]} timeFrame="weekly" />
        </CardContent>
      </Card>
    </div>
  );
}
