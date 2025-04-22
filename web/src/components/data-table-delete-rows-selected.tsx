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
import { HandleError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { _axios } from "@/providers/axios/csr";
import { TableContext } from "@/context/table";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircleIcon, Trash2Icon } from "lucide-react";

interface Props {
  url: string;
}

export function DataTableDeleteRowsSelected({ url }: Readonly<Props>) {
  const [alertDialog, setAlertDialog] = useState(false);

  const { table } = useContext(TableContext)!;

  const { toast } = useToast();
  const { refresh } = useRouter();

  const { mutate: DeleteMany, isPending } = useMutation({
    mutationKey: ["delete-many-rows"],
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
        const response = await _axios.delete(url, {
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
