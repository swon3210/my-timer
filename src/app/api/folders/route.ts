import { z } from "zod";
import { addFolder, deleteFolder, getFolderList } from "../firebase";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "../firebase-admin";

const getFoldersRequestParams = z.object({
  path: z.string(),
});

export const GET = withAuth(async function (request: NextRequest) {
  const { path } = getFoldersRequestParams.parse(
    Object.fromEntries(new URL(request.url).searchParams)
  );

  const folders = await getFolderList(path);

  return NextResponse.json({ folders });
});

export const POST = withAuth(async function (request: NextRequest) {
  const { path } = await request.json();

  await addFolder(path);

  return NextResponse.json({});
});

export const DELETE = withAuth(async function (request: NextRequest) {
  const { path } = await request.json();

  await deleteFolder(path);

  return NextResponse.json({});
});
