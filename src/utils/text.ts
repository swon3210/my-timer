export const isEmpty = (text: string | null | undefined) => {
  return text == null || text.trim() === "";
};
