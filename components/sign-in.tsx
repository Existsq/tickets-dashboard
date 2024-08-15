import { signIn } from "@/auth";
import { Button } from "./ui/button";
import { FaDiscord } from "react-icons/fa";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("discord", { redirectTo: "/dashboard" })
      }}
    >
      <Button
        variant="secondary"
        type="submit"
        className="w-full flex justify-center items-center gap-2"
      >
        <FaDiscord size={20} />
        Continue with Discord
      </Button>
    </form>
  );
}
