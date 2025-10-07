"use client";

import { useUserQuery } from "@/domains/users/useUserQuery";
import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { toast } from "sonner";

const exceptionPages = ["/sign-in", "/sign-up"];

export default function LoginGuard({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();

  const { data: user, isLoading } = useUserQuery({
    retry: false,
  });

  const isRouteGuardException = exceptionPages.includes(pathname);

  useEffect(() => {
    const shouldRedirect = !isLoading && !user && !isRouteGuardException;

    if (shouldRedirect) {
      router.replace("/sign-in");
      toast.error("로그인이 필요합니다");
    }
  }, [isLoading, user, isRouteGuardException, router]);

  if (isLoading && !isRouteGuardException) {
    return null;
  }

  return children;
}
