import { UserRole } from "@/types/user";
import { BuildingIcon, FileTextIcon, UsersIcon } from "lucide-react";

export const NAVBAR = [
  {
    role: [UserRole.SUPER],
    groups: [
      {
        name: "CAF",
        Icon: BuildingIcon,
        sub_items: [
          {
            title: "Vedi tutti",
            to: "/admin/caf",
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
    role: [UserRole.ADMIN],
    groups: [
      {
        name: "CAF",
        Icon: BuildingIcon,
        sub_items: [
          {
            title: "Vedi tutti",
            to: "/admin/caf",
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
