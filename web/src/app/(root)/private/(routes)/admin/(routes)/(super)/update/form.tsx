"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { schema } from "./schema";
import { User } from "@/types/user";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { _axios } from "@/providers/axios/csr";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { HandleError } from "@/lib/handle-error";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

interface Props {
  defaultValues: User;
}

export function UpdateAdminForm({ defaultValues }: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues.name,
      surname: defaultValues.surname,
      email: defaultValues.email,
    },
  });

  const { push } = useRouter();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-user-admin"],
    mutationFn: async (values: z.infer<typeof schema>) => {
      try {
        const url = `/admin/update-by-id/${defaultValues._id}`;
        const response = await _axios.patch(url, values);

        return response;
      } catch (error) {
        throw HandleError(error);
      }
    },
    onSuccess: (response) => {
      push("/private/admin");
      toast({
        title: response.data,
        description: "Se non vedi l'admin aggiornato, ricarica la pagina",
        className: "font-semibold",
      });
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

  const onSubmit = form.handleSubmit(async (values) => mutate(values));

  return (
    <MaxWidthWrapper className="w-full flex items-center justify-center">
      <Card className="p-8 w-full lg:w-[28rem]">
        <Form {...form}>
          <form className="w-full space-y-8" onSubmit={onSubmit}>
            <div className="text-center">
              <h2 className="text-2xl font-bold">Aggiorna amministratore</h2>
              <p className="text-muted-foreground">
                Modifica le informazioni di questo amministratore
              </p>
            </div>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Inserisci il nome dell'amministratore"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="surname"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cognome</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Inserisci il cognome dell'amministratore"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Inserisci l'email dell'amministratore"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" disabled={isPending}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <LoaderCircleIcon className="animate-spin" />
                  <p>Caricando...</p>
                </span>
              ) : (
                "Aggiorna utente"
              )}
            </Button>
          </form>
        </Form>
      </Card>
    </MaxWidthWrapper>
  );
}
