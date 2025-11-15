"use client";

import { SessionProvider } from "next-auth/react";

// Authentication Provider
export default function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}