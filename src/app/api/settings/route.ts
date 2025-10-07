import { getAppSettings, saveAppSettings } from "../../../lib/firebase";
import { appSettingsSchema } from "@/lib/types";
import { AuthRequest, withAuth } from "../firebase-admin";
import { NextRequest, NextResponse } from "next/server";

const setAppSettingsRequestParams = appSettingsSchema;

export const GET = withAuth(async function getHandler(request: NextRequest) {
  const { user } = request as AuthRequest;

  const appSettings = await getAppSettings(user.uid);

  return NextResponse.json({ appSettings });
});

export const POST = withAuth(async function (request: Request) {
  const { user } = request as AuthRequest;

  const appSettings = setAppSettingsRequestParams.parse(await request.json());

  await saveAppSettings(user.uid, appSettings);

  return NextResponse.json({});
});
