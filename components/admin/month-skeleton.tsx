import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function MonthSkeleton() {
  return (
    <>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
          <CardTitle>
            <div className="animate-pulse min-h-[40px] min-w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg col-span-6"></div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground flex">
            <div className="animate-pulse min-h-[16px] min-w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg col-span-6"></div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="animate-pulse min-h-[16px] min-w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg col-span-6"></div>
        </CardFooter>
      </Card>
    </>
  );
}
