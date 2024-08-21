import React from "react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SimpleChartSkeleton() {
  return (
    <>
      <Card x-chunk="charts-01-chunk-7" className="w-[300px]">
        <CardHeader className="space-y-0 pb-0">
          <CardDescription>
            <div className="animate-pulse h-[14px] w-1/3 bg-zinc-100 dark:bg-zinc-900 rounded-lg col-span-6"></div>
          </CardDescription>
          <CardTitle className="flex items-baseline gap-1 text-4xl tabular-nums pt-2">
            <div className="animate-pulse h-[40px] w-2/3 bg-zinc-100 dark:bg-zinc-900 rounded-lg col-span-6"></div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="animate-pulse w-full min-h-[144px] bg-zinc-100 dark:bg-zinc-900 rounded-lg col-span-6"></div>
        </CardContent>
      </Card>
    </>
  );
}
