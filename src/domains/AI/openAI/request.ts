import axios from "axios";
import { OpenAICompletionRequestParams } from "@/app/api/open-ai/completion/type";

export const requestChatCompletion = async (
  params: OpenAICompletionRequestParams
): Promise<string> => {
  // TODO : serialize params 해야함 아니면 body 로 보내야함 (post로 바꿔서))
  const response = await axios.post<{ result: string }>(
    "/api/open-ai/completion",
    params
  );

  return response.data.result;
};
