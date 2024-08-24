// components/LoginButton.tsx
"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { FaDiscord } from "react-icons/fa";

const LoginButton = () => {
  const router = useRouter();

  const handleLogin = () => {
    const clientId = "1264239380000936067";
    const redirectUri = encodeURIComponent("http://localhost:3000/api/auth/callback");
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