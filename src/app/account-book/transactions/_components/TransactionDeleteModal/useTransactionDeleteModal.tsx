import { overlay } from "overlay-kit";
import TransactionDeleteModal from ".";

const useTransactionDeleteModal = () => {
  const openTransactionDeleteModal = (id: string) => {
    return overlay.open(({ close, isOpen }) => {
      return (
        <TransactionDeleteModal
          isOpen={isOpen}
          onClose={close}
          targetTransactionId={id}
        />
      );
    });
  };

  return {
    openTransactionDeleteModal,
  };
};

export default useTransactionDeleteModal;
