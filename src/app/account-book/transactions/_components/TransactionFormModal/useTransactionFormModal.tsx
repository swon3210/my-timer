import { TransactionFormData } from "@/types/transaction";
import { overlay } from "overlay-kit";
import TransactionFormModal from ".";

const useTransactionFormModal = () => {
  const openTransactionFormModal = ({
    defaultValues,
  }: {
    defaultValues?: TransactionFormData;
  }) =>
    overlay.openAsync<TransactionFormData | undefined>(({ close, isOpen }) => {
      return (
        <TransactionFormModal
          isOpen={isOpen}
          onClose={close}
          defaultValues={defaultValues}
        />
      );
    });

  return {
    openTransactionFormModal,
  };
};

export default useTransactionFormModal;
