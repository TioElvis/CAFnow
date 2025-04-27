import { UserRole } from "@/types/user";
import { CreateCAFForm } from "./form";
import { findAllManagers } from "@/app/(root)/private/(routes)/manager/actions";

export default async function Page() {
  const super_managers = await findAllManagers(UserRole.SUPER_MANAGER);

  return <CreateCAFForm super_managers={super_managers} />;
}
