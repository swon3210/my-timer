"use client";

import {
  QueryKey,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
  // UseSuspenseQueryOptions,
} from "@tanstack/react-query";
import { axiosInstance } from "./api";
import { z } from "zod";
import { appSettingsSchema } from "./types";

// TODO : QueryKey Name 타입 추가 필요
export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();

  return (queryKey: QueryKey) => queryClient.invalidateQueries({ queryKey });
};

// const useCustomSuspenseQuery = <T>(
//   options: UseSuspenseQueryOptions<T> & { initialData: T }
// ) => {
//   return useSuspenseQuery({
//     ...options,
//     // queryFn: (context) => {
//     //   if (isServer) {
//     //     return options.initialData;
//     //   }

//     //   if (typeof options.queryFn === "function") {
//     //     return options.queryFn(context);
//     //   }
//     //   throw new Error("queryFn must be a function");
//     // },
//   });
// };

const getImageUrlsResponseSchema = z.object({
  images: z.array(z.string()),
});

export const useImagesQuery = ({
  categoryName,
  folderName,
}: {
  categoryName: string | null;
  folderName: string | null;
}) => {
  const IMAGE_QUERY_KEY = ["images", { categoryName, folderName }] as const;

  return useQuery({
    queryKey: IMAGE_QUERY_KEY,
    queryFn: async ({ queryKey: [, { categoryName, folderName }] }) => {
      if (categoryName == null || folderName == null) {
        throw new Error("categoryName 혹은 folderName 이 비어있습니다");
      }

      // TODO : 예외처리
      const response = await axiosInstance.get("/api/folders/images", {
        params: {
          path: `/images/${decodeURIComponent(
            categoryName
          )}/${decodeURIComponent(folderName)}`,
        },
      });

      const { images } = getImageUrlsResponseSchema.parse(response.data);

      return images;
    },
    enabled: categoryName != null && folderName != null,
  });
};

const getFolderNamesResponseSchema = z.object({
  folders: z.array(z.string()),
});

export const getFolderNamesQueryKey = (categoryName: string | null) =>
  ["folders", { categoryName }] as const;

export const useFolderNamesQuery = ({
  categoryName,
}: {
  categoryName: string | null;
}) => {
  const IMAGE_QUERY_KEY = getFolderNamesQueryKey(categoryName);

  return useQuery({
    queryKey: IMAGE_QUERY_KEY,
    queryFn: async ({ queryKey: [, { categoryName }] }) => {
      if (categoryName == null) {
        throw new Error("categoryName 이 비어있습니다");
      }

      // TODO : 예외처리
      const response = await axiosInstance.get("/api/folders", {
        params: {
          path: `/images/${decodeURIComponent(categoryName)}`,
        },
      });

      const { folders } = getFolderNamesResponseSchema.parse(response.data);

      return folders;
    },
    enabled: categoryName != null,
    // TODO : 타입 정합성 맞추기
    select: (data) =>
      (data?.map((folder) => folder.split("/").pop()) ?? []) as string[],
  });
};

export const useCategoryNamesQuery = () => {
  const IMAGE_QUERY_KEY = ["categories"] as const;

  return useQuery({
    queryKey: IMAGE_QUERY_KEY,
    queryFn: async () => {
      // TODO : 예외처리
      const response = await axiosInstance.get("/api/folders", {
        params: {
          path: `/images`,
        },
      });

      const { folders } = getFolderNamesResponseSchema.parse(response.data);

      return folders;
    },
    select: (data) => data?.map((folder) => folder.split("/").pop()),
  });
};

const getSettingsResponseSchema = z.object({
  appSettings: appSettingsSchema,
});

export const useSettingsSuspenseQuery = () => {
  const SETTINGS_QUERY_KEY = ["settings"] as const;

  return useSuspenseQuery({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: async () => {
      const response = await axiosInstance.get("/api/settings");

      const { appSettings } = getSettingsResponseSchema.parse(response.data);

      return appSettings;
    },
    persister: undefined,
    initialData: undefined,
    initialDataUpdatedAt: undefined,
  });
};

export const useSettingsQuery = () => {
  const SETTINGS_QUERY_KEY = ["settings"] as const;

  return useQuery({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: async () => {
      const response = await axiosInstance.get("/api/settings");

      const { appSettings } = getSettingsResponseSchema.parse(response.data);

      return appSettings;
    },
  });
};
