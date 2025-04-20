import { z } from "zod";

export const schema = z.object({
  name: z.string().min(1, { message: "Campo richiesto" }),
  surname: z.string().min(1, { message: "Campo richiesto" }),
  email: z.string().min(1, { message: "Campo richiesto" }).email(),
  role: z.enum(["admin"], {
    errorMap: () => ({ message: "Campo richiesto" }),
  }),
});
