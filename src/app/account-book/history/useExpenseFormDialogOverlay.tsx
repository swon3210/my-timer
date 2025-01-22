import useOverlay from "@/hooks/useOverlay";
import ExpenseFormDialog from "./ExpenseFormDialog";
import { ExpenseFormValues } from "./types";

const useExpenseFormDialogOverlay = () => {
  const overlay = useOverlay();

  const openExpenseFormDialog = (
    params: {
      defaultValues?: ExpenseFormValues;
    } | void
  ) =>
    new Promise<ExpenseFormValues>((resolve) => {
      overlay.open(({ isOpen, close }) => (
        <ExpenseFormDialog
          isOpen={isOpen}
          close={close}
          onSubmit={resolve}
          defaultValues={params?.defaultValues}
        />
      ));
    });

  return { openExpenseFormDialog, closeExpenseFormDialog: overlay.close };
};

export default useExpenseFormDialogOverlay;
