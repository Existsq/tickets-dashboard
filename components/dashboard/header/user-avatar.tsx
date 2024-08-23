import React from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

export default function UserAvatar({ src }: { src: string | null }) {
  return src ? (
    <Image src={src} alt="User Avatar" className="h-10 w-10 rounded-full" width={256} height={256} quality={100} />
  ) : (
    <Skeleton className="h-8 w-8 rounded-full" />
  );
}