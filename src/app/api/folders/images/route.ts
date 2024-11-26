import { z } from "zod";
import { addImages, deleteImage, getImageListFromFolder } from "../../firebase";

const getFoldersRequestParams = z.string();

export async function GET(request: Request) {
  const path = getFoldersRequestParams.parse(
    new URL(request.url).searchParams.get("path")
  );

  const images = await getImageListFromFolder(path);

  return Response.json({ images });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const path = formData.get("path") as string;
  const imageFiles = formData.getAll("images") as File[];

  if (!imageFiles || imageFiles.length === 0) {
    return Response.json({ error: "파일이 없습니다." }, { status: 400 });
  }

  // File 객체 유효성 검사
  const validFiles = imageFiles.filter((file): file is File => {
    return file instanceof File && !!file.name;
  });

  if (validFiles.length === 0) {
    return Response.json({ error: "유효한 파일이 없습니다." }, { status: 400 });
  }

  await addImages(path, imageFiles);

  return Response.json({});
}

export async function DELETE(request: Request) {
  const { path } = await request.json();

  await deleteImage(path);

  return Response.json({});
}
