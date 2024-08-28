import LinkCard from "@/components/404/link-card";
import { ArrowLeft } from "lucide-react";
import {
  HiOutlineCommandLine,
  HiOutlineUserGroup,
  HiOutlineBookOpen,
  HiOutlineFingerPrint,
} from "react-icons/hi2";

export default function Example() {
  return (
    <>
      <main className="grid min-h-screen place-items-center bg-muted/40 dark:bg-zinc-950 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-blue-500 ">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-zinc-200">
            This page does not exist
          </h1>
          <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Sorry, we couldn’t find the page you’re looking for.
          </p>

          <div className="flex-row pt-4">
            <LinkCard
              title="Dashboard"
              description="Use the dashboard to configure your bot and track information"
              href="/dashboard"
              icon={<HiOutlineCommandLine size={24} stroke="#fff" />}
            />
            <LinkCard
              title="Documentation"
              description="Review the documentation for complete bot setup"
              href="/documentation"
              icon={<HiOutlineBookOpen size={24} stroke="#fff" />}
            />
            <LinkCard
              title="Support"
              description="We are always ready to answer your questions"
              href="/help-center"
              icon={<HiOutlineUserGroup size={24} stroke="#fff" />}
            />
            <LinkCard
              title="Login"
              description="Log in to your Discord account and manage your bot settings"
              href="/auth/login"
              icon={<HiOutlineFingerPrint size={24} stroke="#fff" />}
            />
          </div>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="text-sm font-semibold text-gray-900 flex items-center dark:text-zinc-200"
            >
              <ArrowLeft size={16} />
              Back to home
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
