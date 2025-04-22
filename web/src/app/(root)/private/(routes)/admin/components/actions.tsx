"use client";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HandleError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/user";
import { useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { _axios } from "@/providers/axios/csr";
import { Button } from "@/components/ui/button";
import { UserRole, type User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircleIcon, MoreHorizontalIcon } from "lucide-react";

interface Props {
  row: User;
}

export function Actions({ row }: Readonly<Props>) {
  const [alertDialog, setAlertDialog] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState(false);

  const user = useContext(UserContext)!;

  const { toast } = useToast();
  const { refresh } = useRouter();

  const { mutate: DeleteOne, isPending } = useMutation({
    mutationKey: ["delete-one-user"],
    mutationFn: async () => {
      try {
        const response = await _axios.delete(`/admin/delete-one/${row._id}`);

        return response;
      } catch (error) {
        throw HandleError(error);
      }
    },
    onSuccess: (response) => {
      setAlertDialog(false);
      toast({
        title: response.data,
        className: "font-semibold",
      });
      refresh();
    },
    onError: (error) => {
      toast({
        description: error.message,
        variant: "destructive",
        className: "text-white font-semibold",
      });
    },
  });

  return (
    <AlertDialog open={alertDialog} onOpenChange={setAlertDialog}>
      <DropdownMenu open={dropdownMenu} onOpenChange={setDropdownMenu}>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Azioni</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/private/user?id=${row._id}`}>Vedi informazioni</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href={`/private/admin/update?user_id=${row._id}`}>
              Modifica
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={user.role !== UserRole.SUPER}
            onClick={() => {
              if (user.role === UserRole.SUPER) {
                setAlertDialog(true);
                setDropdownMenu(false);
              }
            }}>
            Cancella
          </DropdownMenuItem>
        </DropdownMenuContent>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bold">
              Sei sicuro di voler cancellare questo account?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Questa azione non può essere annullata. Questo eliminerà
              definitivamente questo account e rimuoverà i suoi dati dai nostri
              server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancella</AlertDialogCancel>
            <Button disabled={isPending} onClick={() => DeleteOne()}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <LoaderCircleIcon className="animate-spin" />
                  <p>Caricando...</p>
                </span>
              ) : (
                "Continua"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </DropdownMenu>
    </AlertDialog>
  );
}
