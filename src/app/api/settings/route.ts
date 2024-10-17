import { z } from "zod";
import { getAppSettings, saveAppSettings } from "../firebase";

export type AppSettings = z.infer<typeof setAppSettingsRequestParams>;

const setAppSettingsRequestParams = z.object({
  shouldExposeTimer: z.boolean(),
  tickSeconds: z.number(),
  selectedBGM: z.string(),
  selectedVoice: z.string(),
});

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
