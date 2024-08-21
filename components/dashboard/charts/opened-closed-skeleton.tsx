import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function OpenedClosedSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="animate-pulse h-[20px] w-2/3 bg-zinc-100 dark:bg-zinc-900 rounded-xl"></div>
        </CardTitle>
        <CardDescription>
          <div className="animate-pulse h-[14px] w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg mt-2"></div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="animate-pulse h-[240px] w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg "></div>
      </CardContent>
      <CardFooter>
        <div className="flex-row w-full items-start space-y-2 text-sm">
          <div className="animate-pulse h-[14px] w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg"></div>
          <div className="animate-pulse h-[14px] w-2/3 bg-zinc-100 dark:bg-zinc-900 rounded-lg"></div>
        </div>
      </CardFooter>
    </Card>
  );
}
