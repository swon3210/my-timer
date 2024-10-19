"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useState } from "react";
// import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
// import { isServer } from "./contants";
import { useIsMounted } from "./hooks";

// TODO : 정확한 동작 원리와 사용법 파악
// const persister = createSyncStoragePersister({
//   storage: isServer ? undefined : window.localStorage,
// });

export function QueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          gcTime: 1000 * 60 * 60 * 24, // 24 hours
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {/* <PersistQueryClientProvider
        client={client}
        persistOptions={{ persister }}
      > */}
      {children}
      {/* </PersistQueryClientProvider> */}
    </QueryClientProvider>
  );
}

export const SSRSafeSuspense = ({
  children,
  fallback,
}: React.PropsWithChildren & { fallback: React.ReactNode }) => {
  const isMounted = useIsMounted();

  return isMounted ? (
    <Suspense fallback={fallback}>{children}</Suspense>
  ) : (
    fallback
  );
};
