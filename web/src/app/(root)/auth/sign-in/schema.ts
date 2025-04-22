import { z } from "zod";

export const schema = z.object({
  email: z.string().min(1, { message: "Campo richiesto" }).email(),
  password: z.string().min(1, { message: "Campo richiesto" }),
});
