import { UserRole } from "@/types/user";
import { UpdateAdminForm } from "./form";
import { findUserById } from "../../../user/actions";
import { NotFoundUser } from "@/components/not-found-user";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: Readonly<Props>) {
  try {
    const { user_id } = await searchParams;

    const user = await findUserById(user_id as string);

    if (user.role === UserRole.SUPER) {
      throw new Error("Non puoi modificare un super admin");
    }

    return <UpdateAdminForm defaultValues={user} />;
  } catch (error) {
    console.error(error);
    return <NotFoundUser />;
  }
}
