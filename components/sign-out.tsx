"use client";
import { signOut } from "next-auth/react";

export function SignOut() {
  return <button onClick={() => signOut({callbackUrl: "/auth/login"})}>Sign Out</button>;
}
