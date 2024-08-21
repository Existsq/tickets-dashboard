'use server'
import React from "react";
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
import SignIn from "@/components/auth/sign-in";
import Link from "next/link";

export default async function LoginForm() {
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
              <Link href={"/"}>Home page</Link>
              <GoArrowRight size={20} />
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-center items-center">
          <ModeToggle align={"center"}/>
        </div>
      </div>
    </div>
  );
}
