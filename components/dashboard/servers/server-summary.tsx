import { cn } from "@/lib/utils";
import React from "react";

export type ServerSummaryType = {
  label?: string;
  value?: string;
  className?: string;
};

export default function ServerSummary(props: ServerSummaryType) {
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

export function ServerSummarySkeleton(props: ServerSummarySkeletonType) {
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
