import React from "react";

export type ServerSummaryType = {
  label: string;
  value: string;
};

export default function ServerSummary(props: ServerSummaryType) {
  return (
    <>
      <div className="flex">
        <div className="relative w-full bg-muted rounded-[4px] z-30 flex flex-1 flex-col justify-center gap-1 px-6 py-4 text-left data-[active=true]:bg-muted/50 sm:px-8 sm:py-6">
          <span className="text-xs text-muted-foreground">{props.label}</span>
          <span className="text-lg font-bold leading-none sm:text-3xl">
            {props.value}
          </span>
        </div>
      </div>
    </>
  );
}
