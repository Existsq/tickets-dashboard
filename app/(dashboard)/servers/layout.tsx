import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Servers",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return <>{children}</>;
}
