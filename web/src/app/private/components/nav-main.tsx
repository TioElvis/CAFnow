"use client";
import Link from "next/link";
import {
  BuildingIcon,
  ChevronRightIcon,
  FileText,
  UsersIcon,
} from "lucide-react";
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
import { UserContext } from "@/context/user";

export function NavMain() {
  const { setOpenMobile } = useSidebar();
  const { _id, role } = useContext(UserContext)!;

  const NAVBAR = [
    {
      role: "admin",
      groups: [
        {
          name: "CAF",
          Icon: BuildingIcon,
          sub_items: [
            {
              title: "Vedi tutti",
              to: "/admin/caf",
            },
            {
              title: "Crea uno",
              to: "/admin/caf/create",
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
      ],
    },
    {
      role: "manager",
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
          Icon: FileText,
          sub_items: [
            {
              title: "Vedi tutte",
              to: "/protocol",
            },
            {
              title: "Le mie pratiche",
              to: `/protocol?create_by=${_id}`,
            },
            {
              title: "Crea una",
              to: "/protocol/create",
            },
          ],
        },
      ],
    },
    {
      role: "employee",
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
          Icon: FileText,
          sub_items: [
            {
              title: "Vedi tutte",
              to: "/protocol",
            },
            {
              title: "Le mie pratiche",
              to: `/protocol?create_by=${_id}`,
            },
            {
              title: "Crea una",
              to: "/protocol/create",
            },
          ],
        },
      ],
    },
    {
      role: "client",
      groups: [
        {
          name: "Pratiche",
          Icon: FileText,
          sub_items: [
            {
              title: "Vedi tutte le mie pratiche",
              to: "/client/protocol",
            },
          ],
        },
      ],
    },
  ] as const;

  const navbar = NAVBAR.find((x) => x.role === role);

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
