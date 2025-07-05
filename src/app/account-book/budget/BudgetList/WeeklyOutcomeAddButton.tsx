import { Button } from "@/components/ui/button";
import useOutcomeFormDialogOverlay from "../useOutcomeFormDialogOverlay";
import { useAddBudgetMutation } from "@/domains/account-book/budgets/useAddBudgetMutation";

export default function WeeklyOutcomeAddButton() {
  const { openOutcomeFormDialog } = useOutcomeFormDialogOverlay();

  const { mutateAsync: addBudget } = useAddBudgetMutation();

  const handleClick = async () => {
    const formValues = await openOutcomeFormDialog();

    try {
      await addBudget({
        amount: formValues.amount,
        categoryId: formValues.categoryId,
        type: formValues.type,
        date: new Date().toISOString(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return <Button onClick={handleClick}>지출 예산 추가</Button>;
}
