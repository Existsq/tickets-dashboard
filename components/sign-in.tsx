"use client"
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { FaDiscord } from "react-icons/fa";

export default function SignIn() {
  const handleSignIn = async () => {
    // Вызов signIn на клиентской стороне
    await signIn("discord", { callbackUrl: "/dashboard/analytics" });
  };

  return (
    <div>
      <Button
        variant="secondary"
        type="button" // Изменяем тип кнопки на button
        className="w-full flex justify-center items-center gap-2"
        onClick={handleSignIn} // Добавляем обработчик нажатия на кнопку
      >
        <FaDiscord size={20} />
        Continue with Discord
      </Button>
    </div>
  );
}
