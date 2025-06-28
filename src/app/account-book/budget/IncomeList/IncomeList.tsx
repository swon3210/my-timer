import useExpenseFormDialogOverlay from "@/app/_components/ExpenseFormDialog/useExpenseFormDialogOverlay";
import useDateAtom from "../_atom/useDateAtom";
import { Button } from "@/components/ui/button";
import MonthManager from "./MonthManager";
// import useUpdateTransactionMutation from "@/domains/account-book/useUpdateTransactionMutation";
import {
  useTransactionsQuery,
  useSetTransactions,
} from "@/domains/account-book/useTransactionsQuery";
import { Pencil, Trash } from "lucide-react";

import { motion } from "framer-motion";
import useTransactionCategoriesQuery from "@/domains/account-book/categories/useTransactionCategoriesQuery";
// import useAddTransactionMutation from "@/domains/account-book/useAddTransactionMutation";
import dayjs from "dayjs";
import { Transaction } from "@/app/api/account-books/transactions/types";
import useDeleteTransactionMutation from "@/domains/account-book/useDeleteTransactionMutation";
// import { useUserSuspenseQuery } from "@/domains/users/useUserQuery";

function IncomeAddButton() {
  // const { date } = useDateAtom();

  const { openExpenseFormDialog, closeExpenseFormDialog } =
    useExpenseFormDialogOverlay();

  // const { data: user } = useUserSuspenseQuery();

  // const { mutateAsync: addTransaction } = useAddTransactionMutation();

  const { data: categories } = useTransactionCategoriesQuery();

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
      // await addTransaction({
      //   amount: Number(formValues.amount),
      //   categoryId: formValues.categoryId,
      //   type: formValues.type,
      //   date: date.toISOString(),
      //   description: formValues.description,
      //   userId: user.uid,
      // });

      closeExpenseFormDialog();
    } catch (error) {
      console.error(error);
    }
  };

  return <Button onClick={handleClick}>월 수입 추가</Button>;
}

function IncomeUpdateButton({ income }: { income: Transaction }) {
  const { openExpenseFormDialog } = useExpenseFormDialogOverlay();

  // const { mutateAsync: updateIncome } = useUpdateTransactionMutation();
  const { setTransactions } = useSetTransactions();

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

      setTransactions((accountItems) =>
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

      // await updateIncome({
      //   ...income,
      //   ...formValues,
      //   type: formValues.type as "INCOME",
      //   categoryId: formValues.categoryId!,
      // });
    } catch (error) {
      setTransactions((transactions) =>
        transactions.map((prevTransaction) =>
          prevTransaction.id === income.id ? income : prevTransaction
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

function IncomeDeleteButton({ income }: { income: Transaction }) {
  const { mutateAsync: deleteTransaction } = useDeleteTransactionMutation();
  const { setTransactions } = useSetTransactions();

  const handleClick = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) {
      return;
    }

    try {
      setTransactions((transactions) =>
        transactions.filter(
          (prevTransaction) => prevTransaction.id !== income.id
        )
      );
      await deleteTransaction(income.id);
    } catch (error) {
      setTransactions((transactions) => [...transactions, income]);
      console.error(error);
    }
  };

  return (
    <Button onClick={handleClick} variant="destructive">
      <Trash className="w-4 h-4" />
    </Button>
  );
}

function IncomeItem({ income }: { income: Transaction }) {
  const { data: categories } = useTransactionCategoriesQuery();

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

  const { data: accountItems } = useTransactionsQuery();

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
