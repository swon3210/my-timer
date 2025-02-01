import useOverlay from "@/hooks/useOverlay";
import { BudgetFormValues } from "../types";
import BudgetFormDialog from "../BudgetFormDialog";

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
