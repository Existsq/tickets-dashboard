import ServerCard from "@/components/dashboard/servers/server-card";
import ServerCardSkeleton from "@/components/dashboard/servers/server-card-skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link2Off, Search } from "lucide-react";
import { Suspense } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoGridOutline } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import { Button, buttonVariants } from "@/components/ui/button";
import { FiPlusCircle } from "react-icons/fi";
import Link from "next/link";

export default function Servers() {
  return (
    <>
      {/* <div className="flex flex-row gap-4 justify-around px-6 py-4 lg:px-16 lg:py-6">
        <form className="w-full flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tickets..."
              className="pl-8 w-full"
            />
          </div>
        </form>
        <Select>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Sort by name"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort by name</SelectItem>
            <SelectItem value="new">Sort by newest</SelectItem>
          </SelectContent>
        </Select>
        <Tabs defaultValue="grid" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="grid">
              <IoGridOutline size={15} />
            </TabsTrigger>
            <TabsTrigger value="list">
              <IoIosList size={15} />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div> */}

      <div className="grid grid-cols-3 gap-4 w-full px-6 lg:px-16 py-4 max-h-screen">
        <div className="col-span-2">
          <form className="w-full flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tickets..."
                className="pl-8 w-full"
              />
            </div>
          </form>
        </div>
        <div className=" col-span-1 flex gap-4 ">
          <Select>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Sort by name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by name</SelectItem>
              <SelectItem value="new">Sort by newest</SelectItem>
            </SelectContent>
          </Select>

          <Tabs defaultValue="grid" className="">
            <TabsList>
              <TabsTrigger value="grid">
                <IoGridOutline size={15} />
              </TabsTrigger>
              <TabsTrigger value="list">
                <IoIosList size={15} />
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Link
            className={
              buttonVariants({ variant: "default" }) +
              "flex gap-2 items-center font-semibold"
            }
            href="/discord/invite"
          >
            Add new
            <FiPlusCircle size={17} />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full px-6 lg:px-16 max-h-screen">
        <Suspense fallback={<ServerCardSkeleton />}>
          <ServerCard />
        </Suspense>
        <Suspense fallback={<ServerCardSkeleton />}>
          <ServerCard />
        </Suspense>
      </div>
    </>
  );
}
