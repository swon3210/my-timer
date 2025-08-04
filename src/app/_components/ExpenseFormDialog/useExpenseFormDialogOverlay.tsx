import { overlay } from "overlay-kit";
import ExpenseFormDialog from "../../_components/ExpenseFormDialog";
import { ExpenseFormValues } from "./types";
import { TransactionType } from "@/app/api/account-books/transactions/types";

const useExpenseFormDialogOverlay = () => {
  const openExpenseFormDialog = (
    params: {
      defaultValues?: Partial<ExpenseFormValues>;
      selectableTransactionTypes?: TransactionType[];
      title?: string;
    } | void
  ) =>
    new Promise<ExpenseFormValues>((resolve) => {
      overlay.open(({ isOpen, close }) => (
        <ExpenseFormDialog
          isOpen={isOpen}
          close={close}
          onSubmit={resolve}
          defaultValues={params?.defaultValues}
          selectableTransactionTypes={params?.selectableTransactionTypes}
          title={params?.title}
        />
      ));
    });

  return { openExpenseFormDialog, closeExpenseFormDialog: overlay.close };
};

export default useExpenseFormDialogOverlay;
