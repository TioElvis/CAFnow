import { redirect } from "next/navigation";
import { UserProvider } from "@/context/user";
import { myProfile } from "./(routes)/user/actions";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

interface Props {
  children: React.ReactNode;
}

export const dynamic = "force-dynamic";

export default async function Layout({ children }: Readonly<Props>) {
  try {
    const user = await myProfile();

    return (
      <UserProvider user={user}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <SiteHeader />
            <main className="flex-1 p-4">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </UserProvider>
    );
  } catch (error) {
    console.error(error);
    return redirect("/auth/sign-in");
  }
}
