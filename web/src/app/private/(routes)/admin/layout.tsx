import { Fragment } from "react";
import { UserRole } from "@/types/user";
import { redirect } from "next/navigation";
import { myProfile } from "@/app/private/actions";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Readonly<Props>) {
  const user = await myProfile();

  const roles = [UserRole.SUPER, UserRole.ADMIN];

  if (roles.includes(user.role) === false) {
    redirect("/private/unauthorized");
  }

  return <Fragment>{children}</Fragment>;
}
