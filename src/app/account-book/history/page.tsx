"use client";

import { Button } from "@/components/ui/button";
import ExpenseList from "./ExpenseList";
import useAddAccountItemMutation from "@/domains/account-book/useAddAccountItemsMutation";
import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useAccountItemCategoriesQuery";
import useExpenseFormDialogOverlay from "@/app/_components/ExpenseFormDialog/useExpenseFormDialogOverlay";

export default function AccountBookHistoryPage() {
  const { openExpenseFormDialog, closeExpenseFormDialog } =
    useExpenseFormDialogOverlay();

  const { data: categories } = useAccountItemCategoriesQuery();

  const { mutate: addTransaction } = useAddAccountItemMutation();

  const handleAddExpenseButtonClick = async () => {
    const formValues = await openExpenseFormDialog({
      selectableTransactionTypes: ["EXPENSE", "INCOME", "FLEX"],
    });

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
      type: formValues.type,
      categoryDisplayedName: category.displayedName,
      frequency: formValues.frequency,
    });

    closeExpenseFormDialog();
  };

  return (
    <div className="grow flex flex-col gap-6 pt-4">
      <div className="flex justify-between items-center px-6">
        <h3 className="text-lg font-bold">거래 내역</h3>
        <Button variant="secondary" onClick={handleAddExpenseButtonClick}>
          내역 추가
        </Button>
      </div>
      <div className="flex flex-col grow rounded-t-3xl overflow-hidden bg-secondary p-5 gap-6">
        <ExpenseList />
      </div>
    </div>
  );
}
