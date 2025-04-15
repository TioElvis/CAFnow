"use client";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  const pathname = usePathname();
  const [path, setPath] = useState<string[]>([]);

  useEffect(() => {
    if (pathname) {
      const segments = pathname.split("/").filter((e) => e !== "");
      setPath(segments);
    }
  }, [pathname]);

  return (
    <header className="h-14 flex items-center border-b sticky top-0 bg-background">
      <div className="flex w-full items-center p-4 lg:px-4">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {path.map((e, index) => {
              const href = "/" + path.slice(0, index + 1).join("/");
              return (
                <Fragment key={e}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={href}>
                        {e.charAt(0).toUpperCase() + e.slice(1)}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index !== path.length - 1 && <BreadcrumbSeparator />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
