import { getAppSettings, saveAppSettings } from "../firebase";
import { appSettingsSchema } from "@/lib/types";

const setAppSettingsRequestParams = appSettingsSchema;

export async function GET() {
  const appSettings = await getAppSettings("2");

  return Response.json({ appSettings });
}

export async function POST(request: Request) {
  const { shouldExposeTimer, tickSeconds, selectedBGM, selectedVoice } =
    setAppSettingsRequestParams.parse(
      Object.fromEntries(new URLSearchParams(await request.text()))
    );

  await saveAppSettings("2", {
    shouldExposeTimer,
    tickSeconds,
    selectedBGM,
    selectedVoice,
  });

  return Response.json({});
}
