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
  weekSummary: number;
  weekPersent: number;
};

async function getData(): Promise<Metrics> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        weekSummary: 747,
        weekPersent: 25,
      });
    }, 1000);
  });
}

function WeekStatCard({ weekSummary, weekPersent }: Metrics) {
  return (
    <div>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>This Week</CardDescription>
          <CardTitle className="text-4xl">${weekSummary}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +{weekPersent}% from last week
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={weekPersent} />
        </CardFooter>
      </Card>
    </div>
  );
}

export default function WeekCard() {
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
            <CardDescription>This Week</CardDescription>
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
        data && <WeekStatCard {...data} />
      )}
    </div>
  );
}
