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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { schema } from "./schema";
import { useForm } from "react-hook-form";
import { HandleError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { User, UserRole } from "@/types/user";
import { _axios } from "@/providers/axios/csr";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";
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
      role: defaultValues.role as
        | UserRole.ADMIN
        | UserRole.MANAGER
        | UserRole.EMPLOYEE
        | UserRole.CLIENT
        | undefined,
    },
  });

  const { push } = useRouter();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["update-admin-user"],
    mutationFn: async (values: z.infer<typeof schema>) => {
      try {
        const response = await _axios.patch(
          `/admin/update-by-id/${defaultValues._id}`,
          values,
        );

        return response;
      } catch (error) {
        throw HandleError(error);
      }
    },
    onSuccess: (response) => {
      push("/private/admin");
      toast({
        title: response.data,
        className: "font-semibold",
      });
    },
    onError: (error) => {
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
                Modifica utente
              </h2>
              <p className="text-center text-muted-foreground">
                Inserisci i dettagli per modificare l&#39;account di <br />
                <b>
                  {defaultValues.name} {defaultValues.surname}
                </b>
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
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Ruolo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue
                          placeholder={`Seleziona un ruolo per ${defaultValues.name} ${defaultValues.surname}`}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                      <SelectItem value={UserRole.MANAGER}>Manager</SelectItem>
                      <SelectItem value={UserRole.EMPLOYEE}>
                        Employee
                      </SelectItem>
                      <SelectItem value={UserRole.CLIENT}>Client</SelectItem>
                    </SelectContent>
                  </Select>
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
