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
import { _axios } from "@/provider/axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircleIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { extractAxiosErrorMessage } from "@/lib/utils";

export default function Page() {
  const schema = z.object({
    email: z.string().min(1, { message: "Required" }).email(),
    password: z.string().min(1, { message: "Required" }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const { toast } = useToast();
  const { replace } = useRouter();

  const { mutate, isPending } = useMutation({
    mutationKey: ["sign-in"],
    mutationFn: async (values: z.infer<typeof schema>) => {
      try {
        await _axios.post("/auth/sign-in", values);
      } catch (error) {
        throw new Error(extractAxiosErrorMessage(error));
      }
    },
    onSuccess: () => {
      form.reset();

      replace("/user/my-profile");
    },
    onError: (error) => {
      form.reset();

      toast({
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <main className="w-full h-screen p-4 grid lg:grid-cols-2">
      <section className="flex items-center justify-center">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(async (values) => mutate(values))}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Benvenuto 👋
            </h2>
            <p className="text-muted-foreground">
              Noi ti aiutiamo con tutti i servizi di cui hai bisogno. <br />
              Accedi per gestire le tue pratiche in modo semplice e veloce!
            </p>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
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
      <div className="w-full h-full rounded-2xl bg-top bg-[url('/abraham_mignon_flowers_metal_vase.jpg')] hidden lg:block" />
    </main>
  );
}
