import { UserRole } from "@/types/user";
import { PermissionGate } from "../../components/permission-gate";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Readonly<Props>) {
  return (
    <PermissionGate
      roles={[
        UserRole.SUPER,
        UserRole.ADMIN,
        UserRole.SUPER_MANAGER,
        UserRole.MANAGER,
      ]}>
      {children}
    </PermissionGate>
  );
}
