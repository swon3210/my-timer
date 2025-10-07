import { z } from "zod";
import { addFolder, deleteFolders, getFolderList } from "../../../lib/firebase";
import { getUserStoragePath } from "../../../lib/firebase";
import { NextResponse } from "next/server";
import { AuthRequest, withAuth } from "../firebase-admin";

const getFoldersRequestParams = z.object({
  path: z.string(),
});

export const GET = withAuth(async function (request: AuthRequest) {
  const { path } = getFoldersRequestParams.parse(
    Object.fromEntries(new URL(request.url).searchParams)
  );

  const userStoragePath = getUserStoragePath(request.user, path);

  const folders = await getFolderList(userStoragePath);

  return NextResponse.json({ folders });
});

export const POST = withAuth(async function (request: AuthRequest) {
  const { path } = await request.json();

  const userStoragePath = getUserStoragePath(request.user, path);

  await addFolder(userStoragePath);

  return NextResponse.json({});
});

const deleteFoldersRequestParams = z.object({
  paths: z.array(z.string()),
});

export const DELETE = withAuth(async function (request: AuthRequest) {
  const { paths } = deleteFoldersRequestParams.parse({
    paths: new URL(request.url).searchParams.get("paths")?.split(",") ?? [],
  });

  await deleteFolders(paths);

  return NextResponse.json({});
});
