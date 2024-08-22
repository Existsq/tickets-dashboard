import React from "react";

export type ServerSummaryType = {
  label: string;
  value: string;
};

export default function ServerSummary(props: ServerSummaryType) {
  return (
    <div className="w-full bg-background border-border border-[1px] rounded-sm z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left sm:px-8 sm:py-6">
      <span className="text-xs text-muted-foreground">{props.label}</span>
      <span className="text-lg font-bold leading-none sm:text-2xl">
        {props.value}
      </span>
    </div>
  );
}
