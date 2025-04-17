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
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

export function ContactUs() {
  const schema = z.object({
    name: z.string().min(1, { message: "Campo richiesto" }),
    surname: z.string().min(1, { message: "Campo richiesto" }),
    email: z.string().min(1, { message: "Campo richiesto" }).email(),
    subject: z.string().min(1, { message: "Campo richiesto" }),
    message: z.string().min(1, { message: "Campo richiesto" }),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      subject: "",
      message: "",
    },
    mode: "onSubmit",
  });

  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(async (values) => {
          console.log(values);
        })}>
        <div className="flex flex-col lg:flex-row gap-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex-1/2">
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="Inserisci il tuo nome"
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
                    placeholder="Inserisci il tuo cognome"
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
          name="subject"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oggetto</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="Scrivi l'oggetto del messaggio"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Messaggio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Scrivi un messaggio"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">Invia Messaggio</Button>
      </form>
    </Form>
  );
}
