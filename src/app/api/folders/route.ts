import { z } from "zod";
import { getFolderList } from "../firebase";

const getFoldersRequestParams = z.object({
  path: z.string(),
});

export async function GET(request: Request) {
  const { path } = getFoldersRequestParams.parse(await request.json());

  const folders = await getFolderList(path);

  return Response.json({ folders });
}
