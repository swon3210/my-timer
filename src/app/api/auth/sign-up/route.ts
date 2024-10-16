import { z } from "zod";
import { signUp } from "../../firebase";

const SignUpRequestParams = z.object({
  email: z.string(),
  password: z.string(),
});

export async function POST(request: Request) {
  const { email, password } = SignUpRequestParams.parse(await request.json());

  const user = await signUp({ email, password });

  return Response.json({ user });
}
