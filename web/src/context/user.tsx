"use client";
import { createContext } from "react";
import type { User } from "@/types/user";

export const UserContext = createContext<User | null>(null);

interface Props {
  user: User;
  children: React.ReactNode;
}

export function UserProvider({ children, user }: Readonly<Props>) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
