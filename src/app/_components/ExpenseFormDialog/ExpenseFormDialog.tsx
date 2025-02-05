import { ExpenseFormValues } from "./types";
import ExpenseForm from "./ExpenseForm";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TransactionType } from "@/domains/account-book/types";

export default function ExpenseFormDialog({
  title = "내역 추가",
  isOpen,
  close,
  onSubmit,
  defaultValues,
  selectableTransactionTypes,
}: {
  title?: string;
  isOpen: boolean;
  close: () => void;
  onSubmit: (formValues: ExpenseFormValues) => void;
  defaultValues?: Partial<ExpenseFormValues>;
  selectableTransactionTypes?: TransactionType[];
}) {
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <ExpenseForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          selectableTransactionTypes={selectableTransactionTypes}
        />
      </DialogContent>
    </Dialog>
  );
}
