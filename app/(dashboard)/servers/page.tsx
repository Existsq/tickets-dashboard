"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ServerCard,
  ServerCardSkeleton,
} from "@/components/dashboard/servers/server-card";
import Cookies from "js-cookie";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosList } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface ServerData {
  name: string;
  members: string;
  premium: boolean;
  roles: string;
  owner: string;
}

async function fetchServersData(): Promise<ServerData[]> {
  try {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return [
      {
        name: "Server 3",
        members: "1",
        premium: true,
        roles: "23",
        owner: "Exist",
      },
      {
        name: "Server 1",
        members: "1,234",
        premium: true,
        roles: "10",
        owner: "Exist",
      },
      {
        name: "Server 2",
        members: "567",
        premium: false,
        roles: "5",
        owner: "Exist",
      },
      {
        name: "Server 5",
        members: "789",
        premium: true,
        roles: "8",
        owner: "Exist",
      },
    ];
  } catch (error) {
    console.error("Error fetching servers data:", error);
    throw error;
  }
}

export default function Page() {
  const [servers, setServers] = useState<ServerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<string>("grid");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const moveServerToTop = (serverName: string, serverList: ServerData[]) => {
    const serverIndex = serverList.findIndex(
      (server) => server.name === serverName
    );
    if (serverIndex !== -1) {
      const [selectedServer] = serverList.splice(serverIndex, 1);
      serverList.unshift(selectedServer);
    }
    return [...serverList]; // Возвращаем новый массив
  };

  const loadServers = useCallback(async () => {
    try {
      console.log("Loading servers...");
      const data = await fetchServersData();

      const selectedServer = Cookies.get("current-server");
      console.log("Selected Server from Cookies:", selectedServer);

      if (selectedServer) {
        setServers(moveServerToTop(selectedServer, data));
      } else {
        setServers(data);
      }

      if (sortBy) {
        setServers((prevServers) =>
          [...prevServers].sort((a, b) => {
            if (sortBy === "name") {
              return a.name.localeCompare(b.name);
            } else if (sortBy === "members") {
              return (
                parseInt(b.members.replace(/,/g, "")) -
                parseInt(a.members.replace(/,/g, ""))
              );
            }
            return 0;
          })
        );
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
      setError("Failed to load servers");
    } finally {
      setLoading(false);
    }
  }, [sortBy]);

  useEffect(() => {
    console.log("useEffect triggered");
    loadServers();
  }, [loadServers]);

  const handleServerChange = (newServer: string) => {
    Cookies.set("current-server", newServer);
    setServers((prevServers) => moveServerToTop(newServer, prevServers));
  };

  const handleSortChange = (value: string) => {
    if (value === sortBy) {
      setSortBy(null);
    } else {
      setSortBy(value);
    }
  };

  const filteredServers = servers.filter((server) =>
    server.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerClass =
    viewMode === "grid"
      ? "grid grid-cols-3 gap-4 gap-y-10 w-full px-6 lg:px-16 pt-4 pb-20"
      : "flex flex-col gap-4 gap-4 gap-y-10 w-full px-6 lg:px-16 pt-4 pb-20";

  if (loading) {
    return (
      <>
        <div className="grid grid-cols-3 gap-4 w-full px-6 lg:px-16 py-4">
          <div className="col-span-2">
            <form className="w-full flex-1 sm:flex-initial">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  disabled
                  type="search"
                  placeholder="Search servers..."
                  className="pl-8 w-full border-border border-[1px]"
                />
              </div>
            </form>
          </div>
          <div className="col-span-1 flex gap-4">
            <Select>
              <SelectTrigger className="w-[250px]">
                <div className="animate-pulse bg-muted h-4 w-2/3 rounded-sm"></div>
              </SelectTrigger>
            </Select>

            <Tabs aria-disabled defaultValue="grid">
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
        <div className={containerClass}>
          <ServerCardSkeleton />
          <ServerCardSkeleton />
          <ServerCardSkeleton />
          <ServerCardSkeleton />
          <ServerCardSkeleton />
          <ServerCardSkeleton />
          <ServerCardSkeleton />
          <ServerCardSkeleton />
        </div>
      </>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4 w-full px-6 lg:px-16 py-4 max-h-screen">
        <div className="col-span-2">
          <div className="w-full flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search servers..."
                className="pl-8 w-full"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="col-span-1 flex gap-4 items-center">
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-[250px]">
              <SelectValue
                placeholder={
                  sortBy ? `Select sorting ${sortBy}` : "Select sorting"
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Sort by name</SelectItem>
              <SelectItem value="members">Sort by members</SelectItem>
            </SelectContent>
          </Select>

          <Tabs
            defaultValue="grid"
            onValueChange={(value) => setViewMode(value)}
          >
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

      <AnimatePresence>
        <motion.div
          className={containerClass}
          key={viewMode}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
        >
          {filteredServers.map((server) => (
            <AnimatePresence key={server.name}>
              <motion.div
                key={server.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ServerCard
                  name={server.name}
                  members={server.members}
                  premium={server.premium}
                  roles={server.roles}
                  owner={server.owner}
                />
              </motion.div>
            </AnimatePresence>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
