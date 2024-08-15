import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();

  if (!session || !session.user) {
    // Перенаправление на страницу входа, если сессия или пользователь отсутствует
    redirect("/auth/login");
    return null; // Это нужно добавить, чтобы завершить выполнение функции после redirect
  } else {
    redirect("/dashboard/analytics");
    return null;
  }
}
