import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "../../ui/progress";

export type Metrics = {
  weekSummary: string;
  weekPersent: number;
};

async function fetchData(): Promise<Metrics> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        weekSummary: "747",
        weekPersent: 25,
      });
    }, 200);
  });
}

function formatCurrency(value: string | number): string {
  const amount = typeof value === "string" ? parseFloat(value) : value;

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return formatted;
}

export default async function WeekCard() {
  const data = await fetchData();

  return (
    <div>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>This Week</CardDescription>
          <CardTitle className="text-4xl">
            {formatCurrency(data.weekSummary)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +{data.weekPersent}% from last week
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={data.weekPersent} />
        </CardFooter>
      </Card>
    </div>
  );
}
