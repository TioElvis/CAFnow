import { myProfile } from "./actions";
import { UserProvider } from "@/context/user";

interface Props {
  children: React.ReactNode;
}

export const dynamic = "force-dynamic";

export default async function Layout({ children }: Readonly<Props>) {
  const user = await myProfile();

  return <UserProvider user={user}>{children}</UserProvider>;
}
