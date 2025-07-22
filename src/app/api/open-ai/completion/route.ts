const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

import axios from "axios";
import { AuthRequest, withAuth } from "../../firebase-admin";
import { openAICompletionRequestSchema } from "./type";
import { NextResponse } from "next/server";

export const GET = withAuth(async function (request: AuthRequest) {
  const { userContent, systemContent } = openAICompletionRequestSchema.parse(
    Object.fromEntries(new URL(request.url).searchParams)
  );

  try {
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

    const result = response.data.choices[0].message.content;
    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get completion" },
      { status: 500 }
    );
  }
});
