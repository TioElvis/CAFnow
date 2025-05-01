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
import { UserRole } from "@/types/user";
import { UserContext } from "@/context/user";
import { ChevronRightIcon } from "lucide-react";
import { BuildingIcon, FileTextIcon, UsersIcon } from "lucide-react";

const NAVBAR = [
  {
    role: [UserRole.SUPER, UserRole.ADMIN],
    groups: [
      {
        name: "CAF",
        Icon: BuildingIcon,
        sub_items: [
          {
            title: "Vedi tutti",
            to: "/admin/CAF",
          },
        ],
      },
      {
        name: "Utenti",
        Icon: UsersIcon,
        sub_items: [
          {
            title: "Amministratori",
            to: "/admin",
          },
          {
            title: "Managers",
            to: "/admin/manager",
          },
          {
            title: "Lavoratori",
            to: "/admin/employee",
          },
          {
            title: "Clienti",
            to: "/admin/client",
          },
        ],
      },
    ],
  },
  {
    role: [UserRole.SUPER_MANAGER, UserRole.MANAGER],
    groups: [
      {
        name: "Utenti",
        Icon: UsersIcon,
        sub_items: [
          {
            title: "Managers",
            to: "/manager",
          },
          {
            title: "Lavoratori",
            to: "/employee",
          },
          {
            title: "Clienti",
            to: "/client",
          },
        ],
      },
      {
        name: "Pratiche",
        Icon: FileTextIcon,
        sub_items: [
          {
            title: "Vedi tutte",
            to: "/protocol",
          },
        ],
      },
    ],
  },
  {
    role: [UserRole.EMPLOYEE],
    groups: [
      {
        name: "Utenti",
        Icon: UsersIcon,
        sub_items: [
          {
            title: "Lavoratori",
            to: "/employee",
          },
          {
            title: "Clienti",
            to: "/client",
          },
        ],
      },
      {
        name: "Pratiche",
        Icon: FileTextIcon,
        sub_items: [
          {
            title: "Vedi tutte",
            to: "/protocol",
          },
        ],
      },
    ],
  },
  {
    role: [UserRole.CLIENT],
    groups: [
      {
        name: "Pratiche",
        Icon: FileTextIcon,
        sub_items: [
          {
            title: "Le mie pratiche",
            to: "/client/protocol",
          },
        ],
      },
    ],
  },
];

export function NavMain() {
  const { setOpenMobile } = useSidebar();
  const { role } = useContext(UserContext)!;

  const navbar = NAVBAR.find((e) => e.role.includes(role));

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
