import { NextRequest, NextResponse } from "next/server";
import sharp from "sharp";

async function compressGif(
  inputBuffer: Buffer,
  options: {
    quality?: number;
    width?: number;
    height?: number;
  } = {}
): Promise<Buffer> {
  const { quality = 0.8, width = 800, height = 800 } = options;

  try {
    return inputBuffer;
    // const optimizedBuffer = await sharp(inputBuffer, { animated: true })
    //   .resize({
    //     width: 500,
    //     height: 500,
    //     // 원하는 크기로 조정
    //     fit: "inside",
    //   })
    //   .gif({
    //     effort: 7, // 압축 수준 (1-10)
    //   })
    //   .toBuffer();

    // return optimizedBuffer;
  } catch (error) {
    console.error("GIF 압축 중 에러 발생:", error);
    throw error;
  }
}

export const POST = async (req: NextRequest) => {
  try {
    // FormData에서 파일 추출
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const quality = formData.get("quality") as string | null;

    if (!file) {
      return NextResponse.json({ error: "파일이 없습니다" }, { status: 400 });
    }

    // // File을 Buffer로 변환
    // const buffer = Buffer.from(await file.arrayBuffer());

    // GIF 압축
    // const optimizedBuffer = await compressGif(buffer, {
    //   quality: quality ? parseInt(quality) : 80,
    // });

    // File을 ArrayBuffer로 변환 후 Base64로 인코딩
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = buffer.toString("base64");

    return NextResponse.json({
      success: true,
      data: `data:image/gif;base64,${base64}`,
    });
  } catch (error) {
    console.error("GIF 압축 중 에러:", error);
    return NextResponse.json({ error: "GIF 압축 실패" }, { status: 500 });
  }
};
