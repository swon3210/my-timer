export const optimizeImage = async (file: File): Promise<Blob> => {
  // 300KB 미만이면 원본 반환
  if (file.size < 300 * 1024) {
    return file;
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
      file.type,
      0.7 // 품질 70%로 압축
    );
  });
};
