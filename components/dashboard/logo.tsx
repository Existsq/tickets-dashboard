import { auth } from "@/auth";
import Image from "next/image";
import React, { Suspense } from "react";
import LogoSkeleton from "./logo-skeleton";

export default async function DiscordLogo() {
  const session = await auth();

  if (!session) {
    return (
      <div className="animation-pulse justify-center items-center rounded-full h-[40px] w-[40px]"></div>
    );
  } else {
    return (
      <Suspense fallback={<LogoSkeleton />}>
        <Image
          src={session.user?.image || "test"}
          alt="avatar"
          width={256}
          height={256}
          className="justify-center items-center rounded-full"
          blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
          loading="lazy"
          placeholder="blur"
        ></Image>
      </Suspense>
    );
  }
}
