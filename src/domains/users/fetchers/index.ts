import {
  getAppSettings as getAppSettingsFromFirebase,
  saveAppSettings as saveAppSettingsToFirebase,
} from "@/lib/firebase";
import { getCurrentUser } from "@/lib/firebase/auth";
import { User } from "@/lib/types";

export const getSettings = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const appSettings = await getAppSettingsFromFirebase(user.uid);
  return appSettings;
};

export const getUser = async (): Promise<User | null> => {
  const firebaseUser = await getCurrentUser();

  if (!firebaseUser) {
    return null;
  }

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email ?? "",
    displayName: firebaseUser.displayName ?? undefined,
    imageUrl: firebaseUser.photoURL ?? undefined,
  };
};
