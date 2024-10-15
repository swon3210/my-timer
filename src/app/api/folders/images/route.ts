import { z } from "zod";
import { getImageListFromFolder } from "../../firebase";

const getFoldersRequestParams = z.string();

export async function GET(request: Request) {
  const path = getFoldersRequestParams.parse(
    new URL(request.url).searchParams.get("path")
  );

  const images = await getImageListFromFolder(path);

  return Response.json({ images });
}
