import { useUserQuery } from "@/domains/users/useUserQuery";
import { User } from "@/lib/types";
import { createContext, useContext } from "react";

const UserContext = createContext<User | null>(null);

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

function UserProvider({ children }: { children: React.ReactNode }) {
  const { data: user } = useUserQuery();

  if (!user) {
    return null;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default UserProvider;
