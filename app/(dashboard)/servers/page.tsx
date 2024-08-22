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
import { Search } from "lucide-react";
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
          <Select defaultValue="name">
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Sort by name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by name</SelectItem>
              <SelectItem value="new">Sort by newest</SelectItem>
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
              "flex gap-2 items-center font-semibold"
            }
            href="https://discord.com/oauth2/authorize?client_id=1264239380000936067"
          >
            Add new
            <FiPlusCircle size={17} />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full px-6 lg:px-16 max-h-screen">
        <Suspense fallback={<ServerCardSkeleton />}>
          <ServerCard members="2,345" premium={true} roles="23" owner="Exist" />
        </Suspense>
        <Suspense fallback={<ServerCardSkeleton />}>
          <ServerCard members="23" premium={false} roles="12" owner="Exist" />
        </Suspense>
      </div>
    </>
  );
}
