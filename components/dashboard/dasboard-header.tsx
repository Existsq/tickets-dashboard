import React, { Suspense } from "react";
import Link from "next/link";
import { Menu, MoreHorizontal, Package2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { auth } from "@/auth";
import { SignOut } from "@/components/auth/sign-out";
import DiscordLogo from "./logo";
import LogoSkeleton from "./logo-skeleton";
import { Navigation } from "./nav";
import { CurrentServerBox } from "./current-server-box";
import { cookies } from "next/headers";

const userNavLinks = [
  { name: "Analytics", href: "/analytics" },
  { name: "Servers", href: "/servers" },
  { name: "Tickets", href: "/tickets" },
  { name: "Integrations", href: "/integrations" },
  { name: "Settings", href: "/settings/profile" },
];

const adminNavLinks = [
  { name: "Sales", href: "/sales" },
  { name: "Statistics", href: "/statistics" },
  { name: "Users", href: "/users" },
  { name: "Metrics", href: "/metrics" },
  { name: "Settings", href: "/settings/profile" },
  { name: "Analytics", href: "/analytics" },
  { name: "Servers", href: "/servers" },
  { name: "Tickets", href: "/tickets" },
  { name: "Integrations", href: "/integrations" },
];

function Logo() {
  return (
    <>
      <Link
        href="#"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2 className="h-6 w-6" />
        <span className="sr-only">Tickets Bot</span>
      </Link>
    </>
  );
}

function isAdmin(email: string) {
  if (email == "makswow7@gmail.com") {
    return true;
  } else {
    return false;
  }
}

function isSeparating(navLink: string) {
  if (navLink == "Analytics") {
    return true;
  } else {
    return false;
  }
}

export default async function DashboardHeader() {
  // Получаем сессию на сервере
  const session = await auth();
  const currentServer = cookies().get("current-server")?.value || "";

  // Определяем данные пользователя
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "user@example.com";
  const isAdm = isAdmin(userEmail);

  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-[100]">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Logo />
          <Navigation
            isAdmin={isAdm}
            navlinks={isAdm ? adminNavLinks : userNavLinks}
            orientation="vertical"
          />
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden cursor-pointer"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="mt-16">
            <nav className="grid gap-6 text-lg font-medium">
              <Navigation
                isAdmin={isAdm}
                navlinks={isAdm ? adminNavLinks : userNavLinks}
                orientation="horizontal"
              />
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <CurrentServerBox server={currentServer} />

          <form className="flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tickets..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="relative rounded-full flex"
              >
                <Suspense fallback={<LogoSkeleton />}>
                  <DiscordLogo />
                </Suspense>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {userName}
                <p className="text-sm font-light">{userEmail}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/settings/profile">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/support">Support</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SignOut />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <ModeToggle align={"end"} /> */}
        </div>
      </header>
    </>
  );
}
