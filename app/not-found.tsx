import Divider from "@/components/404/divider";
import LinkCard from "@/components/404/link-card";
import { BookOpen } from "lucide-react";
import { ArrowLeft } from "lucide-react";

export default function Example() {
  return (
    <>
      <main className="grid min-h-screen place-items-center bg-muted/40 dark:bg-zinc-950 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            This page does not exist
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>

          <div className="flex-row pt-20">
            <LinkCard
              title="Dashboard"
              description="Manage bot settings using the dashboard"
              href="/"
              icon={<BookOpen />}
            />
            <LinkCard
              title="Dashboard"
              description="Manage bot settings using the dashboard"
              href="/"
              icon={<BookOpen />}
            />
            <LinkCard
              title="Dashboard"
              description="Manage bot settings using the dashboard"
              href="/"
              icon={<BookOpen />}
            />
            <LinkCard
              title="Dashboard"
              description="Manage bot settings using the dashboard"
              href="/"
              icon={<BookOpen />}
            />
          </div>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="text-sm font-semibold text-gray-900 flex items-center"
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
