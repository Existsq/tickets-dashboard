"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import Cookies from "js-cookie";
import { useServer } from "@/components/general/server-context";

export type Server = {
  value: string;
  label: string;
};

export type Props = {
  initialFrameworks: Server[];
};

export function CurrentServerBox({ initialFrameworks }: Props) {
  const [open, setOpen] = React.useState(false);
  const { currentServer, setCurrentServer } = useServer();
  const [frameworks, setFrameworks] = React.useState(initialFrameworks);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [selectedServer, setSelectedServer] = React.useState<string | null>(
    null
  );
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const storedServer = Cookies.get("current-server");
    if (storedServer) {
      setCurrentServer(storedServer);
      moveServerToTop(storedServer);
    }
    setLoading(false);
  }, [setCurrentServer]);

  const moveServerToTop = (server: string) => {
    setFrameworks((prevFrameworks) => {
      const newFrameworks = prevFrameworks.filter(
        (framework) => framework.value !== server
      );
      return [{ value: server, label: server }, ...newFrameworks];
    });
  };

  const handleDialogOpen = (server: string) => {
    setSelectedServer(server);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedServer(null);
  };

  const handleContinue = () => {
    if (selectedServer) {
      Cookies.set("current-server", selectedServer);
      setCurrentServer(selectedServer);
      moveServerToTop(selectedServer);
      handleDialogClose();
    }
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-disabled
            className="w-[200px] justify-between"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-pulse bg-muted h-4 w-2/3 rounded-sm"></div>
            ) : currentServer ? (
              frameworks.find((framework) => framework.value === currentServer)
                ?.label
            ) : (
              "Select server..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search server..." />
            <CommandList>
              <CommandEmpty>No server found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={() => {
                      setOpen(false);
                      handleDialogOpen(framework.value);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        currentServer === framework.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changing server dashboard</DialogTitle>
            <DialogDescription>
              Do you want to change the server to <span>{selectedServer}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center items-center">
            <DialogClose asChild>
              <Button variant="ghost" onClick={handleDialogClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleContinue}>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
