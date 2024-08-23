"use client";
import React, { useCallback, useState, Suspense } from "react";
import { File } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MonthCard from "@/components/admin/month-card";
import MonthSkeleton from "@/components/admin/month-skeleton";
import TableLoad from "@/components/admin/payments-table";
import WeekSkeleton from "@/components/admin/week-skeleton";
import WeekCard from "@/components/admin/week-card";
import PaymentCardInfo from "@/components/admin/payment-card";

export default function SalesDashboard() {
  const [reloadKey, setReloadKey] = useState<number>(0);

  const handleReload = useCallback(() => {
    setReloadKey((prevKey) => prevKey + 1);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                className="col-span-1 sm:col-span-2"
                x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Here you can track all your subscription payments. Reload if
                    you are not sure if this is relevant.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button onClick={handleReload}>Reload Orders</Button>
                </CardFooter>
              </Card>

              <Suspense fallback={<WeekSkeleton />}>
                <WeekCard />
              </Suspense>

              <Suspense fallback={<MonthSkeleton />}>
                <MonthCard />
              </Suspense>
            </div>
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                    <DropdownMenu />
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 gap-1 text-sm"
                  >
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Export</span>
                  </Button>
                </div>
              </div>
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                      Recent orders from your store.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="max-w-full">
                    <TableLoad key={reloadKey} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="month">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                      Recent orders from your store.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="max-w-full">
                    <TableLoad key={reloadKey} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="year">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                      Recent orders from your store.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="max-w-full">
                    <TableLoad key={reloadKey} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <PaymentCardInfo />
        </main>
      </div>
    </div>
  );
}
