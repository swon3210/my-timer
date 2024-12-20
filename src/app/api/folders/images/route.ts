import { z } from "zod";
import { addImages, deleteImage, getImageListFromFolder } from "../../firebase";
import { withAuth } from "../../firebase-admin";
import { NextRequest, NextResponse } from "next/server";

const getFoldersRequestParams = z.string();

export const GET = withAuth(async function (request: NextRequest) {
  const path = getFoldersRequestParams.parse(
    new URL(request.url).searchParams.get("path")
  );

  const images = await getImageListFromFolder(path);

  return NextResponse.json({ images });
});

export const POST = withAuth(async function (request: NextRequest) {
  const formData = await request.formData();
  const path = formData.get("path") as string;
  const imageFiles = formData.getAll("images") as File[];

  if (!imageFiles || imageFiles.length === 0) {
    return NextResponse.json({ error: "파일이 없습니다." }, { status: 400 });
  }

  // File 객체 유효성 검사
  const validFiles = imageFiles.filter((file): file is File => {
    return file instanceof File && !!file.name;
  });

  if (validFiles.length === 0) {
    return NextResponse.json(
      { error: "유효한 파일이 없습니다." },
      { status: 400 }
    );
  }

  await addImages(path, imageFiles);

  return NextResponse.json({});
});

export const DELETE = withAuth(async function (request: NextRequest) {
  const { path } = await request.json();

  await deleteImage(path);

  return NextResponse.json({});
});
