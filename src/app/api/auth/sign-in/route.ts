import { z } from "zod";
import { signIn } from "../../firebase";

const SignInRequestParams = z.object({
  email: z.string(),
  password: z.string(),
});

export async function POST(request: Request) {
  const { email, password } = SignInRequestParams.parse(await request.json());

  const user = await signIn({ email, password });

  return Response.json({ user });
}
