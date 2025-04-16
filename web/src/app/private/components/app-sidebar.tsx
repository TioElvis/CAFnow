"use client";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useContext } from "react";
import { NavUser } from "./nav-user";
import { NavMain } from "./nav-main";
import { UserRole } from "@/types/user";
import { UserContext } from "@/context/user";
import { ArrowUpCircleIcon, SearchIcon } from "lucide-react";

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  const { role } = useContext(UserContext)!;

  return (
    <Sidebar variant="inset">
      <SidebarHeader className="h-14">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 hover:text-primary">
              <Link href="/private" className="w-full text-primary">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base truncate font-bold">CAFnow</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        {role !== UserRole.CLIENT && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                onClick={() => setOpenMobile(false)}
                className="flex items-center">
                <Link href="/private/search-link" className="w-full">
                  <SearchIcon className="h-5 w-5" />
                  <span>Cerca un link</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
