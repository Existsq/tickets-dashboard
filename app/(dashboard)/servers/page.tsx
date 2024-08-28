"use client";

import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "@/components/dashboard/servers/search-bar";
import ServerList from "@/components/dashboard/servers/server-list";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";
import { IoIosList } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";
import Cookies from "js-cookie";
import { ServerCardSkeleton } from "@/components/dashboard/servers/server-card";

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
    return [...serverList];
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

  useEffect(() => {
    const handleStorageChange = () => {
      const currentServer = Cookies.get("current-server");
      if (currentServer) {
        setServers((prevServers) => moveServerToTop(currentServer, prevServers));
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
      : "flex flex-col gap-4 w-full px-6 lg:px-16 pt-4 pb-20";

  if (loading) {
    return (
      <>
        <div className="grid grid-cols-3 gap-4 w-full px-6 lg:px-16 py-4">
          <div className="col-span-2">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              disabled={true}
            />
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
                " flex gap-2 items-center font-semibold"
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
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
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
              " flex gap-2 items-center font-semibold"
            }
            href="https://discord.com/oauth2/authorize?client_id=1264239380000936067"
          >
            Add new
            <FiPlusCircle size={17} />
          </Link>
        </div>
      </div>

      <ServerList servers={filteredServers} viewMode={viewMode} />
    </>
  );
}