"use client";

import { Suspense } from "react";
import { OpenedClosedChart } from "@/components/dashboard/charts/opened-closed-chart";
import { OpenedClosedSkeleton } from "@/components/dashboard/charts/opened-closed-skeleton";

export default function Analytics() {
  return (
    <div className="grid grid-cols-3 gap-4 w-full p-6 max-h-screen">
      <div className="col-span-1">
        <Suspense fallback={<OpenedClosedSkeleton />}>
          <OpenedClosedChart />
        </Suspense>
      </div>
      <div className="col-span-1">
        <Suspense fallback={<OpenedClosedSkeleton />}>
          <OpenedClosedChart />
        </Suspense>
      </div>
      <div className="col-span-1">
        <Suspense fallback={<OpenedClosedSkeleton />}>
          <OpenedClosedChart />
        </Suspense>
      </div>
    </div>
  );
}
