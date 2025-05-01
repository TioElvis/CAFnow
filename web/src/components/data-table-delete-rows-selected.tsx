"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { _axios } from "@/providers/axios/csr";
import { TableContext } from "@/context/table";
import { HandleError } from "@/lib/handle-error";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircleIcon, Trash2Icon } from "lucide-react";

export function DataTableDeleteRowsSelected() {
  const [alertDialog, setAlertDialog] = useState(false);

  const { table, name } = useContext(TableContext)!;

  const { toast } = useToast();
  const { refresh } = useRouter();

  const { mutate: DeleteMany, isPending } = useMutation({
    mutationKey: ["delete-many-rows", name],
    mutationFn: async () => {
      const rows = table.getSelectedRowModel().rows;
      const ids = rows.map((row) => row.original._id);

      if (ids.length === 0) {
        toast({
          id: "toggle",
          description: "Per favore seleziona almeno una riga",
          variant: "destructive",
          className: "text-white font-semibold",
        });

        return;
      }

      try {
        const response = await _axios.delete(`/${name}/delete-many`, {
          data: { ids },
        });

        return response;
      } catch (error) {
        throw HandleError(error);
      }
    },
    onSuccess: (response) => {
      if (response !== undefined) {
        toast({
          id: "toggle",
          title: response.data,
          className: "font-semibold",
        });
        refresh();
        table.resetRowSelection();
      }
    },
    onError: (error) => {
      toast({
        id: "toggle",
        description: error.message,
        variant: "destructive",
        className: "text-white font-semibold",
      });
    },
  });

  return (
    <AlertDialog open={alertDialog} onOpenChange={setAlertDialog}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setAlertDialog(true)}>
              <Trash2Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <span>Cancella righe selezionate</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold">
            Sei sicuro di voler cancellare le righe selezionate?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Questa azione non può essere annullata. Questo eliminerà
            definitivamente le righe selezionate rimuovendo i suoi dati dai
            nostri server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancella</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={() => DeleteMany()}>
            {isPending ? (
              <span className="flex items-center gap-2">
                <LoaderCircleIcon className="animate-spin" />
                <p>Caricando...</p>
              </span>
            ) : (
              "Continua"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
