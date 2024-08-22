// app/Page.tsx (клиентский компонент)

"use client"; // Директива, делающая компонент клиентским

import React, { useState, useEffect } from "react";
import Servers from "@/components/dashboard/servers/servers";
import ServerCardSkeleton from "@/components/dashboard/servers/server-card-skeleton";

// Функция для получения данных с задержкой
async function fetchServersData() {
  // Симуляция задержки
  await new Promise((resolve) => setTimeout(resolve, 200)); // Задержка 2 секунды

  // Возвращаем тестовые данные
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
}

export default function Page() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServers = async () => {
      const data = await fetchServersData();
      setServers(data);
      setLoading(false);
    };

    loadServers();
  }, []);

  if (loading) {
    return <ServerCardSkeleton />;
  }

  return <Servers clientServers={servers} />;
}
