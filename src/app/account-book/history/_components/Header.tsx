"use client";

import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useAccountItemCategoriesQuery";
import useExpenseFormDialogOverlay from "@/app/_components/ExpenseFormDialog/useExpenseFormDialogOverlay";
import useAddAccountItemMutation from "@/domains/account-book/useAddAccountItemsMutation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Header() {
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
    <div className="relative flex justify-center items-center px-6 py-4">
      <h1 className="text-md font-semibold text-secondary-foreground">
        거래 내역
      </h1>

      <Button
        variant="secondary"
        size="sm"
        onClick={handleAddExpenseButtonClick}
        className="absolute right-6 h-8 w-8 p-0"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
