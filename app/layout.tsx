import type { Metadata } from "next";
import { Inter as FontSans, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from "geist/font/sans";


export const metadata: Metadata = {
  title: "Best Ticket Bot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={GeistSans.className}>
      <head />
      <body className={"min-h-screen bg-background font-sans antialiased"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
