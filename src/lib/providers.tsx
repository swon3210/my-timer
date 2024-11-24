"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { useIsMounted } from "./hooks";

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

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
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
