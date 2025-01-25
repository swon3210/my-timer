"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ExpenseForm from "./ExpanseForm";

export default function TransactionPage() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>거래 내역 추가</CardTitle>
        </CardHeader>
        <CardContent>
          <ExpenseForm />
        </CardContent>
      </Card>
    </div>
  );
}
