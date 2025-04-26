"use client";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Fragment, useEffect, useState } from "react";
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
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear sticky top-0">
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
                    {index !== path.length - 1 ? (
                      <BreadcrumbLink asChild>
                        <Link href={href}>
                          {e.charAt(0).toUpperCase() + e.slice(1)}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>
                        {e.charAt(0).toUpperCase() + e.slice(1)}
                      </BreadcrumbPage>
                    )}
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
