import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLocalStorageItem = <T>(key: string) => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as Readonly<T>) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const setLocalStorageItem = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const isLocalEnv = () => {
  return process.env.NODE_ENV === "development";
};
