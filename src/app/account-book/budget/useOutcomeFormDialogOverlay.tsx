import useOverlay from "@/hooks/useOverlay";
import { OutcomeFormValues } from "./types";
import OutcomeFormDialog from "./OutcomeFormDialog";

const useOutcomeFormDialogOverlay = () => {
  const overlay = useOverlay();

  const openOutcomeFormDialog = (
    params: {
      defaultValues?: OutcomeFormValues;
    } | void
  ) =>
    new Promise<OutcomeFormValues>((resolve) => {
      overlay.open(({ isOpen, close }) => (
        <OutcomeFormDialog
          isOpen={isOpen}
          close={close}
          onSubmit={(formValues) => resolve(formValues)}
          defaultValues={params?.defaultValues}
        />
      ));
    });

  return { openOutcomeFormDialog, closeOutcomeFormDialog: overlay.close };
};

export default useOutcomeFormDialogOverlay;
