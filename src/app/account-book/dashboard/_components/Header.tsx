"use client";

import { useUserQuery } from "@/domains/users/useUserQuery";

export default function Header() {
  const { data: user } = useUserQuery();

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-semibold">
          반갑습니다, {user?.displayName ?? "사용자"}님
        </h1>
      </div>
    </div>
  );
}
