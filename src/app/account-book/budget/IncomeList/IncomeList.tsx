import useExpenseFormDialogOverlay from "@/app/_components/ExpenseFormDialog/useExpenseFormDialogOverlay";
import useDateAtom from "../_atom/useDateAtom";
import { Button } from "@/components/ui/button";
import MonthManager from "./MonthManager";
import { AccountItem } from "@/domains/account-book/types";
import useUpdateAccountItemMutation from "@/domains/account-book/useUpdateAccountItemMutation";
import {
  useAccountItemsQuery,
  useSetAccountItems,
} from "@/domains/account-book/useAccountItemsQuery";
import { Pencil, Trash } from "lucide-react";
import useDeleteAccountItemMutation from "@/domains/account-book/useDeleteAccountItemMutation";

import { motion } from "framer-motion";
import useAccountItemCategoriesQuery from "@/domains/account-book/categories/useAccountItemCategoriesQuery";
import useAddAccountItemMutation from "@/domains/account-book/useAddAccountItemsMutation";
import dayjs from "dayjs";

function IncomeAddButton() {
  const { date } = useDateAtom();

  const { openExpenseFormDialog, closeExpenseFormDialog } =
    useExpenseFormDialogOverlay();

  const { mutateAsync: addAccountItem } = useAddAccountItemMutation();

  const { data: categories } = useAccountItemCategoriesQuery();

  const handleClick = async () => {
    const formValues = await openExpenseFormDialog({
      selectableTransactionTypes: [],
      defaultValues: {
        type: "INCOME",
      },
      title: "월 수입 추가",
    });

    if (formValues.categoryId == null) {
      return;
    }

    const category = categories?.find(
      (category) => category.id === formValues.categoryId
    );

    if (category == null) {
      return;
    }

    try {
      await addAccountItem({
        amount: Number(formValues.amount),
        categoryId: formValues.categoryId,
        type: formValues.type,
        date: date.toISOString(),
        categoryDisplayedName: category.displayedName,
        description: formValues.description,
      });

      closeExpenseFormDialog();
    } catch (error) {
      console.error(error);
    }
  };

  return <Button onClick={handleClick}>월 수입 추가</Button>;
}

function IncomeUpdateButton({ income }: { income: AccountItem }) {
  const { openExpenseFormDialog } = useExpenseFormDialogOverlay();

  const { mutateAsync: updateIncome } = useUpdateAccountItemMutation();
  const { setAccountItems } = useSetAccountItems();

  const handleClick = async () => {
    const formValues = await openExpenseFormDialog({
      title: "월 수입 수정",
      selectableTransactionTypes: [],
      defaultValues: {
        amount: income.amount,
        categoryId: income.categoryId,
        type: income.type,
        description: income.description,
        date: income.date,
      },
    });

    try {
      if (formValues.categoryId == null) {
        return;
      }

      setAccountItems((accountItems) =>
        accountItems.map((prevAccountItem) =>
          prevAccountItem.id === income.id
            ? {
                ...prevAccountItem,
                ...formValues,
                type: "INCOME",
                categoryId: formValues.categoryId!,
              }
            : prevAccountItem
        )
      );

      await updateIncome({
        ...income,
        ...formValues,
        type: formValues.type as "INCOME",
        categoryId: formValues.categoryId!,
      });
    } catch (error) {
      setAccountItems((accountItems) =>
        accountItems.map((prevAccountItem) =>
          prevAccountItem.id === income.id ? income : prevAccountItem
        )
      );

      console.error(error);
    }
  };

  return (
    <Button onClick={handleClick} variant="outline">
      <Pencil className="w-4 h-4" />
    </Button>
  );
}

function IncomeDeleteButton({ income }: { income: AccountItem }) {
  const { mutateAsync: deleteIncome } = useDeleteAccountItemMutation();
  const { setAccountItems } = useSetAccountItems();

  const handleClick = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) {
      return;
    }

    try {
      setAccountItems((accountItems) =>
        accountItems.filter(
          (prevAccountItem) => prevAccountItem.id !== income.id
        )
      );
      await deleteIncome(income.id);
    } catch (error) {
      setAccountItems((accountItems) => [...accountItems, income]);
      console.error(error);
    }
  };

  return (
    <Button onClick={handleClick} variant="destructive">
      <Trash className="w-4 h-4" />
    </Button>
  );
}

function IncomeItem({ income }: { income: AccountItem }) {
  const { data: categories } = useAccountItemCategoriesQuery();

  const category = categories?.find(
    (category) => category.id === income.categoryId
  );

  return (
    <motion.div
      key={income.id}
      className="flex items-center space-x-4 bg-gray-50 p-4 rounded-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="flex-grow font-medium text-gray-700">
        {category?.displayedName}
      </span>
      <div className="relative flex items-center">
        <span className="absolute left-3 text-gray-500"></span>
        <span className="text-gray-500">
          ₩ {income.amount.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <IncomeUpdateButton income={income} />
        <IncomeDeleteButton income={income} />
      </div>
    </motion.div>
  );
}

function IncomeList() {
  const { date } = useDateAtom();

  const { data: accountItems } = useAccountItemsQuery();

  const incomes = accountItems?.filter(
    (accountItem) =>
      accountItem.type === "INCOME" &&
      dayjs(accountItem.date).isSame(date, "month")
  );

  const totalIncome = incomes?.reduce((acc, income) => acc + income.amount, 0);

  return (
    <div className="flex flex-col space-y-12">
      <div className="flex justify-between items-center">
        <MonthManager />
        <IncomeAddButton />
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">
          월 수입 ({totalIncome?.toLocaleString()}원)
        </h2>
        {incomes?.map((income) => (
          <IncomeItem key={income.id} income={income} />
        ))}
      </div>
    </div>
  );
}

export default IncomeList;
