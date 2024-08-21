// "use client";
import React from "react";
// import Link from "next/link";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";
// import { usePathname } from "next/navigation";

export default function StatisticsDashboard() {
  // const pathname = usePathname();
  // const pathParts = pathname.split("/").filter((part) => part);

  return (
    // <div className="flex min-h-screen w-full flex-col bg-muted/40">
    //   <div className="flex flex-col sm:gap-4 sm:py-4">
    //     <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
    //       <Breadcrumb className="hidden md:flex">
    //         <BreadcrumbList>
    //           {pathParts.map((part, index) => {
    //             // Формируем href на основе полного пути
    //             const href = "/" + pathParts.slice(0, index + 1).join("/");

    //             // Пропускаем отображение "admin"
    //             if (part === "admin") return null;

    //             // Делаем первую букву заглавной для отображаемого имени
    //             const displayName =
    //               part.charAt(0).toUpperCase() + part.slice(1);

    //             return (
    //               <React.Fragment key={href}>
    //                 <BreadcrumbItem>
    //                   <BreadcrumbLink asChild>
    //                     <Link href={href}>{displayName}</Link>
    //                   </BreadcrumbLink>
    //                 </BreadcrumbItem>
    //                 {index < pathParts.length - 1 && <BreadcrumbSeparator />}
    //               </React.Fragment>
    //             );
    //           })}
    //         </BreadcrumbList>
    //       </Breadcrumb>
    //     </header>
    //   </div>
    // </div>
    <></>
  );
}
