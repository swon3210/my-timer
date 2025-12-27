const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

import axios from "axios";
import { NextResponse } from "next/server";
import { openAICompletionRequestSchema } from "./type";

export const POST = async function (request: Request) {
  const params = await request.json();

  const validatedParams = openAICompletionRequestSchema.parse(params);

  try {
    const response = await axios.post(OPENAI_API_URL, validatedParams, {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const result = response.data.choices[0].message.content;
    return NextResponse.json({ result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to get completion" },
      { status: 400 }
    );
  }
};
