import useTransactionCategoriesQuery from "@/domains/account-book/categories/useTransactionCategoriesQuery";
import useTransactionFormModal from "../TransactionFormModal/useTransactionFormModal";
import { requestChatCompletion } from "@/domains/AI/openAI/request";
import { TransactionFormData } from "@/types/transaction";
import { Category } from "@/domains/account-book/categories/types";
import { ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import useAddTransactionMutation from "@/domains/account-book/transactions/useAddTransactionMutation";
import { isEmpty } from "@/utils/text";
import { imageFileToBase64 } from "@/utils/image";
import { toast } from "sonner";
import dayjs from "dayjs";

const parseTransactionData = (
  message: string,
  categoryies: Category[]
): TransactionFormData => {
  const transactionFormData: TransactionFormData = {
    amount: 0,
    categoryId: "",
    description: "",
    date: "",
    paymentMethod: undefined,
    type: "EXPENSE",
  };

  const [firstMessage] = message.split("\n");

  const data = firstMessage.split("|").reduce((acc, item) => {
    const [key, value] = item.split(":");
    acc[key.trim()] = value.trim();
    return acc;
  }, {} as Record<string, string>);

  const categoryId = categoryies.find(
    (category) => category.displayedName === data["카테고리"]
  )?.id;

  // 카테고리 유효성 검사
  if (!categoryId) {
    throw new Error(`유효하지 않은 카테고리: ${data["카테고리"]}`);
  }

  transactionFormData.categoryId = categoryId;
  transactionFormData.amount = Number(data["금액"].replace("원", ""));
  transactionFormData.description = data["설명"] as string;
  transactionFormData.date = data["날짜"] as string;
  transactionFormData.paymentMethod = data["결재수단"] as
    | "CASH"
    | "CREDIT_CARD"
    | "DEBIT_CARD"
    | "TRANSFER"
    | undefined;

  return transactionFormData;
};

const requestTransactionAddCompletion = async (
  base64EncodedImage: string,
  categories: Category[]
) => {
  const systemContent = `당신은 유저의 지출 내역을 정해준 포맷으로 추출해줘야 합니다.`;

  const userContent = `
    이미지에서 일정한 형식의 내용을 추출해주세요.
    답변 형식은 "금액:[금액]|카테고리:[카테고리]|설명:[설명]|날짜:[날짜]|결재수단:[결재수단]"입니다. 
    답변은 반드시 정해진 형식으로만 해야합니다.
    여러 답변이 있다면 줄바꿈(\n)으로 구분해주세요.
    정보가 부족하여 답변이 어려운 상황이라서 답변 내용 일부를 비워두더라도 형식은 지켜야 합니다.
    금액은 숫자로만 작성해 주세요.
    카테고리는 반드시 ${categories
      .map((category) => `"${category.displayedName}"`)
      .join(",")} 중 하나여야 합니다.
    결재수단은 정확히 CASH,CREDIT_CARD,DEBIT_CARD,TRANSFER 중 하나여야 합니다.
    날짜는 YYYY-MM-DD 형식으로만 작성해 주세요. 
    오늘 날짜는 ${dayjs().format(
      "YYYY-MM-DD"
    )}입니다. 이 날짜를 기준으로 날짜를 추론해주세요.
  `;

  const message = await requestChatCompletion({
    model: "gpt-4.1",
    messages: [
      { role: "system", content: systemContent },
      {
        role: "user",
        content: [
          { type: "text", text: userContent },
          {
            type: "image_url",
            image_url: { url: base64EncodedImage },
          },
        ],
      },
    ],
    max_tokens: 4096,
  });

  return parseTransactionData(message, categories);
};

export default function AddTransactionByImageButton() {
  const { data: categories = [] } = useTransactionCategoriesQuery();

  const { mutateAsync: addTransaction } = useAddTransactionMutation();
  const { openTransactionFormModal } = useTransactionFormModal();

  const handleImageInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const [file] = Array.from(event.target.files ?? []);

    if (!file) {
      return;
    }

    event.target.value = "";

    try {
      const base64EncodedImage = await imageFileToBase64(file);

      const transactionData = await requestTransactionAddCompletion(
        base64EncodedImage,
        categories
      );

      const transactionFormValues = await openTransactionFormModal({
        defaultValues: transactionData,
      });

      if (!transactionFormValues) {
        return;
      }

      await addTransaction({
        transaction: {
          ...transactionFormValues,
          paymentMethod: isEmpty(transactionFormValues.paymentMethod)
            ? undefined
            : transactionFormValues.paymentMethod,
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("거래 내역 추가에 실패했습니다.");
    }
  };

  return (
    <Button asChild variant="outline" type="button">
      <label>
        <input
          className="hidden"
          type="file"
          accept="image/*"
          onChange={handleImageInput}
        />
        <ImagePlus className="w-4 h-4" />
      </label>
    </Button>
  );
}
