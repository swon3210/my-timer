import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  writeBatch,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { firestoreApp } from "./index";

// Firestore 인스턴스 초기화 (별도 프로젝트 사용)
export const firestore = getFirestore(firestoreApp);

// 컬렉션 경로 헬퍼
export const getGalleriesCollection = (userId: string) =>
  collection(firestore, `users/${userId}/galleries`);

export const getImageFoldersCollection = (userId: string) =>
  collection(firestore, `users/${userId}/imageFolders`);

export const getImagesCollection = (userId: string) =>
  collection(firestore, `users/${userId}/images`);

// Firestore 유틸리티 re-export
export {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  writeBatch,
};

export type { DocumentData, QueryDocumentSnapshot };

