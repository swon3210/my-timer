import { z } from "zod";
import { addFolder, deleteFolder, getFolderList } from "../firebase";

const getFoldersRequestParams = z.object({
  path: z.string(),
});

export async function GET(request: Request) {
  const { path } = getFoldersRequestParams.parse(
    Object.fromEntries(new URL(request.url).searchParams)
  );

  const folders = await getFolderList(path);

  return Response.json({ folders });
}

export async function POST(request: Request) {
  const { path } = await request.json();

  await addFolder(path);

  return Response.json({});
}

export async function DELETE(request: Request) {
  const { path } = await request.json();

  await deleteFolder(path);

  return Response.json({});
}
