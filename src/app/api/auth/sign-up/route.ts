import { z } from "zod";
import { saveAppSettings, signUp } from "../../firebase";
import { AppSettings } from "@/lib/types";

const SignUpRequestParams = z.object({
  email: z.string(),
  password: z.string(),
});

export async function POST(request: Request) {
  const { email, password } = SignUpRequestParams.parse(await request.json());

  try {
    const user = await signUp({ email, password });

    const defaultAppSettings: AppSettings = {
      shouldExposeTimer: true,
      tickSeconds: 5,
      selectedBGM: undefined,
      selectedVoice: undefined,
    };

    await saveAppSettings(user.uid, defaultAppSettings);

    return Response.json({ user });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 400 });
    }
    return Response.json(
      { error: "알 수 없는 오류가 발생했습니다." },
      { status: 400 }
    );
  }
}
