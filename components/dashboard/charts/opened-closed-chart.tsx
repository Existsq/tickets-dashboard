import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export type OpenedClosedChart = {
  day: string;
  closed: number;
  opened: number;
};

async function getData(): Promise<OpenedClosedChart[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { day: "Sunday", closed: 186, opened: 80 },
        { day: "Monday", closed: 305, opened: 200 },
        { day: "Tuesday", closed: 100, opened: 237 },
        { day: "Wednesday", closed: 73, opened: 190 },
        { day: "Thursday", closed: 209, opened: 130 },
        { day: "Friday", closed: 214, opened: 140 },
        { day: "Saturday", closed: 214, opened: 140 },
      ]);
    }, 500);
  });
}

const chartConfig = {
  desktop: {
    label: "Closed",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Opened",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export async function OpenedClosedChart() {
  const data = await getData();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets</CardTitle>
        <CardDescription>
          Showing total visitors for the last 7 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="closed"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="opened"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this day <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Sunday - Saturday 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
