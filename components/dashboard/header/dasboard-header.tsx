import React from "react";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { auth } from "@/auth";
import { Navigation } from "./user-navigation";
import { CurrentServerBox, Server } from "./current-server-box";
import UserDropdown from "./user-dropdown";
import { Input } from "../../ui/input";

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

const servers: Server[] = [
  { value: "Server 1", label: "Server 1" },
  { value: "Server 2", label: "Server 2" },
  { value: "Server 3", label: "Server 3" },
  { value: "Server 5", label: "Server 5" },
];

// Determine if user is admin
function isAdmin(email: string): boolean {
  return email === "makswow7@gmail.com";
}

export default async function DashboardHeader() {
  const session = await auth();
  const userEmail = session?.user?.email || "user@example.com";
  const isAdm = isAdmin(userEmail);

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-[100]">
      {/* Main Navigation */}
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Navigation
          isAdmin={isAdm}
          navlinks={isAdm ? adminNavLinks : userNavLinks}
          orientation="vertical"
        />
      </nav>

      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
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

      {/* Right Side of Header */}
      <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <CurrentServerBox initialFrameworks={servers} />

        <div className="flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tickets..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </div>

        <UserDropdown session={session} />
      </div>
    </header>
  );
}
