import { ReactNode } from "react";
import DashboardHeader from "@/components/dashboard/header/dasboard-header";
import { Metadata } from "next";
import { auth } from "@/auth";
import { ServerProvider } from "@/components/server-context";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ServerProvider>
      <DashboardHeader />
      <main className="w-screen min-h-full">{children}</main>
    </ServerProvider>
  );
}
