import { redirect } from "next/navigation";

export default async function Settings() {
  redirect("/dashboard/settings/profile");
}
