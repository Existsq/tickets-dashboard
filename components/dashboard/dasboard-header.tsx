import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
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

const userNavLinks = [
  { name: "Analytics", href: "/dashboard/analytics" },
  { name: "Servers", href: "/dashboard/analytics" },
  { name: "Tickets", href: "/dashboard/tickets" },
  { name: "Integrations", href: "/dashboard/integrations" },
  { name: "Settings", href: "/dashboard/settings" },
];

const adminNavLinks = [
  { name: "Sales", href: "/dashboard/admin/sales" },
  { name: "Statistics", href: "/dashboard/admin/statistics" },
  { name: "Users", href: "/dashboard/admin/users" },
  { name: "Metrics", href: "/dashboard/admin/metrics" },
  { name: "Settings", href: "/dashboard/admin/settings" },
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

export default async function DashboardHeader() {
  // Получаем сессию на сервере
  const session = await auth();

  // Определяем данные пользователя
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "user@example.com";
  const userAvatar = session?.user?.image || "/default-avatar.png";

  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-[100]">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Logo />
          {isAdmin(userEmail) &&
            adminNavLinks.map((obj) => (
              <Link href={obj.href} key={obj.href}>
                {obj.name}
              </Link>
            ))}

          {!isAdmin(userEmail) &&
            userNavLinks.map((obj) => (
              <Link href={obj.href} key={obj.href}>
                {obj.name}
              </Link>
            ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Logo />

              {isAdmin(userEmail) &&
                adminNavLinks.map((obj) => (
                  <Link href={obj.href} key={obj.href}>
                    {obj.name}
                  </Link>
                ))}

              {!isAdmin(userEmail) &&
                userNavLinks.map((obj) => (
                  <Link href={obj.href} key={obj.href}>
                    {obj.name}
                  </Link>
                ))}

              {/* {userNavLinks.map((obj) => (
                <Link href={obj.href} key={obj.href}>
                  {obj.name}
                </Link>
              ))} */}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
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
                {!userAvatar ? (
                  <CircleUser className="min-h-full min-w-full" />
                ) : (
                  <Image
                    src={userAvatar}
                    alt="avatar"
                    width={256}
                    height={256}
                    className="justify-center items-center rounded-full"
                  />
                )}
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
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/dashboard/support">Support</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SignOut />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle align={"end"} />
        </div>
      </header>
    </>
  );
}
