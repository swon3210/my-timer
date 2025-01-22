"use client";

import BudgetList from "./BudgetList";
import OverlayProvider from "@/providers/OverlayProvider";
import { Button } from "@/components/ui/button";
import { useAddBudgetsMutation } from "@/domains/account-book/budgets/useAddBudgetsMutation";
import useIncomeFormDialogOverlay from "./useIncomeFormDialogOverlay";
import useDateAtom from "./_atom/useDateAtom";
import MonthManager from "./MonthManager";

function IncomeAddButton() {
  const { date } = useDateAtom();

  const { openIncomeFormDialog } = useIncomeFormDialogOverlay();

  const { mutateAsync: addBudget } = useAddBudgetsMutation();

  const handleClick = async () => {
    const formValues = await openIncomeFormDialog();

    try {
      await addBudget({
        amount: formValues.amount,
        categoryId: formValues.categoryId,
        type: "INCOME",
        date: date.toISOString(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return <Button onClick={handleClick}>월 수입 추가</Button>;
}

export default function BudgetPage() {
  return (
    <OverlayProvider>
      <div className="space-y-8 p-6">
        <div className="flex justify-between items-center">
          <MonthManager />
          <IncomeAddButton />
        </div>
        <BudgetList />
      </div>
    </OverlayProvider>
  );
}
