"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "../ui/progress";

export type Metrics = {
  monthSummary: number;
  monthPersent: number;
};

async function getData(): Promise<Metrics> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        monthSummary: 5343,
        monthPersent: 125,
      });
    }, 1500);
  });
}

function MonthStatCard({ monthSummary, monthPersent }: Metrics) {
  return (
    <div>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-4xl">${monthSummary}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +{monthPersent}% from last month
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={monthPersent} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default function MonthCard() {
  const [data, setData] = useState<Metrics>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getData().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="rounded">
      {loading ? (
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>This Month</CardDescription>
            <CardTitle>
              <div className="min-h-[40px] min-w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg col-span-6"></div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground flex">
              <div className="min-h-[16px] min-w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg col-span-6"></div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="min-h-[16px] min-w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg col-span-6"></div>
          </CardFooter>
        </Card>
      ) : (
        data && <MonthStatCard {...data} />
      )}
    </div>
  );
}
