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
import { cn } from "@/lib/utils";
import ModalOpenerButton from "./modal-button";

export type ServerSummaryType = {
  label?: string;
  value?: string;
  className?: string;
};

export function ServerCardSummary(props: ServerSummaryType) {
  return (
    <div
      className={cn(
        "w-full bg-background border-border border-[1px] rounded-sm z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left sm:px-8 sm:py-6",
        props.className
      )}
    >
      <span className="text-xs text-muted-foreground">{props.label}</span>
      <span className="text-lg font-bold leading-none sm:text-2xl">
        {props.value}
      </span>
    </div>
  );
}

export type ServerSummarySkeletonType = {
  className?: string;
};

export function ServerCardSummarySkeleton(props: ServerSummarySkeletonType) {
  return (
    <div
      className={cn(
        "w-full bg-background border-border border-[1px] rounded-sm z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left sm:px-8 sm:py-6 space-y-2",
        props.className
      )}
    >
      <div className="animate-pulse bg-muted w-2/3 rounded-sm h-4"></div>
      <div className="animate-pulse bg-muted w-full rounded-sm h-4"></div>
    </div>
  );
}

export type ServerCardProps = {
  members?: string;
  owner?: string;
  roles?: string;
  premium?: boolean;
  name?: string;
  currentServer?: string;
};

export function ServerCard(props: ServerCardProps) {
  return (
    <Card className="transform transition-transform duration-300 ease-in-out hover:scale-[1.01]">
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage alt="server avatar" />
            <AvatarFallback></AvatarFallback>
          </Avatar>

          <CardTitle>{props.name}</CardTitle>
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
        <ServerCardSummary value={props.members} label="Members" />
        <ServerCardSummary value={props.owner} label="Owner" />
        <ServerCardSummary value={props.roles} label="Roles" />
        <ServerCardSummary
          value={props.premium ? "Active" : "Inactive"}
          label="Premium"
          className={props.premium ? "text-green-500" : "text-red-500"}
        />
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4">
        <Button variant="default" className="w-full">
          Manage settings
        </Button>
        <ModalOpenerButton name={props?.name || ""} />
      </CardFooter>
    </Card>
  );
}

export function ServerCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage alt="server avatar" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <CardTitle>
            <div className="animate-pulse bg-muted w-48 rounded-lg h-6"></div>
          </CardTitle>
        </div>
        <div
          id="dropdown"
          className="h-8 w-8 bg-muted animate-pulse rounded-sm"
        ></div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 grid-rows-2 gap-4 pb-10">
        <ServerCardSummarySkeleton className="h-[102px]" />
        <ServerCardSummarySkeleton className="h-[102px]" />
        <ServerCardSummarySkeleton className="h-[102px]" />
        <ServerCardSummarySkeleton className="h-[102px]" />
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4">
        <Button variant="skeleton" className="w-full"></Button>
        <Button variant="skeleton" className="w-full"></Button>
      </CardFooter>
    </Card>
  );
}
