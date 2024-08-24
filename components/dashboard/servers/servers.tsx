"use client";

import React, { Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServerCard from "@/components/dashboard/servers/server-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoGridOutline } from "react-icons/io5";
import { IoIosList } from "react-icons/io";
import { buttonVariants } from "@/components/ui/button";
import { FiPlusCircle } from "react-icons/fi";
import Link from "next/link";
import ServerCardSkeleton from "./server-card-skeleton";

function Servers({ clientServers }) {
  const [sortOption, setSortOption] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  // Фильтрация серверов по названию
  const filteredServers = clientServers.filter((server) =>
    server.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Функция для сортировки серверов
  const sortedServers = [...filteredServers].sort((a, b) => {
    switch (sortOption) {
      case "name":
        return a.name.localeCompare(b.name);
      case "members":
        return (
          parseInt(b.members.replace(/,/g, "")) -
          parseInt(a.members.replace(/,/g, ""))
        );

      default:
        return 0;
    }
  });

  return (
    <>
      <div className="grid grid-cols-3 gap-4 w-full px-6 lg:px-16 py-4 max-h-screen">
        <div className="col-span-2">
          <form className="w-full flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search servers..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="col-span-1 flex gap-4">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Sort by name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by name</SelectItem>
              <SelectItem value="members">Sort by members</SelectItem>
            </SelectContent>
          </Select>

          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value)}>
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

      <div
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex-col space-y-4"
        } w-full px-6 lg:px-16 h-full mb-20`}
      >
        <AnimatePresence>
          {sortedServers.map((server, index) => (
            <motion.div
              key={server.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`${viewMode === "list" ? "w-full" : ""}`} // для списка устанавливаем ширину
            >
              <Suspense fallback={<ServerCardSkeleton />} key={index}>
                <ServerCard
                  members={server.members}
                  premium={server.premium}
                  roles={server.roles}
                  owner={server.owner}
                  name={server.name}
                />
              </Suspense>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Servers;
