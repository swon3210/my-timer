"use client";

import BudgetList from "./BudgetList";
import OverlayProvider from "@/providers/OverlayProvider";
import useBudgetFormDialogOverlay from "./BudgetList/useBudgetFormDialogOverlay";
import { Button } from "@/components/ui/button";
import { useAddBudgetsMutation } from "@/domains/account-book/budgets/useAddBudgetsMutation";
import Navigation from "./_components/Navigation";

function BudgetAddButton() {
  const { openBudgetFormDialog } = useBudgetFormDialogOverlay();

  const { mutateAsync: addBudget } = useAddBudgetsMutation();

  const handleClick = async () => {
    const formValues = await openBudgetFormDialog();

    try {
      await addBudget({
        amount: formValues.amount,
        categoryId: formValues.categoryId,
        type: formValues.type,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return <Button onClick={handleClick}>예산 추가</Button>;
}

export default function BudgetPage() {
  return (
    <OverlayProvider>
      <div className="space-y-8 p-6">
        <div className="flex justify-between items-center">
          <Navigation />
          <BudgetAddButton />
        </div>
        <BudgetList />
      </div>
    </OverlayProvider>
  );
}
