import axios from "axios";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export const requestChatCompletion = async ({
  userContent,
  systemContent,
}: {
  userContent: string;
  systemContent: string;
}): Promise<string> => {
  const response = await axios.post(
    OPENAI_API_URL,
    {
      model: "gpt-4.1",
      messages: [
        {
          role: "user",
          content: userContent,
        },
        {
          role: "system",
          content: systemContent,
        },
      ],
      max_tokens: 150,
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.choices[0].message.content;
};
