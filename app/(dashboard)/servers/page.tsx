import React, { Suspense } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosList } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";
import SearchBar from "@/components/dashboard/servers/search-bar";
import { ServerCardSkeleton } from "@/components/dashboard/servers/server-card";
import ServerList from "@/components/dashboard/servers/server-list";
import { RenderingInfo } from "@/components/rendering/rendering-info";

enum Layout {
  Grid = "grid",
  List = "list",
}

export default async function Page() {
  var viewMode: Layout = Layout.Grid;
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 w-full px-6 lg:px-16 py-4 max-h-screen">
        <div className="col-span-2">
          <SearchBar />
        </div>

        <div className="col-span-1 flex gap-4 items-center">
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder={"Select sorting"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by name</SelectItem>
              <SelectItem value="members">Sort by members</SelectItem>
            </SelectContent>
          </Select>

          <Tabs defaultValue="grid">
            <TabsList>
              <TabsTrigger value="grid" className="py-2 px-2.5">
                <IoGridOutline size={15} color="#fff" />
              </TabsTrigger>
              <TabsTrigger value="list" className="py-2 px-2.5">
                <IoIosList size={15} color="#fff" />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Link
            className={
              buttonVariants({ variant: "default" }) +
              " flex gap-2 items-center font-semibold"
            }
            href="https://discord.com/oauth2/authorize?client_id=1264239380000936067"
          >
            Add new
            <FiPlusCircle size={17} />
          </Link>
        </div>
      </div>
      <RenderingInfo type="ssr" />

      <Suspense
        fallback={
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-3 gap-4 gap-y-10 w-full px-6 lg:px-16 pt-4 pb-20"
                : "flex flex-col gap-4 w-full px-6 lg:px-16 pt-4 pb-20"
            }
          >
            <ServerCardSkeleton />
            <ServerCardSkeleton />
            <ServerCardSkeleton />
            <ServerCardSkeleton />
            <ServerCardSkeleton />
            <ServerCardSkeleton />
            <ServerCardSkeleton />
            <ServerCardSkeleton />
          </div>
        }
      >
        <ServerList viewMode={viewMode} />
      </Suspense>
    </div>
  );
}
