import useOverlay from "@/hooks/useOverlay";
import ExpenseFormDialog from "../../_components/ExpenseFormDialog";
import { ExpenseFormValues } from "./types";
import { TransactionType } from "@/domains/account-book/types";

const useExpenseFormDialogOverlay = () => {
  const overlay = useOverlay();

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
