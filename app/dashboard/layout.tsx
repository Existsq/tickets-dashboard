import { ReactNode } from "react";
import DashboardHeader from "@/components/dashboard/dasboard-header";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      <main>{children}</main>
    </>
  );
}
