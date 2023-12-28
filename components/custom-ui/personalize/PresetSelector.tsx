"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
} from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { Popover } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ChevronsUpDown } from "lucide-react";
let presets = [
  {
    key: "profile",
    title: "Profile Page",
    schema: "ProfileSchema",
  },
  {
    key: "post",
    title: "Post (home page)",
    schema: "PostSchema",
  },
  {
    key: "post_detail",
    title: "Post Detail Page",
    schema: "PostSchema",
  },
];
export function PresetSelector(props: any) {
  const { selectedPreset, setSelectedPreset, disabled } = props;
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <Popover
      open={open}
      className="text-black"
      onOpenChange={setOpen}
      {...props}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          disabled={disabled}
          aria-label="Load a preset..."
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[200px] text-black lg:max-w-[400px]"
        >
          {selectedPreset ? selectedPreset : "Load a preset..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 text-black shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] text-black p-0">
        <Command>
          <CommandInput placeholder="Search presets..." />
          <CommandEmpty>No presets found.</CommandEmpty>
          <CommandGroup heading="Templates">
            {presets.map((preset, index) => (
              <CommandItem
                key={index}
                onSelect={() => {
                  // setSelectedPreset(preset.key);
                  setSelectedPreset({
                    value:preset.key,
                    key:"presetType",
                  })
                  // setSelectedPreset({
                  //   value:"pending",
                  //   key:"status",
                  // })
                  setOpen(false);
                }}
              >
                {preset.key}
                {/* <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedPreset?.id === preset.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  /> */}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

function setSelectedPreset(preset: {
  key: string;
  title: string;
  schema: string;
}) {
  throw new Error("Function not implemented.");
}
