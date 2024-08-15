import { FaDiscord } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoArrowRight } from "react-icons/go";
import { ModeToggle } from "@/components/ui/mode-toggle";
import SignIn from "@/components/sign-in";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function LoginForm() {
  const session = await auth()

  // if (!session.user) {
  //   return null
  // } else {
  //   redirect("/dashboard/settings")
  // }


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex-row space-y-4 justify-center items-center">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Welcome back! Log in to manage bot settings
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-row space-y-3">
            <SignIn />
            <Button
              variant="outline"
              className="w-full flex justify-center items-center gap-2"
            >
              Home page
              <GoArrowRight size={20} />
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-center items-center">
          <ModeToggle align={"center"} />
        </div>
      </div>
    </div>
  );
}
