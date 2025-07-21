export const imageFileToBase64 = (file: File) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
