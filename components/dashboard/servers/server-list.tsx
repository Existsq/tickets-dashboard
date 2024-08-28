import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ServerCard } from "@/components/dashboard/servers/server-card";

interface ServerData {
  name: string;
  members: string;
  premium: boolean;
  roles: string;
  owner: string;
}

interface ServerListProps {
  servers: ServerData[];
  viewMode: string;
}

const ServerList: React.FC<ServerListProps> = ({ servers, viewMode }) => (
  <AnimatePresence>
    <motion.div
      className={
        viewMode === "grid"
          ? "grid grid-cols-3 gap-4 gap-y-10 w-full px-6 lg:px-16 pt-4 pb-20"
          : "flex flex-col gap-4 w-full px-6 lg:px-16 pt-4 pb-20"
      }
      key={viewMode}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {servers.map((server) => (
        <AnimatePresence key={server.name}>
          <motion.div
            key={server.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
          >
            <ServerCard {...server} />
          </motion.div>
        </AnimatePresence>
      ))}
    </motion.div>
  </AnimatePresence>
);

export default ServerList;
