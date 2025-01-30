import useOverlay from "@/hooks/useOverlay";
import BudgetFormDialog from "../BudgetFormDialog/BudgetFormDialog";
import { BudgetFormValues } from "../types";

const useBudgetFormDialogOverlay = () => {
  const overlay = useOverlay();

  const openBudgetFormDialog = (
    params: {
      defaultValues?: BudgetFormValues;
    } | void
  ) =>
    new Promise<BudgetFormValues>((resolve) => {
      overlay.open(({ isOpen, close }) => (
        <BudgetFormDialog
          isOpen={isOpen}
          close={close}
          onSubmit={(formValues) => resolve(formValues)}
          defaultValues={params?.defaultValues}
        />
      ));
    });

  return { openBudgetFormDialog, closeBudgetFormDialog: overlay.close };
};

export default useBudgetFormDialogOverlay;
