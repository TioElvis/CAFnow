"use client";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useContext } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { NAVBAR } from "@/lib/navbar";
import { UserContext } from "@/context/user";
import { ChevronRightIcon } from "lucide-react";

export function NavMain() {
  const { setOpenMobile } = useSidebar();
  const { role } = useContext(UserContext)!;

  const navbar = NAVBAR.find((x) => x.role.includes(role));

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Principale</SidebarGroupLabel>
      <SidebarMenu>
        {navbar?.groups.map(({ name, Icon, sub_items }) => {
          return (
            <Collapsible key={name} defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <Icon />
                    <span>{name}</span>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {sub_items?.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton
                        asChild
                        onClick={() => setOpenMobile(false)}>
                        <Link href={`/private/${item.to}`}>
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
