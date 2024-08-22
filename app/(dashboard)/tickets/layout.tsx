import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Tickets",
  description: "Advanced form example using react-hook-form and Zod.",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return <>{children}</>;
}
