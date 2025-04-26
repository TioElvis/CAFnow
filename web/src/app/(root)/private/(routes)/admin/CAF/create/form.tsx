"use client";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { schema } from "./schema";
import type { User } from "@/types/user";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { cn, HandleError } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { _axios } from "@/providers/axios/csr";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { CheckIcon, ChevronsUpDownIcon, LoaderCircleIcon } from "lucide-react";

interface Props {
  super_managers: Array<User>;
}

export function CreateCAFForm({ super_managers }: Readonly<Props>) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  const { push } = useRouter();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-CAF"],
    mutationFn: async (values: z.infer<typeof schema>) => {
      try {
        const response = await _axios.post("/CAF/create", {
          name: values.name,
          super_manager: values.super_manager._id,
        });

        return response;
      } catch (error) {
        throw HandleError(error);
      }
    },
    onSuccess: (response) => {
      push("/private/admin/CAF");
      toast({
        title: response.data,
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
      <Card className="p-8 w-[28rem]">
        <Form {...form}>
          <form className="w-full space-y-8" onSubmit={onSubmit}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Inserisci il nome del CAF"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="super_manager"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Super Manager</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}>
                          {field.value
                            ? `${field.value.name} ${field.value.surname}`
                            : "Seleziona un super manager"}
                          <ChevronsUpDownIcon className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto md:w-96 p-0">
                      <Command className="w-full">
                        <CommandInput
                          placeholder="Cerca un super manager"
                          className="h-8"
                        />
                        <CommandList className="w-full">
                          <CommandEmpty className="p-2 text-sm">
                            Non c&#39;è un super manager con questo nome
                          </CommandEmpty>
                          <CommandGroup className="w-full">
                            {super_managers.map((e) => (
                              <CommandItem
                                value={e.name}
                                key={e._id}
                                onSelect={() => {
                                  form.setValue("super_manager", e);
                                  form.clearErrors("super_manager");
                                }}
                                className="w-full">
                                {e.name} {e.surname}
                                {e._id === field.value?._id && <CheckIcon />}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Cerca un super manager per amministrare questo CAF
                  </FormDescription>
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
                "Crea CAF"
              )}
            </Button>
          </form>
        </Form>
      </Card>
    </MaxWidthWrapper>
  );
}
