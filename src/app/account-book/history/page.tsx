"use client";

import { Button } from "@/components/ui/button";
import ExpenseList from "./ExpenseList";
import useExpenseFormDialogOverlay from "./useExpenseFormDialogOverlay";
import useAddAccountItemMutation from "@/domains/account-book/useAddAccountItemsMutation";
import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useAccountItemCategoriesQuery";

export default function HistoryPage() {
  const { openExpenseFormDialog, closeExpenseFormDialog } =
    useExpenseFormDialogOverlay();

  const { data: categories } = useAccountItemCategoriesQuery();

  const { mutate: addTransaction } = useAddAccountItemMutation();

  const handleAddExpenseButtonClick = async () => {
    const formValues = await openExpenseFormDialog();

    const category = categories?.find(
      (category) => category.id === formValues.categoryId
    );

    if (!category) {
      return;
    }

    addTransaction({
      amount:
        formValues.type === "EXPENSE"
          ? -Number(formValues.amount)
          : Number(formValues.amount),
      description: formValues.description,
      categoryId: category.id,
      date: new Date(formValues.date).toISOString(),
      type: formValues.type === "EXPENSE" ? "EXPENSE" : "INCOME",
      categoryDisplayedName: category.displayedName,
    });

    closeExpenseFormDialog();
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold">거래 내역</h3>
        <Button onClick={handleAddExpenseButtonClick}>내역 추가</Button>
      </div>
      <ExpenseList />
    </div>
  );
}
