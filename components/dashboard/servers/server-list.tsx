import React from "react";
import {
  ServerCard,
  ServerCardSkeleton,
} from "@/components/dashboard/servers/server-card";
import { setTimeout } from "timers/promises";

export type Layout = {
  viewMode: "grid" | "list"
};

export type ServerData = {
  name: string;
  owner: string;
  members: string;
  hasPremium: boolean;
};

export default async function ServerList({ viewMode }: Layout) {
  const response = await fetch("http://localhost:8081/api/user/servers", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch servers");
  }

  const servers: ServerData[] = (await response.json()) as ServerData[];
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-3 gap-4 gap-y-10 w-full px-6 lg:px-16 pt-4 pb-20"
          : "flex flex-col gap-4 w-full px-6 lg:px-16 pt-4 pb-20"
      }
    >
      {servers.map((server) => (
        <div key={server.name}>
          <ServerCard {...server} />
        </div>
      ))}
    </div>
  );
}

export function ServerListSkeleton({viewMode}: Layout) {
  return (
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
  );
}
