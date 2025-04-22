"use client";
import { UserRole } from "@/types/user";
import { Card } from "@/components/ui/card";
import { Fragment, useContext } from "react";
import { UserContext } from "@/context/user";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

interface Props {
  roles: Array<UserRole>;
  children: React.ReactNode;
}

export function PermissionGate({ roles, children }: Readonly<Props>) {
  const { role } = useContext(UserContext)!;

  return roles.includes(role) === true ? (
    <Fragment>{children}</Fragment>
  ) : (
    <MaxWidthWrapper className="flex flex-col items-center justify-center">
      <Card className="p-8 gap-4">
        <h2 className="text-2xl font-bold text-destructive">Accesso negato</h2>
        <p className="text-muted-foreground">
          Non hai i permessi necessari per accedere a questa pagina.
        </p>
        <p className="text-muted-foreground">
          Per favore contatta un super o un amministratore per richiedere
          l&#39;accesso.
        </p>
      </Card>
    </MaxWidthWrapper>
  );
}
