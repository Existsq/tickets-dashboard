import { ReactNode } from "react";
import DashboardHeader from "@/components/dashboard/dasboard-header";
import { Metadata } from "next";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  return (
    <>
      <DashboardHeader />
      <main className="w-screen min-h-full">{children}</main>
    </>
  );
}
