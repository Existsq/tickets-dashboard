import { AddNewCard } from "@/components/dashboard/servers/add-new";
import ServerCard from "@/components/dashboard/servers/server-card";
import ServerCardSkeleton from "@/components/dashboard/servers/server-card-skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Suspense } from "react";

export default function Servers() {
  return (
    <>
      <form className="w-full flex-1 sm:flex-initial px-6 py-4 lg:px-16 lg:py-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tickets..."
            className="pl-8 w-full"
          />
        </div>
      </form>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full px-6 lg:px-16 max-h-screen">
        <Suspense fallback={<ServerCardSkeleton />}>
          <ServerCard />
        </Suspense>
        <Suspense fallback={<ServerCardSkeleton />}>
          <ServerCard />
        </Suspense>
        <AddNewCard />
      </div>
    </>
  );
}
