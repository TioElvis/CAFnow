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
import { UserRole } from "@/types/user";
import { handleError } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { _axios } from "@/providers/axios/csr";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export default function Page() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      role: UserRole.ADMIN,
    },
    mode: "onSubmit",
  });

  const { push } = useRouter();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-admin"],
    mutationFn: async (values: z.infer<typeof schema>) => {
      try {
        const response = await _axios.post("/admin", values);

        return response;
      } catch (error) {
        throw new Error(handleError(error));
      }
    },
    onSuccess: (response) => {
      form.reset();
      push("/private/admin");
      toast({
        title: response.data,
        className: "font-semibold",
      });
    },
    onError: (error) => {
      form.resetField("email");
      toast({
        description: error.message,
        variant: "destructive",
        className: "text-white font-semibold",
      });
    },
  });

  const onSubmit = form.handleSubmit(async (values) => mutate(values));

  return (
    <MaxWidthWrapper className="w-full flex items-center justify-center">
      <Card className="p-8 w-[28rem]">
        <Form {...form}>
          <form className="w-full space-y-8" onSubmit={onSubmit}>
            <div>
              <h2 className="text-2xl font-bold text-center">
                Crea un nuovo Amministratore
              </h2>
              <p className="text-center text-muted-foreground">
                Inserisci i dettagli per creare un nuovo account amministratore
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1/2">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Inserisci il nome"
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
                  <FormItem className="flex-1/2">
                    <FormLabel>Cognome</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Inserisci il cognome"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1/2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Inserisci l'email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="role"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex-1/2 cursor-not-allowed">
                  <FormLabel>Ruolo</FormLabel>
                  <FormControl>
                    <Input disabled {...field} value={field.value} />
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
                "Crea nuovo utente"
              )}
            </Button>
          </form>
        </Form>
      </Card>
    </MaxWidthWrapper>
  );
}
