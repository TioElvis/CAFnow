"use client";
import { z } from "zod";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { schema } from "./schema";
import { useForm } from "react-hook-form";
import { HandleError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { _axios } from "@/providers/axios/csr";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const { toast } = useToast();
  const { replace, refresh } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (values: z.infer<typeof schema>) => {
      try {
        await _axios.post("/auth/sign-in", values);
      } catch (error) {
        throw HandleError(error);
      }
    },
    onSuccess: () => {
      form.reset();
      replace("/private");
      refresh();
    },
    onError: (error) => {
      form.resetField("password");
      toast({
        description: error.message,
        variant: "destructive",
        className: "text-white font-semibold",
      });
    },
  });

  const onSubmit = form.handleSubmit(async (values) => mutate(values));

  return (
    <main className="w-full h-screen p-8 grid lg:grid-cols-2">
      <section className="flex items-center justify-center">
        <Form {...form}>
          <form
            className="w-full px-8 md:px-0 md:w-96 space-y-4"
            onSubmit={onSubmit}>
            <h3 className="text-3xl md:text-4xl font-bold">Benvenuto 👋</h3>
            <p className="text-muted-foreground">
              Accedi per gestire le tue pratiche o controllare lo stato dei tuoi
              servizi <b>CAF</b>, tutto in un unico posto.
            </p>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="on"
                      placeholder="Inserisci la tua email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      placeholder="Inserisci la tua password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-primary hover:underline">
                Hai dimenticato la password?
              </Link>
            </div>
            <Button className="w-full" disabled={isPending}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <LoaderCircleIcon className="animate-spin" />
                  <p>Caricando...</p>
                </span>
              ) : (
                "Accedi"
              )}
            </Button>
          </form>
        </Form>
      </section>
      <div className="w-full h-full hidden rounded-2xl bg-top bg-[url('/abraham_mignon_flowers_metal_vase.jpg')] lg:block" />
    </main>
  );
}
