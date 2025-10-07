import { z } from "zod";
import {
  addImages,
  deleteImage,
  getImageListFromFolder,
  getUserStoragePath,
} from "../../../../lib/firebase";
import { AuthRequest, withAuth } from "../../firebase-admin";
import { NextResponse } from "next/server";

const getFoldersRequestParams = z.string();

export const GET = withAuth(async function (request: AuthRequest) {
  const path = getFoldersRequestParams.parse(
    new URL(request.url).searchParams.get("path")
  );

  const userStoragePath = getUserStoragePath(request.user, path);

  const images = await getImageListFromFolder(userStoragePath);

  return NextResponse.json({ images });
});

export const POST = withAuth(async function (request: AuthRequest) {
  const formData = await request.formData();
  const path = formData.get("path") as string;
  const userStoragePath = getUserStoragePath(request.user, path);
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

  await addImages(userStoragePath, imageFiles);

  return NextResponse.json({});
});

export const DELETE = withAuth(async function (request: AuthRequest) {
  const { path } = await request.json();

  const userStoragePath = getUserStoragePath(request.user, path);

  await deleteImage(userStoragePath);

  return NextResponse.json({});
});
