import { overlay } from "overlay-kit";
import { IncomeFormValues } from "./types";
import IncomeFormDialog from "./IncomeFormDialog";

const useIncomeFormDialogOverlay = () => {
  const openIncomeFormDialog = (
    params: {
      defaultValues?: IncomeFormValues;
    } | void
  ) =>
    new Promise<IncomeFormValues>((resolve) => {
      overlay.open(({ isOpen, close }) => (
        <IncomeFormDialog
          isOpen={isOpen}
          close={close}
          onSubmit={(formValues) => resolve(formValues)}
          defaultValues={params?.defaultValues}
        />
      ));
    });

  return { openIncomeFormDialog, closeIncomeFormDialog: overlay.close };
};

export default useIncomeFormDialogOverlay;
