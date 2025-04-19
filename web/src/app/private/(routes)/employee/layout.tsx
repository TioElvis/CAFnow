import { Fragment } from "react";
import { UserRole } from "@/types/user";
import { myProfile } from "@/app/private/actions";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Readonly<Props>) {
  const user = await myProfile();

  const roles = [
    UserRole.SUPER,
    UserRole.ADMIN,
    UserRole.MANAGER,
    UserRole.EMPLOYEE,
  ];

  if (roles.includes(user.role) === false) {
    throw new Error("Non autorizzato");
  }

  return <Fragment>{children}</Fragment>;
}
