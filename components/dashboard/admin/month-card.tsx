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
  monthSummary: string;
  monthPersent: number;
};

async function fetchData(): Promise<Metrics> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        monthSummary: "4747",
        monthPersent: 63,
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

export default async function MonthCard() {
  const data = await fetchData();

  return (
    <div>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>This Month</CardDescription>
          <CardTitle className="text-4xl">
            {formatCurrency(data.monthSummary)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +{data.monthPersent}% from last week
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={data.monthPersent} />
        </CardFooter>
      </Card>
    </div>
  );
}
