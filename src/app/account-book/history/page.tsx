"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpenseList from "./ExpanseList";

export default function HistoryPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>거래 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseList />
        </CardContent>
      </Card>
    </div>
  );
}
