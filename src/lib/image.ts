import { axiosInstance } from "./api";

export const optimizeImage = async (file: File): Promise<Blob> => {
  if (file.size < 350 * 1024) {
    return file;
  }

  if (file.type === "image/gif") {
    return optimizeGif(file, 0.8);
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

  // 이미지 크기 계산
  let newWidth = image.width;
  let newHeight = image.height;
  const MAX_SIZE = 1980;

  if (Math.max(image.width, image.height) < MAX_SIZE) {
    return file;
  }

  if (image.width > image.height) {
    if (image.width > MAX_SIZE) {
      newWidth = MAX_SIZE;
      newHeight = (image.height * MAX_SIZE) / image.width;
    }
  } else {
    if (image.height > MAX_SIZE) {
      newHeight = MAX_SIZE;
      newWidth = (image.width * MAX_SIZE) / image.height;
    }
  }

  // 새로운 크기로 캔버스 설정
  canvas.width = newWidth;
  canvas.height = newHeight;

  ctx.drawImage(image, 0, 0, newWidth, newHeight);

  // 메모리 해제
  URL.revokeObjectURL(imageUrl);

  // Blob으로 변환
  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          // 원본 파일과 변환된 파일의 크기를 비교
          if (blob.size < file.size) {
            resolve(blob);
          } else {
            resolve(file); // 변환된 파일이 더 크면 원본 반환
          }
        } else {
          resolve(file); // 실패시 원본 반환
        }
      },
      "image/webp",
      1
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
