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

const frameworks = [
  {
    value: "Server 1",
    label: "Server 1",
  },
  {
    value: "Server 2",
    label: "Server 2",
  },
  {
    value: "Server 3",
    label: "Server 3",
  },
  {
    value: "Server 5",
    label: "Server 5",
  },
];

export type CurrentServerProps = {
  server: string;
};

export function CurrentServerBox(props: CurrentServerProps) {
  const [open, setOpen] = React.useState(false);
  // Initialize the value state with the server prop
  const [value, setValue] = React.useState(
    props.server.substring(1, props.server.length - 1) || ""
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select server..."}
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
                  onSelect={(currentValue) => {
                    {
                      currentValue === value
                        ? (document.cookie = `current-server=${JSON.stringify(
                            ""
                          )}`)
                        : (document.cookie = `current-server=${JSON.stringify(
                            currentValue
                          )}`);
                    }
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
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
  );
}
