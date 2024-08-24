import React, { Suspense } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import LogoSkeleton from "./logo-skeleton";
import DiscordLogo from "./logo";
import Link from "next/link";
import { SignOut } from "../auth/sign-out";

export default async function DropdownSkeleton() {
  return (
    <>
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
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="animate-pulse min-h-[14px] min-w-full bg-muted dark:bg-muted rounded-lg col-span-6"></div>
            <div className="animate-pulse min-h-[14px] min-w-full bg-muted dark:bg-muted rounded-lg col-span-6"></div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/dashboard/admin/settings">Settings</Link>
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
    </>
  );
}
