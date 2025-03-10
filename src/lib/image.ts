import { axiosInstance } from "./api";

export const optimizeImage = async (
  file: File,
  quality: number = 0.8
): Promise<Blob> => {
  if (file.size === 350 * 1024) {
    return file;
  }

  if (file.type === "image/gif") {
    return optimizeGif(file, quality);
  }

  // 이미지 로드
  const image = new Image();
  const imageUrl = URL.createObjectURL(file);

  await new Promise((resolve) => {
    image.onload = resolve;
    image.src = imageUrl;
  });

  // Canvas 생성 및 이미지 그리기
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas context를 생성할 수 없습니다.");
  }

  // 원본 크기 유지
  canvas.width = image.width;
  canvas.height = image.height;

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // 메모리 해제
  URL.revokeObjectURL(imageUrl);

  // 품질 조정하여 Blob으로 변환
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          resolve(file); // 실패시 원본 반환
        }
      },
      "image/webp",
      quality // 품질 95% 압축
    );
  });
};

export const optimizeGif = async (file: File, quality: number = 0.8) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("quality", quality.toString());

  const response = await axiosInstance.post(
    "http://localhost:3001/optimize-gif",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "arraybuffer",
    }
  );

  // 파일로 변환
  const blob = new Blob([response.data], { type: "image/gif" });
  return blob;
};
