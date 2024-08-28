"use client";
import { Button } from "../ui/button";
import { FaDiscord } from "react-icons/fa";

const LoginButton = () => {
  return (
    <Button variant="default" className="flex gap-2 w-full">
      <FaDiscord size={20} color="#000" />
      Continue with Discord
    </Button>
  );
};

export default LoginButton;
