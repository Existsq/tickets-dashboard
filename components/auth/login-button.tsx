// components/LoginButton.tsx
"use client";
import { Button } from "../ui/button";
import { FaDiscord } from "react-icons/fa";

const LoginButton = () => {

  const handleLogin = () => {
    const clientId = process.env.DISCORD_CLIENT_ID!;
    const redirectUri = encodeURIComponent(process.env.DISCORD_REDIRECT_URI!);
    const scope = encodeURIComponent("identify email guilds");
    const responseType = "code";
    const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = discordAuthUrl;
  };

  return (
    <Button variant="default" onClick={handleLogin} className="flex gap-2 w-full">
      <FaDiscord size={20} color="#000" />
      Continue with Discord
    </Button>
  );
};

export default LoginButton;