import { BuildingIcon, FileTextIcon, UsersIcon } from "lucide-react";

export const NAVBAR = [
  {
    role: "super",
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
        ],
      },
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
    role: "client",
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
