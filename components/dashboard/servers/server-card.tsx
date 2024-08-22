import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import ServerSummary from "./server-summary";

export type ServerCardProps = {
  members: string;
  owner: string;
  roles: string;
  premium: boolean;
};

export default function ServerCard(props: ServerCardProps) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage alt="server avatar" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          {/* <div className="flex-col items-center justify-start space-y-1"> */}
          <CardTitle>Test</CardTitle>
          {/* <CardDescription>Members: 2341</CardDescription> */}
          {/* </div> */}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Export</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Set to current</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="grid grid-cols-2 grid-rows-2 gap-4 pb-10">
        <ServerSummary value={props.members} label="Members" />
        <ServerSummary value={props.owner} label="Owner" />
        <ServerSummary value={props.roles} label="Roles" />
        <ServerSummary
          value={props.premium ? "Active" : "Inactive"}
          label="Premium"
        />
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4">
        <Button variant="default" className="w-full">
          Manage settings
        </Button>
        <Button variant="outline" className="w-full">
          Select as current
        </Button>
      </CardFooter>
    </Card>
  );
}
