"use client";
import {
  LoaderCircleIcon,
  LogOutIcon,
  SettingsIcon,
  UserCircleIcon,
} from "lucide-react";
import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { handleError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Fragment, useContext } from "react";
import { UserContext } from "@/context/user";
import { useToast } from "@/hooks/use-toast";
import { _axios } from "@/providers/axios/csr";
import { useMutation } from "@tanstack/react-query";
import { ModeToggle } from "@/components/mode-toggle";

export function NavUser() {
  const { isMobile, setOpenMobile } = useSidebar();
  const { name, surname, email } = useContext(UserContext)!;

  const { toast } = useToast();
  const { replace } = useRouter();

  /*
    Why didn't I directly remove the cookies?

    I didn't remove the cookies directly because they are httpOnly, which means I don't have access to them from the client side.
  */
  const { mutate: Logout, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: async () => {
      try {
        await _axios.patch("/auth/logout");
      } catch (error) {
        throw new Error(handleError(error));
      }
    },
    onSuccess: () => {
      replace("/");
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <section className="h-8 w-8 p-2 rounded-lg flex items-center justify-center bg-primary text-white">
                <div>{name[0] + surname[0]}</div>
              </section>
              <section className="flex flex-col">
                <span className="truncate font-medium">
                  {name} {surname}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {email}
                </span>
              </section>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuGroup>
              <Link
                href="/private/my-profile"
                onClick={() => setOpenMobile(false)}>
                <DropdownMenuItem>
                  <UserCircleIcon />
                  Profilo
                </DropdownMenuItem>
              </Link>
              <Link
                href="/private/settings"
                onClick={() => setOpenMobile(false)}>
                <DropdownMenuItem>
                  <SettingsIcon />
                  Impostazioni
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <ModeToggle />
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled={isPending} onClick={() => Logout()}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <LoaderCircleIcon className="animate-spin" />
                  <p>Caricando...</p>
                </span>
              ) : (
                <Fragment>
                  <LogOutIcon />
                  Log out
                </Fragment>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
