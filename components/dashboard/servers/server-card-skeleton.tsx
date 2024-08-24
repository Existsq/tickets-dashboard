import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ServerSummarySkeleton } from "./server-summary";

import { Input } from "@/components/ui/input";
import { Select, SelectTrigger } from "@/components/ui/select";
import { Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoGridOutline } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import { buttonVariants } from "@/components/ui/button";
import { FiPlusCircle } from "react-icons/fi";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import React from "react";

function Skeleton() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage alt="server avatar" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <CardTitle>
            <div className="animate-pulse bg-muted w-48 rounded-lg h-6"></div>
          </CardTitle>
        </div>
        <div
          id="dropdown"
          className="h-8 w-8 bg-muted animate-pulse rounded-sm"
        ></div>
      </CardHeader>
      <CardContent className="grid grid-cols-2 grid-rows-2 gap-4 pb-10">
        <ServerSummarySkeleton className="h-[102px]" />
        <ServerSummarySkeleton className="h-[102px]" />
        <ServerSummarySkeleton className="h-[102px]" />
        <ServerSummarySkeleton className="h-[102px]" />
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-4">
        <Button variant="skeleton" className="w-full"></Button>
        <Button variant="skeleton" className="w-full"></Button>
      </CardFooter>

      <Dialog>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changing server dashboard</DialogTitle>
            <DialogDescription>
              Do you want to change server managing to
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-center items-center">
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
            <Button>Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

export default function ServerCardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-3 gap-4 w-full px-6 lg:px-16 py-4 max-h-screen">
        <div className="col-span-2">
          <form className="w-full flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input disabled type="search" className="pl-8 w-full" />
            </div>
          </form>
        </div>
        <div className="col-span-1 flex gap-4">
          <Select>
            <SelectTrigger className="w-[250px]">
              <div className="animate-pulse bg-muted h-4 w-2/3 rounded-sm"></div>
            </SelectTrigger>
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
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full px-6 lg:px-16 h-full mb-20 gap-y-10">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    </>
  );
}
