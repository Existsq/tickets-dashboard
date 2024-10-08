import React, { ReactElement } from "react";
import Divider from "./divider";
import { ChevronRight } from "lucide-react";

interface Card {
  title: string;
  description: string;
  href: string;
  icon: ReactElement;
}

export default function LinkCard({ title, description, href, icon }: Card) {
  return (
    <div className="px-4 pt-10">
      <a className="flex justify-between items-center" href={href}>
        <div className="flex gap-6 pb-5">
          <div
            id="icon"
            className="border-[1px] border-border p-2 rounded-lg max-h-[42px] bg-muted dark:bg-background dark:border-border"
          >
            {icon}
          </div>
          <div className="flex-row justify-start text-left space-y-3 pt-1">
            <p className="text-[15px] font-bold leading-none tracking-tight text-accent dark:text-zinc-200">
              {title}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>
        <ChevronRight color="#9CA3AF" size={20} className="-mt-10 ml-6" />
      </a>
      <Divider />
    </div>
  );
}
