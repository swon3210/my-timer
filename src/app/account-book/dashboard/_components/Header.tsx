"use client";

import { useUserQuery } from "@/domains/users/useUserQuery";

export default function Header() {
  const { data: user } = useUserQuery();

  return (
    <div className="flex justify-center items-center px-6 py-4">
      <h1 className="text-md font-semibold text-secondary-foreground">
        목표 관리
      </h1>
    </div>
  );
}
