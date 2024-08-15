"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { SignOut } from "@/components/sign-out";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname(); // Получаем текущий путь

  // Логика определения класса для ссылки
  const getLinkClass = (path: string) =>
    pathname === path
      ? "text-foreground font-semibold" // Стили для активной страницы
      : "text-muted-foreground transition-colors hover:text-foreground"; // Стили для остальных ссылок

  console.log(pathname); // Отладочная информация

  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-[100]">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Tickets Bot</span>
          </Link>
          <Link
            href="/dashboard/analytics"
            className={getLinkClass("/dashboard/analytics")}
          >
            Analytics
          </Link>
          <Link
            href="/dashboard/servers"
            className={getLinkClass("/dashboard/servers")}
          >
            Servers
          </Link>
          <Link href="#" className={getLinkClass("/dashboard/products")}>
            Products
          </Link>
          <Link href="#" className={getLinkClass("/dashboard/customers")}>
            Customers
          </Link>
          <Link
            href="/dashboard/settings"
            className={getLinkClass("/dashboard/settings")}
          >
            Settings
          </Link>
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
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Tickets Bot</span>
              </Link>
              <Link
                href="/dashboard/analytics"
                className={getLinkClass("/dashboard/analytics")}
              >
                Analytics
              </Link>
              <Link
                href="/dashboard/servers"
                className={getLinkClass("/dashboard/servers")}
              >
                Servers
              </Link>
              <Link href="#" className={getLinkClass("/dashboard/products")}>
                Products
              </Link>
              <Link href="#" className={getLinkClass("/dashboard/customers")}>
                Customers
              </Link>
              <Link
                href="/dashboard/settings"
                className={getLinkClass("/dashboard/settings")}
              >
                Settings
              </Link>
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
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link
                  href="/dashboard/settings"
                  className="hover:text-foreground"
                >
                  Settings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href="/dashboard/support"
                  className="hover:text-foreground"
                >
                  Support
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SignOut />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div>
            <ModeToggle align={"end"} />
          </div>
        </div>
      </header>

      <div>{children}</div>
    </>
  );
}
