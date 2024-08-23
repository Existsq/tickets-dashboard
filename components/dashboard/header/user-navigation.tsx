"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { Separator } from "../../ui/separator";
import Link from "next/link";

type Navlink = {
  name: string;
  href: string;
};

type Props = {
  navlinks: Navlink[];
  isAdmin: boolean;
  orientation: "horizontal" | "vertical";
};

const Navigation = ({ navlinks, isAdmin, orientation }: Props) => {
  const pathname = usePathname();

  return (
    <>
      {isAdmin &&
        navlinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <React.Fragment key={link.href}>
              {link.name === "Analytics" && (
                <Separator
                  orientation={orientation}
                  className={
                    orientation === "horizontal" ? "max-w-20" : "h-6"
                  }
                />
              )}
              <Link
                href={link.href}
                className={
                  isActive
                    ? "dark:text-zinc-50 text-zinc-950"
                    : "dark:text-zinc-400 text-zinc-500"
                }
              >
                {link.name}
              </Link>
            </React.Fragment>
          );
        })}

      {!isAdmin &&
        navlinks.map((obj) => (
          <Link href={obj.href} key={obj.href}>
            {obj.name}
          </Link>
        ))}
    </>
  );
};

export { Navigation };
