import { findUserById } from "../../user/actions";
import { UpdateAdminForm } from "./components/update-admin-form";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: Readonly<Props>) {
  const { user_id } = await searchParams;
  const user = await findUserById(user_id as string);

  return <UpdateAdminForm defaultValues={user} />;
}
