"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useState } from "react";
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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

function setServerCookie(server: string, onModalOpen: () => void) {
  document.cookie = `current-server=${JSON.stringify(server)}`;
  onModalOpen();
}

export type ServerCardProps = {
  members?: string;
  owner?: string;
  roles?: string;
  premium?: boolean;
  name?: string;
  currentServer?: string;
};

export default function ServerCard(props: ServerCardProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  const handleContinue = () => {
    handleDialogClose();
    window.location.reload();
  };

  return (
    <Card>
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
        <ServerSummary value={props.members} label="Members" />
        <ServerSummary value={props.owner} label="Owner" />
        <ServerSummary value={props.roles} label="Roles" />
        <ServerSummary
          value={props.premium ? "Active" : "Inactive"}
          label="Premium"
          className={props.premium ? "text-green-500" : "text-red-500"}
        />
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4">
        <Button variant="default" className="w-full">
          Manage settings
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setServerCookie(props.name, handleDialogOpen)}
        >
          Select as current
        </Button>
      </CardFooter>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changing server dashboard</DialogTitle>
            <DialogDescription>
              Do you want to change server managing to <span>{props.name}</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center items-center">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button onClick={handleContinue}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
