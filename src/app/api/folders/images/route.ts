import { z } from "zod";
import { addImage, deleteImage, getImageListFromFolder } from "../../firebase";

const getFoldersRequestParams = z.string();

export async function GET(request: Request) {
  const path = getFoldersRequestParams.parse(
    new URL(request.url).searchParams.get("path")
  );

  const images = await getImageListFromFolder(path);

  return Response.json({ images });
}

export async function POST(request: Request) {
  const { path, image } = await request.json();

  await addImage(path, image);

  return Response.json({});
}

export async function DELETE(request: Request) {
  const { path } = await request.json();

  await deleteImage(path);

  return Response.json({});
}
