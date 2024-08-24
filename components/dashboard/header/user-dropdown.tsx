import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import UserAvatar from './user-avatar';

export default function UserDropdown({ session }: { session: any }) {
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "user@example.com";
  const userImage = session?.user?.image || null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <Button variant="secondary" size="icon" className="relative rounded-full flex"> */}
          <UserAvatar src={userImage} />
          {/* <span className="sr-only">Toggle user menu</span> */}
        {/* </Button> */}
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
          <p>Sign out</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}