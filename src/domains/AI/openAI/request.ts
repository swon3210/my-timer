import axios from "axios";

export const requestChatCompletion = async ({
  userContent,
  systemContent,
}: {
  userContent: string;
  systemContent: string;
}): Promise<string> => {
  const response = await axios.get<{ result: string }>(
    "/api/open-ai/completion",
    {
      params: {
        userContent,
        systemContent,
      },
    }
  );

  return response.data.result;
};
